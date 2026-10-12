import React, { useState } from 'react';
import { Gauge, Zap, Activity, Award, Cpu, ShieldCheck, ChevronRight } from 'lucide-react';

export default function LocomotiveEngineDeck({ onToast }) {
  const [throttleNotch, setThrottleNotch] = useState(18); // 0 to 32 notches

  const currentPowerKw = Math.round((throttleNotch / 32) * 4500);
  const currentSpeed = Math.round((throttleNotch / 32) * 140);
  const regenKwhToday = 1420 + Math.round((throttleNotch * 4.2));

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
            <span>Locomotive Engineering Deck</span>
            <span className="gold-badge text-[9px] px-2 py-0.5 rounded-full font-mono font-bold">
              WAP-7 / 3-PHASE AC
            </span>
          </h2>
          <p className="text-[10px] text-zinc-500">
            Real automotive-grade electrical telemetry & traction physics
          </p>
        </div>
      </div>

      {/* Visual Automotive Cutaway Diagram */}
      <div className="panel bg-[#080808] border border-[#222222] rounded-2xl p-4 space-y-4">
        {/* SVG Locomotive Architecture Diagram */}
        <div className="relative w-full h-36 bg-black border border-[#1a1a1a] rounded-xl flex items-center justify-center overflow-hidden">
          {/* Overhead 25kV OHE Catenary wire */}
          <div className="absolute top-2 left-0 right-0 h-[1px] bg-zinc-700 flex justify-around">
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">25,000V AC Overhead Wire</span>
          </div>

          <svg viewBox="0 0 400 120" className="w-full h-full p-2">
            {/* Pantograph */}
            <path d="M 180 20 L 200 40 L 220 20" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <line x1="200" y1="20" x2="200" y2="40" stroke="#D4AF37" strokeWidth="2" />

            {/* Locomotive Body Shell */}
            <rect x="50" y="40" width="300" height="50" rx="8" fill="#111111" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M 50 55 L 70 40" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M 350 55 L 330 40" stroke="#ffffff" strokeWidth="1.5" />

            {/* Cab Windshields */}
            <polygon points="55,50 75,45 75,60 55,60" fill="#222" stroke="#ffffff" strokeWidth="1" />
            <polygon points="345,50 325,45 325,60 345,60" fill="#222" stroke="#ffffff" strokeWidth="1" />

            {/* Internal Cutaway Compartments */}
            {/* Transformer */}
            <rect x="90" y="46" width="45" height="38" rx="3" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="1" />
            <text x="94" y="68" fill="#D4AF37" fontSize="8" fontFamily="monospace" fontWeight="bold">X-FORMER</text>

            {/* GTO/IGBT Converter */}
            <rect x="145" y="46" width="55" height="38" rx="3" fill="#1a1a1a" stroke="#ffffff" strokeWidth="1" />
            <text x="150" y="68" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">IGBT INV</text>

            {/* Aux Compressors & Blowers */}
            <rect x="210" y="46" width="50" height="38" rx="3" fill="#1a1a1a" stroke="#555" strokeWidth="1" />
            <text x="216" y="68" fill="#888" fontSize="8" fontFamily="monospace">BLOWERS</text>

            {/* Dynamic Brake Grid */}
            <rect x="270" y="46" width="45" height="38" rx="3" fill="#1a1a1a" stroke="#D4AF37" strokeWidth="1" />
            <text x="276" y="68" fill="#D4AF37" fontSize="8" fontFamily="monospace">REGEN</text>

            {/* Bogies & Wheels (Co-Co 6 Axles) */}
            <circle cx="85" cy="98" r="10" fill="#000" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="115" cy="98" r="10" fill="#000" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="145" cy="98" r="10" fill="#000" stroke="#ffffff" strokeWidth="1.5" />

            <circle cx="255" cy="98" r="10" fill="#000" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="285" cy="98" r="10" fill="#000" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="315" cy="98" r="10" fill="#000" stroke="#ffffff" strokeWidth="1.5" />

            {/* Wheel center dots */}
            <circle cx="85" cy="98" r="3" fill="#D4AF37" />
            <circle cx="115" cy="98" r="3" fill="#D4AF37" />
            <circle cx="145" cy="98" r="3" fill="#D4AF37" />
            <circle cx="255" cy="98" r="3" fill="#D4AF37" />
            <circle cx="285" cy="98" r="3" fill="#D4AF37" />
            <circle cx="315" cy="98" r="3" fill="#D4AF37" />
          </svg>
        </div>

        {/* 4 Core Engineering Visual Meters */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-black border border-[#222222] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-bold text-zinc-500 flex justify-between">
              <span>Horsepower Rating</span>
              <span className="text-[#D4AF37]">6,350 HP</span>
            </div>
            <div className="text-lg font-black font-mono text-white">
              {currentPowerKw} <span className="text-xs font-normal text-zinc-400">kW</span>
            </div>
            <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${(currentPowerKw / 4500) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-3 bg-black border border-[#222222] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-bold text-zinc-500 flex justify-between">
              <span>Regenerative Braking</span>
              <span className="text-[#D4AF37]">Fed to Grid</span>
            </div>
            <div className="text-lg font-black font-mono text-[#D4AF37]">
              {regenKwhToday} <span className="text-xs font-normal text-zinc-400">kWh</span>
            </div>
            <p className="text-[9px] text-zinc-500">
              Powers ~120 homes for a day via regenerative deceleration!
            </p>
          </div>

          <div className="p-3 bg-black border border-[#222222] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-bold text-zinc-500 flex justify-between">
              <span>Rake Tonnage Hauled</span>
              <span className="text-white">24 Coaches</span>
            </div>
            <div className="text-lg font-black font-mono text-white">
              1,450 <span className="text-xs font-normal text-zinc-400">Tonnes</span>
            </div>
            <p className="text-[9px] text-zinc-500">
              Stainless Steel LHB crash-proof coaches at 130 km/h
            </p>
          </div>

          <div className="p-3 bg-black border border-[#222222] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-bold text-zinc-500 flex justify-between">
              <span>Lifetime Passengers</span>
              <span className="text-[#D4AF37]">Since 2018</span>
            </div>
            <div className="text-lg font-black font-mono text-white">
              1.84 <span className="text-xs font-normal text-zinc-400">Million</span>
            </div>
            <p className="text-[9px] text-zinc-500">
              Traversed 2.4M km without single traction motor failure
            </p>
          </div>
        </div>

        {/* Interactive Master Controller Notch Slider */}
        <div className="p-3.5 bg-black border border-[#222222] rounded-xl space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">
              Driver Master Throttle: Notch {throttleNotch}/32
            </span>
            <span className="font-mono font-bold text-white text-xs">
              Simulated Speed: {currentSpeed} km/h
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="32"
            value={throttleNotch}
            onChange={(e) => setThrottleNotch(Number(e.target.value))}
            className="w-full accent-white bg-[#222] h-2 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[9px] text-zinc-500 font-mono">
            <span>Idle (0)</span>
            <span>Half Power (16)</span>
            <span className="text-[#D4AF37]">Full Notch 32 (130 km/h)</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToast(`⚡ Master Controller set to Notch ${throttleNotch}! Traction motors humming at 1,450 RPM.`)}
          className="w-full py-2.5 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider hover:bg-zinc-200 transition"
        >
          Engage Traction Throttle
        </button>
      </div>
    </div>
  );
}
