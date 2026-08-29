"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";
const API_BASE = process.env.NEXT_PUBLIC_ARCADE_API || (typeof window !== "undefined" ? window.location.origin + "/api" : "");

export interface ArcadePass {
  wallet: string;
  asset_id: string | null;
  mint_signature: string | null;
  purchase_payment: string | null;
  created_at: string;
}

export interface ArcadeMe {
  wallet: string;
  pass: ArcadePass | null;
  configured: { payer: boolean; tree: boolean };
}

interface ArcadeContextValue {
  arcadeApi: string;
  connected: boolean;
  connecting: boolean;
  publicKey: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  token: string | null;
  me: ArcadeMe | null;
  loadingMe: boolean;
  refreshMe: () => Promise<void>;
  buyPass: () => Promise<ArcadePass | null>;
  buying: boolean;
  buyError: string | null;
  recordScore: (game: string, score: number) => Promise<void>;
  scores: Record<string, number> | null;
}

const ArcadeContext = createContext<ArcadeContextValue | null>(null);

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
}

async function apiPost<T = unknown>(path: string, body: unknown, token?: string | null): Promise<T> {
  const res = await fetch(`${API_BASE}/v1/arcade/${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = (data as { message?: string } | null)?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

function ArcadeController({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const {
    connected,
    connecting,
    publicKey,
    signMessage,
    sendTransaction,
    disconnect,
  } = useWallet();

  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<ArcadeMe | null>(null);
  const [loadingMe, setLoadingMe] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number> | null>(null);

  const walletAddress = publicKey?.toBase58() ?? null;

  const refreshMe = useCallback(async () => {
    if (!token) return;
    setLoadingMe(true);
    try {
      const res = await fetch(`${API_BASE}/v1/arcade/me`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setMe(await res.json());
      }
    } catch {
      // keep last known state
    } finally {
      setLoadingMe(false);
    }
  }, [token]);

  useEffect(() => {
    refreshMe();
  }, [refreshMe]);

  const signIn = useCallback(async () => {
    if (!walletAddress || !signMessage) {
      setBuyError("This wallet does not support signMessage.");
      return;
    }
    setSigningIn(true);
    setBuyError(null);
    try {
      const challenge = await fetch(
        `${API_BASE}/v1/arcade/challenge?wallet=${encodeURIComponent(walletAddress)}`
      ).then<{ nonce: string; message: string }>((r) => r.json());

      const messageBytes = new TextEncoder().encode(challenge.message);
      const signature = await signMessage(messageBytes);

      const auth = await apiPost<{ token: string; wallet: string; pass: ArcadePass | null }>(
        "login",
        { wallet: walletAddress, nonce: challenge.nonce, message: challenge.message, signature: toBase64(signature) }
      );
      setToken(auth.token);
      localStorage.setItem(`arcade_token_${walletAddress}`, auth.token);
    } catch (e) {
      setBuyError(e instanceof Error ? e.message : "Sign in failed.");
    } finally {
      setSigningIn(false);
    }
  }, [walletAddress, signMessage]);

  // Restore previous session and re-verify.
  useEffect(() => {
    if (!walletAddress) {
      setToken(null);
      setMe(null);
      return;
    }
    const saved = localStorage.getItem(`arcade_token_${walletAddress}`);
    if (saved) {
      setToken(saved);
    }
  }, [walletAddress]);

  const signOut = useCallback(async () => {
    if (walletAddress) localStorage.removeItem(`arcade_token_${walletAddress}`);
    setToken(null);
    setMe(null);
    setScores(null);
    await disconnect().catch(() => {});
  }, [walletAddress, disconnect]);

  // Auto sign-in right after a wallet connects.
  useEffect(() => {
    if (connected && walletAddress && !token && !signingIn) {
      signIn();
    }
  }, [connected, walletAddress, token, signingIn, signIn]);

  const buyPass = useCallback(async () => {
    if (!token || !walletAddress || !sendTransaction || !connection) return null;
    setBuying(true);
    setBuyError(null);
    try {
      const session = await apiPost<{ session_id: string; amount_lamports: number; recipient: string }>(
        "pass/session",
        {},
        token
      );

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: new PublicKey(session.recipient),
          lamports: session.amount_lamports,
        })
      );
      tx.feePayer = publicKey!;
      const blockhash = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash.blockhash;

      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction({ signature, ...blockhash }, "confirmed");

      const result = await apiPost<{ ok: boolean; pass: ArcadePass }>(
        "pass/confirm",
        { session_id: session.session_id, signature },
        token
      );
      setMe((prev) => (prev ? { ...prev, pass: result.pass } : prev));
      return result.pass;
    } catch (e) {
      setBuyError(e instanceof Error ? e.message : "Payment failed.");
      return null;
    } finally {
      setBuying(false);
    }
  }, [token, walletAddress, sendTransaction, connection, publicKey]);

  const recordScore = useCallback(
    async (game: string, score: number) => {
      if (!token) return;
      try {
        const result = await apiPost<{ ok: boolean; best: number; new_high: boolean }>(
          "play",
          { game, score },
          token
        );
        setScores((prev) => ({ ...prev, [game]: Math.max(prev?.[game] ?? 0, result.best) }));
      } catch {
        // high scores are best-effort
      }
    },
    [token]
  );

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/v1/arcade/scores`, { headers: { authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data: { scores?: { game: string; score: number }[] }) => {
        const map: Record<string, number> = {};
        for (const s of data.scores || []) map[s.game] = Math.max(map[s.game] ?? 0, s.score);
        setScores(map);
      })
      .catch(() => {});
  }, [token]);

  const value = useMemo<ArcadeContextValue>(
    () => ({
      arcadeApi: API_BASE,
      connected,
      connecting,
      publicKey: walletAddress,
      signIn,
      signOut,
      token,
      me,
      loadingMe,
      refreshMe,
      buyPass,
      buying,
      buyError,
      recordScore,
      scores,
    }),
    [connected, connecting, walletAddress, signIn, signOut, token, me, loadingMe, refreshMe, buyPass, buying, buyError, recordScore, scores]
  );

  return <ArcadeContext.Provider value={value}>{children}</ArcadeContext.Provider>;
}

export function ArcadeProvider({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);
  return (
    <ConnectionProvider endpoint={RPC_URL} config={{ commitment: "confirmed" }}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ArcadeController>{children}</ArcadeController>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export function useArcade(): ArcadeContextValue {
  const ctx = useContext(ArcadeContext);
  if (!ctx) throw new Error("useArcade must be used within ArcadeProvider");
  return ctx;
}