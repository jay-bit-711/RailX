import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Compass,
  Coffee,
  Share2,
  Train
} from 'lucide-react';

const STAGES = [
  { id: 1, chip: '🚗 09:45', label: '09:45', title: 'Leave for station', description: 'Ride to Airoli' },
  { id: 2, chip: '🚪 10:01', label: '10:01', title: 'Station entrance', description: 'Station · Airoli' },
  { id: 3, chip: '🧭 PF', label: '10:03', title: 'Find your platform', description: 'PF 4 · Coach S5' },
  { id: 4, chip: '🚆 10:05', label: '10:05', title: 'Board your train', description: 'Train 12951 · Coach S5' },
  { id: 5, chip: '🍱 12:45', label: '12:45', title: 'Food stop', description: 'Surat Junction' },
  { id: 6, chip: '☕ 16:30', label: '16:30', title: 'Water & tea', description: 'Hydrate · stretch' },
  { id: 7, chip: '🇮🇳 17:20', label: '17:20', title: 'Scenic viewpoint', description: 'Chambal · choose window' },
  { id: 8, chip: '🏁 22:05', label: '22:05', title: 'Destination station', description: 'New Delhi · PF 4' },
  { id: 9, chip: '🚪 22:10', label: '22:10', title: 'Last-mile exit', description: 'Follow exit guidance' },
  { id: 10, chip: '🚕 22:15', label: '22:15', title: 'Local transport', description: 'Ride home · or finish' },
  { id: 11, chip: '✅ 22:45', label: '22:45', title: 'Arrived', description: 'Rate · complete trip' }
];

const RATING_CATEGORIES = [
  ['train', 'Train'],
  ['lastMile', 'Last-mile'],
  ['food', 'Food'],
  ['trainHygiene', 'Train hygiene'],
  ['foodHygiene', 'Food hygiene'],
  ['maintenance', 'Maintenance']
];

