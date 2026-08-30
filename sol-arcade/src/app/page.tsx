"use client";
import React, { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ArcadeProvider, useArcade } from "../components/arcade/ArcadeProvider";
import { ARCADE_GAMES } from "../components/arcade/games";
import Spinner from "../components/Spinner";

function PassCard() {
  const { me, buyPass, buying, buyError } = useArcade();
  const plays = me?.plays_limit ?? 10;
  const [success, setSuccess] = useState<string | null>(null);

  async function handleBuy() {
    const pass = await buyPass();
    if (pass) {
      setSuccess("Payment verified — your Arcade Pass cNFT has been minted!");
      setTimeout(() => setSuccess(null), 8000);
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-4">
        <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-4xl shadow-lg shadow-indigo-900/40">
          🎮
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-1">Arcade Pass</h2>
      <p className="text-sm text-slate-400 text-center mb-4">
        A compressed NFT (cNFT) minted to your wallet — {plays} game starts. Once used up, the pass disappears.
      </p>
      <div className="flex items-center justify-center gap-2 mb-5">
        <span className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-400 text-sm font-semibold">0.05 SOL</span>
        <span className="text-xs text-slate-500">one-time</span>
      </div>

      {success && (
        <div className="mb-4 bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 px-4 py-3 rounded-lg text-sm font-medium text-center">
          {success}
        </div>
      )}
      {buyError && (
        <div className="mb-4 bg-amber-950/60 border border-amber-800/50 text-amber-300 px-4 py-3 rounded-lg text-sm text-center">
          {buyError}
        </div>
      )}

      <button
        onClick={handleBuy}
        disabled={buying}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-[#9945FF] to-[#14F195] text-slate-950 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {buying ? (
          <>
            <Spinner /> Sending payment & minting…
          </>
        ) : (
          <>Pay with Solana — Get your Pass</>
        )}
      </button>
      <p className="text-xs text-slate-500 text-center mt-3">
        Your wallet must approve the transfer. The cNFT is minted afterwards by the server.
      </p>
      {me?.pass?.mint_signature && (
        <p className="text-xs text-slate-500 text-center mt-2 break-all">
          Mint:{" "}
          <a
            href={`https://solscan.io/tx/${me.pass.mint_signature}`}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:underline"
          >
            view on Solscan
          </a>
        </p>
      )}
    </div>
  );
}

const GAME_LOCKED = "🔒";

function ArcadeUI() {
  const { connected, publicKey, me, loadingMe, token, scores, recordScore, startGame, playsLeft } = useArcade();
  const hasPass = !!me?.pass;

  return (
    <div className="bg-slate-950 min-h-screen">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white">👾 Sol Arcade</h1>
            <p className="text-sm text-slate-400">Log in with your Solana wallet, mint your pass & play.</p>
          </div>
          <div className="flex items-center gap-3">
            {connected && publicKey && (
              <span className="hidden sm:inline text-xs text-slate-400 font-mono max-w-[180px] truncate">
                {publicKey.slice(0, 6)}…{publicKey.slice(-4)}
              </span>
            )}
            <WalletMultiButton />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {!connected ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🕹️</div>
            <h2 className="text-2xl font-bold text-white mb-2">Ready to play?</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-6">
              Connect your Solana wallet to sign in. Mint your Arcade Pass for 0.05 SOL and get {me?.plays_limit ?? 10} game starts.
            </p>
            <div className="flex justify-center">
              <WalletMultiButton />
            </div>
          </div>
        ) : loadingMe ? (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Pass / Buy */}
            <section className="mb-10">
              {hasPass ? (
                <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-6 max-w-md mx-auto text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h2 className="text-xl font-bold text-white mb-1">Arcade Pass active</h2>
                  <p className="text-sm text-emerald-300 mb-4">
                    Verified cNFT — game starts left: <span className="font-bold">{playsLeft}</span>. It disappears after the last start.
                  </p>
                  <div className="text-left bg-slate-900/60 border border-slate-800 rounded-lg p-3 space-y-1 text-xs font-mono text-slate-400">
                    {me?.pass?.asset_id && (
                      <p className="break-all"><span className="text-slate-500">asset:</span> {me.pass.asset_id}</p>
                    )}
                    {me?.pass?.mint_signature && (
                      <p className="break-all"><span className="text-slate-500">mint:</span> {me.pass.mint_signature}</p>
                    )}
                  </div>
                </div>
              ) : (
                <PassCard />
              )}

              {token && !hasPass && (
                <p className="text-center text-xs text-slate-500 mt-4">
                  Wallet signed in: <span className="text-slate-400 font-mono">{publicKey}</span>
                </p>
              )}
            </section>

            {/* Games */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Arcade Games</h2>
                {hasPass && <span className="text-xs text-emerald-400 font-medium">{playsLeft} starts left</span>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ARCADE_GAMES.map((game) => {
                  const Game = game.component;
                  const best = scores?.[game.id];
                  return (
                    <div
                      key={game.id}
                      className={`bg-slate-900 border rounded-xl p-5 transition-all ${
                        hasPass ? "border-slate-800" : "border-slate-800 opacity-70"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{hasPass ? game.emoji : GAME_LOCKED}</span>
                        {best !== undefined && (
                          <span className="text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 rounded-full px-2 py-0.5">
                            Best: {best}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-white mb-1">{game.name}</h3>
                      <p className="text-sm text-slate-400 mb-4">{game.description}</p>
                      <Game disabled={!hasPass} onFinish={(score) => hasPass && recordScore(game.id, score)} onStart={() => hasPass && startGame(game.id)} />
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="mt-10 text-center text-xs text-slate-600">
              Pass is stored as a compressed NFT on Solana (Bubblegum) and disappears automatically after your last game start.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ArcadePage() {
  return (
    <ArcadeProvider>
      <ArcadeUI />
    </ArcadeProvider>
  );
}