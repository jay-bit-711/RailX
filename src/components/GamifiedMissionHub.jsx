import React, { useState } from 'react';
import {
  Compass,
  Navigation,
  Clock,
  MapPin,
  Train,
  ShieldAlert,
  Flame,
  Award,
  Share2,
  ChevronRight,
  Sparkles,
  Wind,
  Thermometer,
  Users,
  UtensilsCrossed,
  Zap,
  Coffee,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  LifeBuoy,
  Smartphone
} from 'lucide-react';
import LocomotiveEngineDeck from './LocomotiveEngineDeck';

export default function GamifiedMissionHub({
  onOpenEngineDeck,
  onOpenRapidAssistance,
  onOpenFamilyShare,
  onOpenFoodSheet,
  onOpenDataSheet,
  onOpenSupport,
  onToast
}) {
  const [missionStep, setMissionStep] = useState(1); // 1 to 5
  const [transportChoice, setTransportChoice] = useState('auto'); // 'auto' | 'bike'
  const [pfDirection, setPfDirection] = useState('straight');

  return (
    <div className="space-y-4 animate-in fade-in">
      {/* Top Mission Status Banner */}
      <div className="panel bg-[#080808] border border-[#222222] rounded-2xl p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#D4AF37]">
                Your ride
              </span>
            </div>
            <h1 className="text-base font-extrabold text-white mt-1">
              Navi Mumbai (Airoli) ➔ Connaught Place (Delhi)
            </h1>
            <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
              10:05 Departure • 22:05 Arrival · Train #12951
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenFamilyShare}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white text-black text-[10px] font-bold rounded-xl active:scale-95 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Family Tracker</span>
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-[#222] bg-black p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-wide text-zinc-500">Last known station</div>
              <div className="text-xs font-bold text-white">Mumbai Central · MMCT</div>
            </div>
            <Compass className="h-5 w-5 text-[#D4AF37]" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { id: 'left', label: 'Left', Icon: ArrowLeft },
              { id: 'straight', label: 'Straight', Icon: ArrowUp },
              { id: 'right', label: 'Right', Icon: ArrowRight }
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={pfDirection === id}
                onClick={() => setPfDirection(id)}
                className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-[10px] font-bold ${
                  pfDirection === id ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#222] text-zinc-400'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />{label}
              </button>
            ))}
          </div>
          <div className="mt-2 text-[10px] text-zinc-500">Platform 4 · follow the {pfDirection} exit direction</div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <button type="button" onClick={() => onOpenRapidAssistance?.('sos')} className="flex items-center justify-center gap-1.5 rounded-lg border border-[#333] py-2 text-[10px] font-bold text-[#D4AF37]">
            <ShieldAlert className="h-3.5 w-3.5" />SOS
          </button>
          <button type="button" onClick={onOpenSupport} className="flex items-center justify-center gap-1.5 rounded-lg border border-[#333] py-2 text-[10px] font-bold text-white">
            <LifeBuoy className="h-3.5 w-3.5" />Support
          </button>
          <button type="button" onClick={onOpenDataSheet} className="flex items-center justify-center gap-1.5 rounded-lg border border-[#333] py-2 text-[10px] font-bold text-white">
            <Smartphone className="h-3.5 w-3.5 text-[#D4AF37]" />Data
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="grid grid-cols-5 gap-1.5 mt-4">
          {[
            { step: 1, label: '09:45 Traffic' },
            { step: 2, label: '10:01 Gate' },
            { step: 3, label: '10:03 PF 4' },
            { step: 4, label: '10:05 Depart' },
            { step: 5, label: '12:45 Food' }
          ].map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setMissionStep(s.step)}
              className={`py-1.5 rounded-lg text-center transition ${
                missionStep === s.step
                  ? 'bg-white text-black font-extrabold text-[10px]'
                  : missionStep > s.step
                  ? 'bg-[#181818] text-[#D4AF37] font-bold text-[9px] border border-[#2a2a2a]'
                  : 'bg-[#0f0f0f] text-zinc-600 text-[9px]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= STAGE 1: 09:45 TRAFFIC & 3-WHEELER VS 2-WHEELER ================= */}
      {missionStep === 1 && (
        <div className="panel bg-[#080808] border border-[#222222] rounded-2xl p-4 space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-zinc-400">⏱️ STAGE 01 · 09:45</span>
            <span className="gold-badge text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
              Airoli Sector 8
            </span>
          </div>

          <div className="p-3.5 bg-black border border-[#222] rounded-xl space-y-2">
            <div className="text-xs font-bold text-white flex justify-between">
              <span>Traffic Matrix to Station Entrance</span>
              <span className="text-[#D4AF37]">Train at 10:05</span>
            </div>

            {/* Transport Decision Matrix */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div
                onClick={() => setTransportChoice('auto')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  transportChoice === 'auto'
                    ? 'border-white bg-white/10'
                    : 'border-[#222] bg-[#0c0c0c] hover:border-zinc-700'
                }`}
              >
                <div className="text-xs font-bold text-white">🛺 3-Wheeler Auto</div>
                <div className="text-[11px] text-[#D4AF37] font-bold mt-1">START NOW (09:45)</div>
                <p className="text-[9px] text-zinc-400 mt-0.5">
                  16 mins in current Airoli-Thane junction traffic. Zero buffer left.
                </p>
              </div>

              <div
                onClick={() => setTransportChoice('bike')}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  transportChoice === 'bike'
                    ? 'border-white bg-white/10'
                    : 'border-[#222] bg-[#0c0c0c] hover:border-zinc-700'
                }`}
              >
                <div className="text-xs font-bold text-white">🏍️ 2-Wheeler Bike</div>
                <div className="text-[11px] text-[#D4AF37] font-bold mt-1">7 MINS BUFFER</div>
                <p className="text-[9px] text-zinc-400 mt-0.5">
                  You can leave at 09:52. Quick navigation through flyover lane.
                </p>
              </div>
            </div>

            <div className="p-2.5 bg-[#111] rounded-lg border border-[#222] text-[10px] text-zinc-400 flex justify-between items-center font-mono">
              <span>⚠️ LAST WINDOW TO CATCH TRAIN:</span>
              <span className="text-[#D4AF37] font-bold">10:02 SHARP</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onToast("🛺 Ride initiated at 09:45! GPS route locked. En route to station.");
              setMissionStep(2);
            }}
            className="w-full py-3.5 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider active:scale-[.98] transition"
          >
            Start Ride Now · 09:45 (Next: Station Entrance)
          </button>
        </div>
      )}

      {/* ================= STAGE 2: 10:01 STATION ENTRANCE & ENV HUD ================= */}
      {missionStep === 2 && (
        <div className="panel bg-[#080808] border border-[#222222] rounded-2xl p-4 space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-zinc-400">📍 STAGE 02 · 10:01</span>
            <span className="gold-badge text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
              Station Main Concourse
            </span>
          </div>

          {/* Environmental & Crowd HUD */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-3 bg-black border border-[#222] rounded-xl text-center space-y-1">
              <Users className="w-4 h-4 text-white mx-auto" />
              <div className="text-[9px] text-zinc-500 uppercase">Crowd Density</div>
              <div className="font-bold text-[#D4AF37] font-mono">34% (Low)</div>
              <div className="text-[8px] text-zinc-500">Security line ~90s</div>
            </div>

            <div className="p-3 bg-black border border-[#222] rounded-xl text-center space-y-1">
              <Wind className="w-4 h-4 text-white mx-auto" />
              <div className="text-[9px] text-zinc-500 uppercase">Station AQI</div>
              <div className="font-bold text-[#D4AF37] font-mono">142 AQI</div>
              <div className="text-[8px] text-zinc-500">Moderate air</div>
            </div>

            <div className="p-3 bg-black border border-[#222] rounded-xl text-center space-y-1">
              <Thermometer className="w-4 h-4 text-white mx-auto" />
              <div className="text-[9px] text-zinc-500 uppercase">Temperature</div>
              <div className="font-bold text-white font-mono">32°C</div>
              <div className="text-[8px] text-zinc-500">Sunny / Warm</div>
            </div>
          </div>

          {/* Platform Confirmation */}
          <div className="p-3.5 bg-black border border-[#222] rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Platform 4 Confirmed</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">No Platform Change</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Take Central Escalator. Train 12951 rake already placed on Platform 4.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onToast("🏃 Arrived Platform 4 at 10:03. Standing by Coach B3 marker.");
              setMissionStep(3);
            }}
            className="w-full py-3.5 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider active:scale-[.98] transition"
          >
            Sprint to Platform 4 (10:03)
          </button>
        </div>
      )}

      {/* ================= STAGE 3: 10:03 PLATFORM 4 & BOARDING ================= */}
      {missionStep === 3 && (
        <div className="panel bg-[#080808] border border-[#222222] rounded-2xl p-4 space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-zinc-400">🚉 STAGE 03 · 10:03</span>
            <span className="gold-badge text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
              Platform 4 Marker
            </span>
          </div>

          <div className="p-4 bg-black border border-[#222] rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white">Boarded Coach B3 · Berth 21</span>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                LUGGAGE STOWED
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Window seat occupied. Train guard whistling. Electric locomotive WAP-7 blower fans revving up for 10:05 departure.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              onToast("🚆 Departure at 10:05 sharp! Throttle surging to 130 km/h.");
              setMissionStep(4);
            }}
            className="w-full py-3.5 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider active:scale-[.98] transition"
          >
            Depart Right on Time · 10:05 (0 Delay)
          </button>
        </div>
      )}

      {/* ================= STAGE 4: 10:05 DEPARTURE & SETTLED MODE ================= */}
      {missionStep === 4 && (
        <div className="panel bg-[#080808] border border-[#222222] rounded-2xl p-4 space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-zinc-400">⚡ STAGE 04 · IN FLIGHT</span>
            <span className="gold-badge text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
              128 km/h Active
            </span>
          </div>

          <div className="p-3.5 bg-black border border-[#222] rounded-xl flex justify-between items-center">
            <div>
              <div className="text-2xl font-black font-mono text-white">128</div>
              <div className="text-[10px] text-zinc-500 font-mono">km/h · Zero Delay</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-[#D4AF37] font-mono">Next Checkpoint</div>
              <div className="text-[10px] text-zinc-400">12:45 Surat Food Stop</div>
            </div>
          </div>

          {/* Settle In & Play Deck Trigger Buttons */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={onOpenEngineDeck}
              className="p-3 bg-black border border-[#222] hover:border-white rounded-xl text-left space-y-1 transition"
            >
              <div className="text-lg">🚂</div>
              <div className="font-bold text-white">Engine Tech Deck</div>
              <p className="text-[9px] text-zinc-500">6,000 HP & Regen stats</p>
            </button>

            <button
              type="button"
              onClick={onOpenRapidAssistance}
              className="p-3 bg-black border border-[#222] hover:border-white rounded-xl text-left space-y-1 transition"
            >
              <div className="text-lg">🚨</div>
              <div className="font-bold text-white">Assistance & SOS</div>
              <p className="text-[9px] text-zinc-500">RPF, Repairs, Scenic radar</p>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMissionStep(5)}
            className="w-full py-3 bg-[#111] border border-[#222] hover:border-white text-white font-bold rounded-xl text-xs uppercase tracking-wider transition"
          >
            Advance to 12:45 Food Checkpoint ➔
          </button>
        </div>
      )}

      {/* ================= STAGE 5: 12:45 FOOD STOP ================= */}
      {missionStep === 5 && (
        <div className="panel bg-[#080808] border border-[#222222] rounded-2xl p-4 space-y-4 animate-in fade-in">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-zinc-400">🍱 STAGE 05 · 12:45</span>
            <span className="gold-badge text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
              Surat Jn (8 Min Halt)
            </span>
          </div>

          <div className="p-3.5 bg-black border border-[#222] rounded-xl space-y-2 text-xs">
            <div className="flex justify-between font-bold text-white">
              <span>Time & Halt Availability Analysis</span>
              <span className="text-[#D4AF37]">Verified Halt</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Surat platform halt is 8 minutes. In-seat delivery partner pre-positioned at Coach B3 entry door.
              Delivered hot & hygienic in tamper-proof container.
            </p>
            <div className="p-2 bg-[#111] rounded-lg border border-[#222] flex justify-between items-center text-[10px] font-mono">
              <span className="text-zinc-400">Haldiram’s Thali + Surati Locho</span>
              <span className="text-[#D4AF37] font-bold">₹249 Paid</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onOpenFoodSheet}
              className="py-3 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider"
            >
              Order Additional Meal
            </button>
            <button
              type="button"
              onClick={onOpenRapidAssistance}
              className="py-3 bg-[#111] border border-[#222] hover:border-white text-white font-bold rounded-xl text-xs"
            >
              Rate Hygiene / Smoke Break
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onToast("🎉 Journey completed on schedule at Connaught Place (22:05)! +250 XP earned.");
              setMissionStep(1);
            }}
            className="w-full py-2.5 text-zinc-500 hover:text-white text-xs text-center"
          >
            Reset Gamified Mission Loop
          </button>
        </div>
      )}
    </div>
  );
}
