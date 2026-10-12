import React, { useState } from 'react';

export default function ExploreGames({ onAddXp, onToast }) {
  const [subTab, setSubTab] = useState('game'); // 'game' | 'fast' | 'bullet' | 'future' | 'read'
  const [activeGame, setActiveGame] = useState(null); // 'signal' | 'coach' | 'memory' | 'quiz'
  const [gameScore, setGameScore] = useState(0);

  // Coach Sort state
  const coachTarget = ['Eng', 'S1', 'S2', 'S3'];
  const [coachOrder, setCoachOrder] = useState([]);
  const [coachIdx, setCoachIdx] = useState(0);

  // Memory Game state
  const memoryCards = ['SC', 'BZA', 'LPI', 'SC', 'NDLS', 'BZA'];
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const startSignalRush = () => {
    setActiveGame('signal');
    setGameScore(0);
  };

  const startCoachSort = () => {
    setActiveGame('coach');
    setGameScore(0);
    setCoachOrder(['S2', 'Eng', 'S3', 'S1']);
    setCoachIdx(0);
  };

  const startMemory = () => {
    setActiveGame('memory');
    setGameScore(0);
    setFlipped([]);
    setMatched([]);
  };

  const startQuiz = () => {
    setActiveGame('quiz');
    setGameScore(0);
  };

  const handleSignalTap = (isGreen) => {
    if (isGreen) {
      setGameScore((s) => s + 50);
      onToast('Green! +50 XP');
    } else {
      setGameScore((s) => Math.max(0, s - 30));
      onToast('Red! -30 XP');
    }
  };

  const handleCoachClick = (c) => {
    if (c === coachTarget[coachIdx]) {
      const nextIdx = coachIdx + 1;
      setCoachIdx(nextIdx);
      setGameScore((s) => s + 40);
      if (nextIdx >= coachTarget.length) {
        onToast('Rake sorted! +160 XP');
      }
    } else {
      onToast('Wrong order! Must follow Eng ➔ S1 ➔ S2 ➔ S3');
    }
  };

  const handleCardClick = (idx) => {
    if (flipped.length === 1 && flipped[0] === idx) return;
    if (matched.includes(idx)) return;

    if (flipped.length === 0) {
      setFlipped([idx]);
    } else if (flipped.length === 1) {
      const firstIdx = flipped[0];
      setFlipped([firstIdx, idx]);

      if (memoryCards[firstIdx] === memoryCards[idx]) {
        setMatched((prev) => [...prev, firstIdx, idx]);
        setGameScore((s) => s + 30);
        onToast('Matched station pair! +30 XP');
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 600);
      }
    }
  };

  const endGame = () => {
    const xpGained = Math.max(10, Math.floor(gameScore / 10));
    onAddXp(xpGained);
    onToast(`+${xpGained} XP Saved to Profile`);
    setActiveGame(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Explore</h1>
        <span className="text-[10px] text-zinc-500 muted">Play while you wait</span>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-1.5 overflow-x-auto ns">
        {[
          { id: 'game', label: 'Games' },
          { id: 'fast', label: 'Fastest' },
          { id: 'bullet', label: 'Bullet' },
          { id: 'future', label: 'Future' },
          { id: 'read', label: 'Stories' }
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubTab(t.id)}
            className={`tab shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold transition ${
              subTab === t.id ? 'on border border-white' : 'chip'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. Games Tab */}
      {subTab === 'game' && (
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={startSignalRush}
            className="panel bg-[#0A0A0A] border border-[#333] rounded-xl p-3 text-left transition hover:border-zinc-500"
          >
            <div className="text-xl">🚦</div>
            <div className="text-xs font-bold mt-1">Signal Rush</div>
            <div className="text-[9px] text-zinc-500 muted">Tap green · dodge red</div>
          </button>

          <button
            type="button"
            onClick={startCoachSort}
            className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-left transition hover:border-zinc-500"
          >
            <div className="text-xl">🧩</div>
            <div className="text-xs font-bold mt-1">Coach Sort</div>
            <div className="text-[9px] text-zinc-500 muted">Order the rake</div>
          </button>

          <button
            type="button"
            onClick={startMemory}
            className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-left transition hover:border-zinc-500"
          >
            <div className="text-xl">🃏</div>
            <div className="text-xs font-bold mt-1">Station Memory</div>
            <div className="text-[9px] text-zinc-500 muted">Match codes</div>
          </button>

          <button
            type="button"
            onClick={startQuiz}
            className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-left transition hover:border-zinc-500"
          >
            <div className="text-xl">❓</div>
            <div className="text-xs font-bold mt-1">Rail Quiz</div>
            <div className="text-[9px] text-zinc-500 muted">Streak · titles</div>
          </button>
        </div>
      )}

      {/* 2. Fastest Tab */}
      {subTab === 'fast' && (
        <div className="space-y-2">
          <div className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-sm font-bold flex justify-between items-center">
            <span>1 · Vande Bharat Express</span>
            <span className="font-mono text-xs text-zinc-400">180 km/h</span>
          </div>
          <div className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-sm font-bold flex justify-between items-center">
            <span>2 · Gatimaan Express</span>
            <span className="font-mono text-xs text-zinc-400">160 km/h</span>
          </div>
          <div className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-sm font-bold flex justify-between items-center">
            <span>3 · Tejas / Rajdhani Express</span>
            <span className="font-mono text-xs text-zinc-400">140 km/h</span>
          </div>
        </div>
      )}

      {/* 3. Bullet Tab */}
      {subTab === 'bullet' && (
        <div className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div className="text-xs font-bold">Mumbai–Ahmedabad High Speed Bullet</div>
            <span className="text-[10px] text-zinc-400">320 km/h</span>
          </div>
          <div className="h-2 bg-[#222] rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-white rounded-full w-2/5"></div>
          </div>
          <div className="flex justify-between text-[9px] text-zinc-500 muted mt-1.5">
            <span>Undersea Tunnel & Viaducts</span>
            <span className="text-white font-bold">~42% progress</span>
          </div>
        </div>
      )}

      {/* 4. Future Tab */}
      {subTab === 'future' && (
        <div className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 text-[11px] space-y-2">
          <div className="flex items-start space-x-2">
            <span className="font-bold text-white">Kavach</span>
            <span className="text-zinc-400">— Indigenous SIL-4 Automatic Train Collision Avoidance System.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-bold text-white">DFCs</span>
            <span className="text-zinc-400">— Western & Eastern Dedicated Freight Corridors clearing passenger tracks.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-bold text-white">Amrit Bharat</span>
            <span className="text-zinc-400">— Modernizing 1,300+ city stations with airport-like concourses.</span>
          </div>
        </div>
      )}

      {/* 5. Stories Tab */}
      {subTab === 'read' && (
        <div className="space-y-2">
          <div
            className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 cursor-pointer hover:border-zinc-500"
            onClick={() => onToast('The night Rajdhani waited at Ratlam for a critical organ transplant corridor.')}
          >
            <div className="text-[9px] text-zinc-500 muted font-bold">5 MIN READ</div>
            <div className="text-sm font-bold text-white">The night Rajdhani held the line</div>
          </div>
          <div
            className="panel bg-[#0A0A0A] border border-[#222] rounded-xl p-3 cursor-pointer hover:border-zinc-500"
            onClick={() => onToast('WAG-9 electric loco pulls 6,000 tonnes of freight over steep gradients.')}
          >
            <div className="text-[9px] text-zinc-500 muted font-bold">RAILWAY LORE</div>
            <div className="text-sm font-bold text-white">How WAG-9 hauls 6000t iron ore</div>
          </div>
        </div>
      )}

      {/* Fullscreen Game Overlay */}
      {activeGame && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 animate-in fade-in">
          <div className="absolute top-4 left-4">
            <div className="logo-mark logo-dark">RX</div>
          </div>

          <div className="text-xs uppercase tracking-widest text-zinc-400 mb-1">
            {activeGame === 'signal' && 'Signal Rush'}
            {activeGame === 'coach' && 'Coach Sort'}
            {activeGame === 'memory' && 'Station Memory'}
            {activeGame === 'quiz' && 'Rail Quiz'}
          </div>

          <div className="text-5xl font-black mb-1 font-mono">{gameScore}</div>
          <div className="text-[10px] text-zinc-500 mb-8">
            {activeGame === 'signal' && 'Tap GREEN · Avoid RED'}
            {activeGame === 'coach' && 'Order: Eng ➔ S1 ➔ S2 ➔ S3'}
            {activeGame === 'memory' && 'Match station pairs'}
            {activeGame === 'quiz' && 'Speed test your railways knowledge'}
          </div>

          {/* Signal Rush Game Area */}
          {activeGame === 'signal' && (
            <div className="flex gap-6 mb-8">
              <button
                type="button"
                onClick={() => handleSignalTap(true)}
                className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 text-3xl flex items-center justify-center shadow-lg active:scale-95 transition"
              >
                🟢
              </button>
              <button
                type="button"
                onClick={() => handleSignalTap(false)}
                className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-400 text-3xl flex items-center justify-center shadow-lg active:scale-95 transition"
              >
                🔴
              </button>
            </div>
          )}

          {/* Coach Sort Game Area */}
          {activeGame === 'coach' && (
            <div className="mb-8 text-center space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {coachOrder.map((c, i) => {
                  const isDone = coachTarget.slice(0, coachIdx).includes(c);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCoachClick(c)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-bold border transition ${
                        isDone
                          ? 'bg-white text-black border-white'
                          : 'bg-[#111] border-[#333] text-white hover:border-zinc-500'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
              <div className="text-[10px] text-zinc-400">
                {coachIdx >= coachTarget.length ? '🎉 All sorted!' : `Next: ${coachTarget[coachIdx]}`}
              </div>
            </div>
          )}

          {/* Station Memory Game Area */}
          {activeGame === 'memory' && (
            <div className="grid grid-cols-3 gap-2 mb-8">
              {memoryCards.map((code, idx) => {
                const isFlipped = flipped.includes(idx) || matched.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCardClick(idx)}
                    className={`w-14 h-14 rounded-xl text-xs font-bold border transition ${
                      isFlipped
                        ? 'bg-white text-black border-white'
                        : 'bg-[#111] border-[#333] text-zinc-500 hover:border-zinc-500'
                    }`}
                  >
                    {isFlipped ? code : '?'}
                  </button>
                );
              })}
            </div>
          )}

          {/* Rail Quiz Game Area */}
          {activeGame === 'quiz' && (
            <div className="flex flex-col gap-2 w-56 mb-8">
              <div className="text-xs font-bold text-center mb-2">Vande Bharat maximum test speed?</div>
              <button
                type="button"
                onClick={() => {
                  setGameScore((s) => s + 100);
                  onToast('Correct! 180 km/h reached in trials.');
                }}
                className="py-3 bg-white text-black rounded-xl text-xs font-bold hover:bg-zinc-200"
              >
                180 km/h
              </button>
              <button
                type="button"
                onClick={() => onToast('Close, but 180 km/h was recorded!')}
                className="py-3 bg-[#111] border border-[#333] text-zinc-300 rounded-xl text-xs font-bold"
              >
                160 km/h
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={endGame}
            className="text-zinc-400 hover:text-white text-xs underline py-2"
          >
            End game · keep XP
          </button>
        </div>
      )}
    </div>
  );
}
