import React, { useState } from 'react';
import { Cable, Gauge, Zap } from 'lucide-react';

const ARC_LENGTH = 251.3;

export default function LocomotiveEngineDeck({ onToast }) {
  const [notch, setNotch] = useState(12);
  const progress = notch / 32;
  const speed = Math.round(progress * 140);
  const horsepower = Math.round(progress * 6350);
  const offset = ARC_LENGTH * (1 - progress);

  return (
    <section className="space-y-4 p-2" aria-label="Engine controls">
      <div className="relative mx-auto aspect-square w-full max-w-[300px]">
        <svg viewBox="0 0 200 125" className="h-full w-full" role="img" aria-label={`Speed ${speed} kilometres per hour`}>
          <path d="M 20 105 A 80 80 0 0 1 180 105" fill="none" stroke="#333" strokeWidth="12" strokeLinecap="round" />
          <path className="engine-speed-arc" d="M 20 105 A 80 80 0 0 1 180 105" fill="none" stroke="#D4AF37" strokeWidth="12" strokeLinecap="round" strokeDasharray={ARC_LENGTH} strokeDashoffset={offset} />
        </svg>
        <div className="absolute inset-x-0 bottom-5 text-center">
          <Gauge className="mx-auto h-6 w-6 text-[#D4AF37]" />
          <div className="font-mono text-5xl font-black text-white">{speed}</div>
          <div className="text-xs text-zinc-400">km/h</div>
        </div>
      </div>

      <label className="block rounded-2xl border border-[#222] bg-[#080808] p-4">
        <span className="mb-3 flex items-center justify-between text-xs font-bold text-white">
          <span>🎚 Notch {notch}</span><span>0–32</span>
        </span>
        <input aria-label={`Throttle notch ${notch} of 32`} type="range" min="0" max="32" value={notch} onChange={(event) => setNotch(Number(event.target.value))} className="w-full accent-[#D4AF37]" />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" aria-label="Regenerative braking" onClick={() => onToast('⚡ Regen → grid')} className="flex min-h-20 items-center justify-center rounded-2xl border border-[#333] bg-[#080808] text-[#D4AF37]">
          <Zap className="h-8 w-8" />
        </button>
        <button type="button" aria-label="Pantograph" onClick={() => onToast('⚡ Pantograph · 25 kV')} className="flex min-h-20 items-center justify-center rounded-2xl border border-[#333] bg-[#080808] text-[#D4AF37]">
          <Cable className="h-8 w-8" />
        </button>
      </div>

      <div className="rounded-2xl border border-[#222] bg-[#080808] p-4">
        <div className="mb-2 flex items-center justify-between text-xs font-bold">
          <span>HP</span><span className="font-mono text-[#D4AF37]">{horsepower.toLocaleString('en-GB')} / 6,350</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-[#222]">
          <div className="engine-hp-gauge h-full rounded-full bg-[#D4AF37]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
