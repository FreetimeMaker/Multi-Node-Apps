"use client";
import React, { useEffect, useRef, useState } from "react";

interface GameProps {
  disabled?: boolean;
  onFinish: (score: number) => void;
}

function useCountdown(seconds: number, onDone: () => void) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const doneRef = useRef(onDone);
  const firedRef = useRef(false);
  doneRef.current = onDone;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remaining === 0 && running === false && !firedRef.current && doneRef.current) {
      firedRef.current = true;
      doneRef.current();
    }
  }, [remaining, running]);

  return { remaining, running, start: () => { firedRef.current = false; setRemaining(seconds); setRunning(true); } };
}

/* ---------------- Speed Tap ---------------- */
function SpeedTap({ disabled, onFinish }: GameProps) {
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState<{ x: number; y: number; size: number } | null>(null);
  const { remaining, running, start } = useCountdown(20, () => onFinish(score));
  const containerRef = useRef<HTMLDivElement>(null);

  function spawn() {
    const el = containerRef.current;
    if (!el) return;
    const w = el.clientWidth - 70;
    const h = el.clientHeight - 70;
    setTarget({
      x: 15 + Math.random() * Math.max(10, w),
      y: 15 + Math.random() * Math.max(10, h),
      size: 42 + Math.random() * 28,
    });
  }

  useEffect(() => {
    if (running && !target) spawn();
    else if (!running) setTarget(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function hit() {
    setScore((s) => s + 1);
    setTarget(null);
    spawn();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-sm text-slate-300">
        <span>Score: <span className="font-bold text-white">{score}</span></span>
        <span>Time: <span className="font-bold text-white">{remaining}s</span></span>
      </div>
      <div
        ref={containerRef}
        onMouseDown={running ? hit : undefined}
        className={`relative h-64 rounded-xl bg-slate-800/70 border border-slate-700 overflow-hidden cursor-crosshair select-none ${disabled ? "pointer-events-none opacity-60" : ""}`}
      >
        {target && running && (
          <button
            onMouseDown={(e) => { e.stopPropagation(); hit(); }}
            style={{ left: target.x, top: target.y, width: target.size, height: target.size }}
            className="absolute rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 hover:scale-110 transition-transform shadow-lg shadow-indigo-900/40"
          />
        )}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <p className="text-slate-300 text-sm">{score > 0 ? `Final score: ${score}` : "Tap as many targets as possible in 20 seconds."}</p>
            <button onClick={start} disabled={disabled} className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 disabled:opacity-40">
              {score > 0 ? "Play again" : "Start"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Coin Catch ---------------- */
interface FallingCoin { id: number; x: number; delay: number; speed: number }

function CoinCatch({ disabled, onFinish }: GameProps) {
  const [coins, setCoins] = useState<FallingCoin[]>([]);
  const [caught, setCaught] = useState(0);
  const [missed, setMissed] = useState(0);
  const { remaining, running, start } = useCountdown(30, () => onFinish(caught));
  const idRef = useRef(0);

  useEffect(() => {
    if (!running) {
      setCoins([]);
      setCaught(0);
      setMissed(0);
      return;
    }
    const spawn = setInterval(() => {
      idRef.current += 1;
      setCoins((prev) => [...prev, { id: idRef.current, x: Math.random() * 88 + 2, delay: 0, speed: 3 + Math.random() * 4 }].slice(-14));
    }, 700);
    const tick = setInterval(() => {
      setCoins((prev) => prev.map((c) => (c.delay >= 1 ? { ...c, delay: c.delay + 1 } : { ...c, delay: c.delay + 1 })));
    }, 60);
    const missCheck = setInterval(() => {
      setCoins((prev) => {
        const gone = prev.filter((c) => c.delay > 90).length;
        if (gone > 0) setMissed((m) => m + gone);
        return prev.filter((c) => c.delay <= 90);
      });
    }, 100);
    return () => { clearInterval(spawn); clearInterval(tick); clearInterval(missCheck); };
  }, [running]);

  function catchCoin(id: number) {
    setCaught((c) => c + 1);
    setCoins((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-sm text-slate-300">
        <span>Caught: <span className="font-bold text-amber-400">🪙 {caught}</span></span>
        <span>Time: <span className="font-bold text-white">{remaining}s</span></span>
      </div>
      <div className={`relative h-64 rounded-xl bg-slate-800/70 border border-slate-700 overflow-hidden select-none ${disabled ? "pointer-events-none opacity-60" : ""}`}>
        {coins.map((c) => (
          <button
            key={c.id}
            onClick={() => running && catchCoin(c.id)}
            style={{ left: `${c.x}%`, top: `${Math.min(c.delay, 88)}%` }}
            className="absolute text-3xl hover:scale-125 transition-transform"
          >
            🪙
          </button>
        ))}
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <p className="text-slate-300 text-sm">{caught > 0 ? `Final score: ${caught} coins` : "Catch as many coins as possible in 30 seconds."}</p>
            <button onClick={start} disabled={disabled} className="px-5 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-500 disabled:opacity-40">
              {caught > 0 ? "Play again" : "Start"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Memory Match ---------------- */
const PAIR_EMOJIS = ["🪐", "🚀", "👾", "🎮", "🧠", "🕹️", "🔥", "💎"];

function MemoryMatch({ disabled, onFinish }: GameProps) {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const lockRef = useRef(false);

  function newGame() {
    const deck = [...PAIR_EMOJIS, ...PAIR_EMOJIS].sort(() => Math.random() - 0.5);
    setCards(deck.map((emoji, id) => ({ id, emoji, flipped: false })));
    setFlipped([]);
    setMatches(0);
    setMoves(0);
    setFinished(false);
    setStarted(true);
    lockRef.current = false;
  }

  useEffect(() => {
    if (started && matches === PAIR_EMOJIS.length) {
      setFinished(true);
      const finalScore = matches * 100 - moves * 2;
      onFinish(Math.max(0, finalScore));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, started]);

  function flip(id: number) {
    if (lockRef.current || finished || cards[id].flipped || flipped.includes(id)) return;
    const next = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    setCards(next);
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (next[a].emoji === next[b].emoji) {
        lockRef.current = true;
        setTimeout(() => {
          setMatches((m) => m + 1);
          setCards((cs) => cs.map((c) => (c.flipped ? c : c)));
          setFlipped([]);
          lockRef.current = false;
        }, 350);
      } else {
        lockRef.current = true;
        setTimeout(() => {
          setCards((cs) => cs.map((c, i) => (newFlipped.includes(i) ? { ...c, flipped: false } : c)));
          setFlipped([]);
          lockRef.current = false;
        }, 700);
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-sm text-slate-300">
        <span>Matches: <span className="font-bold text-emerald-400">{matches}/{PAIR_EMOJIS.length}</span></span>
        <span>Moves: <span className="font-bold text-white">{moves}</span></span>
      </div>
      {started ? (
        <div className="relative">
          <div className={`grid grid-cols-4 gap-2 ${finished || disabled ? "opacity-60 pointer-events-none" : ""}`}>
            {cards.map((c) => (
              <button
                key={c.id}
                onClick={() => flip(c.id)}
                className={`aspect-square rounded-lg border flex items-center justify-center text-3xl transition-all ${
                  c.flipped
                    ? "bg-indigo-900/60 border-indigo-600"
                    : "bg-slate-800 border-slate-700 hover:border-slate-600"
                }`}
              >
                {c.flipped ? c.emoji : "❓"}
              </button>
            ))}
          </div>
          {finished && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-900/80 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-lg font-bold text-white mb-1">All matched!</p>
                <p className="text-sm text-slate-300 mb-3">Score: {Math.max(0, matches * 100 - moves * 2)}</p>
                <button onClick={newGame} className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500">
                  Play again
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <button onClick={newGame} disabled={disabled} className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 disabled:opacity-40">
            Start Memory Match
          </button>
        </div>
      )}
    </div>
  );
}

export const ARCADE_GAMES = [
  { id: "speedtap", name: "Speed Tap", description: "Tap as many targets as possible in 20 seconds.", emoji: "🎯", component: SpeedTap },
  { id: "coincatch", name: "Coin Catch", description: "Catch falling coins for 30 seconds.", emoji: "🪙", component: CoinCatch },
  { id: "memory", name: "Memory Match", description: "Match all pairs with fewest moves.", emoji: "🧠", component: MemoryMatch },
];