export default function GamifiedMissionHub({
  onOpenRapidAssistance,
  onOpenFamilyShare,
  onOpenFoodSheet,
  journey,
  isActive,
  ridePref = 'Auto',
  onSetRidePref,
  onComplete,
  onTravelAgain,
  onOpenRadar,
  onToast
}) {
  const [missionStep, setMissionStep] = useState(1);
  const [pfDirection, setPfDirection] = useState('left');
  const [lastMileChoice, setLastMileChoice] = useState('ride');
  const [scenicWindow, setScenicWindow] = useState('left');
  const [ratings, setRatings] = useState({
    train: 0,
    lastMile: 0,
    food: 0,
    trainHygiene: 0,
    foodHygiene: 0,
    maintenance: 0
  });
  useEffect(() => {
    setMissionStep(1);
    setRatings({ train: 0, lastMile: 0, food: 0, trainHygiene: 0, foodHygiene: 0, maintenance: 0 });
  }, [journey?.id]);

  const currentStage = STAGES[missionStep - 1];
  const allRated = Object.values(ratings).every((rating) => rating > 0);
  const trainName = journey?.trainName || 'Mumbai Rajdhani Express';
  const trainNumber = journey?.trainNumber || '12951';
  const helpEntry = isActive ? (
    <div className="sticky top-0 z-30 flex items-center justify-end gap-2 bg-black/90 py-1 backdrop-blur">
      <a href="tel:139" aria-label="SOS call 139. No auto-dispatch" className="flex items-center gap-1.5 rounded-full border border-[#D4AF37] bg-black px-3 py-2 text-xs font-bold text-[#D4AF37]">
        🆘 <span>SOS</span>
      </a>
      <button type="button" aria-label="Help categories" onClick={() => onOpenRapidAssistance?.('categories')} className="flex items-center gap-1.5 rounded-full border border-[#D4AF37] bg-black px-3 py-2 text-xs font-bold text-[#D4AF37]">
        🛟 <span>Help</span>
      </button>
      <span className="text-[9px] text-zinc-400">No auto-dispatch</span>
    </div>
  ) : null;

  if (!journey) {
    return (
      <section className="space-y-4 animate-in fade-in">
        <div className="rounded-2xl border border-[#222] bg-[#080808] p-5 text-center">
          <CheckCircle2 className="mx-auto h-9 w-9 text-[#D4AF37]" />
          <h1 className="mt-3 text-lg font-extrabold">No active ride</h1>
          <p className="mt-1 text-xs text-zinc-400">Your completed journeys are in Me.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={onTravelAgain} className="rounded-xl bg-white py-3 text-xs font-extrabold text-black">Travel again · Go</button>
            <button type="button" onClick={onOpenRadar} className="rounded-xl border border-[#333] py-3 text-xs font-bold text-white">Open Radar</button>
          </div>
        </div>
      </section>
    );
  }

  const advance = () => setMissionStep((step) => Math.min(step + 1, STAGES.length));

  return (
    <section className="space-y-3 animate-in fade-in">
      {helpEntry}
      <header className="rounded-2xl border border-[#222] bg-[#080808] p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />Active ride
            </div>
            <h1 className="mt-1 truncate text-sm font-extrabold">{journey.fromStation} → {journey.toStation}</h1>
            <p className="mt-1 text-[10px] text-zinc-400">{trainName} · {trainNumber} · {journey.journeyDate}</p>
          </div>
          <button type="button" onClick={onOpenFamilyShare} className="flex shrink-0 items-center gap-1 rounded-lg bg-white px-2.5 py-2 text-[10px] font-bold text-black">
            <Share2 className="h-3.5 w-3.5" />Share
          </button>
        </div>

        <div className="mt-3 rounded-xl border border-[#222] bg-black p-3">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-wide text-zinc-500">
            <Compass className="h-3.5 w-3.5 text-[#D4AF37]" />Last known station
          </div>
          <p className="mt-1 text-xs font-bold text-white">{journey.fromStation} · Platform 4</p>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {STAGES.map((stage) => (
            <button key={stage.id} type="button" onClick={() => setMissionStep(stage.id)} aria-label={`Stage ${stage.id} ${stage.chip}`} aria-current={missionStep === stage.id ? 'step' : undefined} className={`rounded-lg border px-1 py-2 text-center text-[9px] font-mono ${missionStep === stage.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-extrabold' : missionStep > stage.id ? 'border-[#333] text-[#D4AF37]' : 'border-[#222] text-zinc-500'}`}>
              {stage.chip}
            </button>
          ))}
        </div>
      </header>

      <section className="w-full rounded-2xl border border-[#D4AF37]/40 bg-[#080808] p-3" aria-label="🇮🇳 Scenic · 17:20">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-white">🇮🇳 Scenic</span>
          <span className="text-xs font-mono text-[#D4AF37]">17:20 · Chambal</span>
          <div className="flex gap-1">
            <button type="button" aria-label="Left window" aria-pressed={scenicWindow === 'left'} onClick={() => setScenicWindow('left')} className={`rounded-lg px-2 py-1 ${scenicWindow === 'left' ? 'bg-[#D4AF37] text-black' : 'text-white'}`}>◀</button>
            <button type="button" aria-label="Right window" aria-pressed={scenicWindow === 'right'} onClick={() => setScenicWindow('right')} className={`rounded-lg px-2 py-1 ${scenicWindow === 'right' ? 'bg-[#D4AF37] text-black' : 'text-white'}`}>▶</button>
          </div>
        </div>
      </section>

      <article key={missionStep} className="ride-stage-motion rounded-2xl border border-[#222] bg-[#080808] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37]">Stage {String(missionStep).padStart(2, '0')} · {currentStage.label}</div>
            <h2 className="mt-1 text-base font-extrabold">{currentStage.title}</h2>
            <p className="mt-1 text-xs text-zinc-400">{currentStage.description}</p>
          </div>
          {missionStep === 1 && <Train className="h-5 w-5 shrink-0 text-[#D4AF37]" />}
          {missionStep === 6 && <Coffee className="h-5 w-5 shrink-0 text-[#D4AF37]" />}
        </div>

        {missionStep === 1 && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {[['Bike', '12 min'], ['Auto', '16 min'], ['Cab', '18 min']].map(([mode, duration]) => (
                <button key={mode} type="button" aria-pressed={ridePref === mode} onClick={() => { onSetRidePref?.(mode); onToast(`${mode} selected · ${duration} to the station`); }} className={`rounded-xl border bg-black p-3 text-left ${ridePref === mode ? 'border-[#D4AF37]' : 'border-[#333]'}`}>
                  <span className="block text-xs font-bold">{mode}</span><span className="mt-1 block text-[10px] text-zinc-400">{duration} · Start now</span>
                </button>
              ))}
            </div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Start ride · 09:45</button>
          </div>
        )}

        {missionStep === 2 && (
          <div className="mt-4 space-y-3 text-center">
            <div className="rounded-xl border border-[#222] bg-black p-4 text-3xl">🚪</div>
            <p className="text-xs text-zinc-300">{journey.fromStation} · 10:01</p>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">PF · 10:03</button>
          </div>
        )}

        {missionStep === 3 && (
          <div className="mt-4">
            <DirectionCompass direction={pfDirection} />
            <p className="mt-3 text-center text-xs font-bold text-white">
              {pfDirection === 'left' ? 'Left from gate · stairs · coach S5' : pfDirection === 'right' ? 'Right from gate · ramp · coach S5' : 'Straight from gate · FOB · coach S5'}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[['left', 'Left', ArrowLeft], ['straight', 'Straight', ArrowUp], ['right', 'Right', ArrowRight]].map(([direction, label, Icon]) => (
                <button key={direction} type="button" aria-pressed={pfDirection === direction} onClick={() => setPfDirection(direction)} className={`flex items-center justify-center gap-1 rounded-lg border py-2 text-[10px] font-bold ${pfDirection === direction ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333] text-zinc-400'}`}>
                  <Icon className="h-3.5 w-3.5" />{label}
                </button>
              ))}
            </div>
            <button type="button" onClick={advance} className="mt-4 w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Board · 10:05</button>
          </div>
        )}

        {missionStep === 4 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-[#222] bg-black p-4 text-center">
              <Train className="mx-auto h-7 w-7 text-[#D4AF37]" /><p className="mt-2 text-sm font-bold">{trainNumber} · Coach S5</p><p className="mt-1 text-[10px] text-zinc-400">{journey.fromStation} · 10:05</p>
            </div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Food · 12:45</button>
          </div>
        )}

        {missionStep === 5 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-[#222] bg-black p-3 text-xs"><div className="font-bold">Surat Junction · 8 min halt</div><p className="mt-1 text-[10px] text-zinc-400">Food delivery to your coach.</p></div>
            <button type="button" onClick={onOpenFoodSheet} className="w-full rounded-xl border border-[#333] py-3 text-xs font-bold">Order food</button>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Continue journey</button>
          </div>
        )}

        {missionStep === 6 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-[#222] bg-black p-3 text-xs">Water and tea stop · remember to take your bottle with you.</div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Scenic · 17:20</button>
          </div>
        )}

        {missionStep === 7 && (
          <div className="mt-4 space-y-3">
            <p className="text-center text-xs text-zinc-300">Chambal · 17:20 · {scenicWindow} window</p>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Destination · 22:05</button>
          </div>
        )}

        {missionStep === 8 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-[#222] bg-black p-3 text-xs"><div className="font-bold">{journey.toStation} · Platform 4</div><p className="mt-1 text-[10px] text-zinc-400">🏁 Arrived · 22:05</p></div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Exit · 22:10</button>
          </div>
        )}

        {missionStep === 9 && (
          <div className="mt-4 space-y-3">
            <DirectionCompass direction={pfDirection} />
            <p className="text-center text-xs font-bold text-white">Exit Platform 4 · {pfDirection} from gate · follow last-mile signs</p>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Pickup · 22:15</button>
          </div>
        )}

        {missionStep === 10 && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button type="button" aria-pressed={lastMileChoice === 'ride'} onClick={() => setLastMileChoice('ride')} className={`rounded-xl border p-3 text-left text-xs font-bold ${lastMileChoice === 'ride' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333]'}`}>🚕 {ridePref}<span className="mt-1 block text-[10px] text-zinc-400">To your door</span></button>
              <button type="button" aria-pressed={lastMileChoice === 'station'} onClick={() => setLastMileChoice('station')} className={`rounded-xl border p-3 text-left text-xs font-bold ${lastMileChoice === 'station' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333]'}`}>🏁 Station<span className="mt-1 block text-[10px] text-zinc-400">End here</span></button>
            </div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Arrived · 22:45</button>
          </div>
        )}

        {missionStep === 11 && (
          <div className="mt-4 space-y-3">
            {RATING_CATEGORIES.map(([key, label]) => (
              <div key={key} className="flex items-center justify-between gap-2 border-b border-[#222] pb-2">
                <span className="text-[11px]">{label}</span>
                <div className="flex gap-1" role="group" aria-label={`Rate ${label}`}>
                  {['😡', '😕', '😐', '🙂', '🤩'].map((emoji, index) => (
                    <button key={emoji} type="button" aria-label={`${index + 1} of 5 for ${label}`} aria-pressed={ratings[key] === index + 1} onClick={() => setRatings((current) => ({ ...current, [key]: index + 1 }))} className={`rounded-lg px-1 text-lg ${ratings[key] === index + 1 ? 'bg-[#D4AF37]/15' : 'opacity-60'}`}>{emoji}</button>
                  ))}
                </div>
              </div>
            ))}
            <button type="button" disabled={!allRated} onClick={() => onComplete(ratings)} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black disabled:cursor-not-allowed disabled:opacity-40">✅ Complete · +250 XP</button>
          </div>
        )}
      </article>
    </section>
  );
}

function DirectionCompass({ direction }) {
  const rotation = direction === 'left' ? -90 : direction === 'right' ? 90 : 0;
  return (
    <div className="compass-pulse mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/5">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#333] bg-black">
        <Compass className="absolute h-24 w-24 text-zinc-700" strokeWidth={1} />
        <ArrowUp className="compass-arrow-motion relative h-12 w-12 text-[#D4AF37]" style={{ '--compass-rotation': `${rotation}deg` }} strokeWidth={3} />
        <span className="absolute bottom-2 text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">{direction}</span>
      </div>
    </div>
  );
}
