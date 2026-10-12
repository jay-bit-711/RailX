import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Compass,
  Coffee,
  LifeBuoy,
  ShieldAlert,
  Share2,
  Smartphone,
  Train
} from 'lucide-react';

const STAGES = [
  { id: 1, label: '09:45', title: 'Leave for station', description: 'Your ride to Airoli station is ready.' },
  { id: 2, label: '10:01', title: 'Station entrance', description: 'Last known station · Airoli' },
  { id: 3, label: '10:03', title: 'Find your platform', description: 'Platform 4 · Coach S5' },
  { id: 4, label: '10:05', title: 'Board your train', description: 'Train 12951 · Coach S5' },
  { id: 5, label: '12:45', title: 'Food stop', description: 'Surat Junction' },
  { id: 6, label: '16:30', title: 'Water & tea', description: 'Stretch, hydrate and check your next stop.' },
  { id: 7, label: '22:05', title: 'Destination station', description: 'Arrive at New Delhi · Platform 4' },
  { id: 8, label: '22:10', title: 'Last mile', description: 'Choose local transport or end at the station.' },
  { id: 9, label: '22:45', title: 'Arrived', description: 'Rate your journey and close the trip.' }
];

const RATING_CATEGORIES = [
  ['train', 'Train'],
  ['ride', 'Uber / auto'],
  ['food', 'Food'],
  ['trainHygiene', 'Train hygiene'],
  ['foodHygiene', 'Food hygiene'],
  ['maintenance', 'Maintenance']
];

export default function GamifiedMissionHub({
  onOpenEngineDeck,
  onOpenRapidAssistance,
  onOpenFamilyShare,
  onOpenFoodSheet,
  onOpenDataSheet,
  onOpenSupport,
  journey,
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
  const [ratings, setRatings] = useState({
    train: 0,
    ride: 0,
    food: 0,
    trainHygiene: 0,
    foodHygiene: 0,
    maintenance: 0
  });
  useEffect(() => {
    setMissionStep(1);
    setRatings({ train: 0, ride: 0, food: 0, trainHygiene: 0, foodHygiene: 0, maintenance: 0 });
  }, [journey?.id]);

  const currentStage = STAGES[missionStep - 1];
  const allRated = Object.values(ratings).every((rating) => rating > 0);
  const trainName = journey?.trainName || 'Mumbai Rajdhani Express';
  const trainNumber = journey?.trainNumber || '12951';

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

        <div className="mt-2 grid grid-cols-3 gap-2">
          <button type="button" onClick={() => onOpenRapidAssistance?.('sos')} className="flex items-center justify-center gap-1 rounded-lg border border-[#D4AF37] py-2 text-[10px] font-bold text-[#D4AF37]"><ShieldAlert className="h-3.5 w-3.5" />SOS</button>
          <button type="button" onClick={onOpenSupport} className="flex items-center justify-center gap-1 rounded-lg border border-[#333] py-2 text-[10px] font-bold"><LifeBuoy className="h-3.5 w-3.5" />Support</button>
          <button type="button" onClick={onOpenDataSheet} className="flex items-center justify-center gap-1 rounded-lg border border-[#333] py-2 text-[10px] font-bold"><Smartphone className="h-3.5 w-3.5 text-[#D4AF37]" />Data</button>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {STAGES.map((stage) => (
            <button key={stage.id} type="button" onClick={() => setMissionStep(stage.id)} aria-current={missionStep === stage.id ? 'step' : undefined} className={`rounded-lg border px-1 py-2 text-center text-[9px] font-mono ${missionStep === stage.id ? 'border-white bg-white text-black font-extrabold' : missionStep > stage.id ? 'border-[#333] text-[#D4AF37]' : 'border-[#222] text-zinc-500'}`}>
              {stage.label} · {stage.id === 9 ? 'Rate' : stage.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </header>

      <article className="rounded-2xl border border-[#222] bg-[#080808] p-4">
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
            <button type="button" onClick={advance} className="mt-4 w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">I’m at the station</button>
          </div>
        )}

        {missionStep === 3 && (
          <div className="mt-4 space-y-3">
            <DirectionCompass direction={pfDirection} />
            <div className="rounded-xl border border-[#222] bg-black p-3 text-xs"><span className="text-zinc-400">Platform 4</span><span className="float-right font-bold text-[#D4AF37]">Coach S5</span></div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Board train · 10:03</button>
          </div>
        )}

        {missionStep === 4 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-[#222] bg-black p-4 text-center">
              <Train className="mx-auto h-7 w-7 text-[#D4AF37]" /><p className="mt-2 text-sm font-bold">On board · {trainNumber}</p><p className="mt-1 text-[10px] text-zinc-400">Last known station · {journey.fromStation}</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" onClick={onOpenEngineDeck} className="rounded-lg border border-[#333] py-2 text-[10px] font-bold">Engine</button>
              <button type="button" onClick={() => onOpenRapidAssistance?.('sos')} className="rounded-lg border border-[#333] py-2 text-[10px] font-bold">Help</button>
              <button type="button" onClick={onOpenDataSheet} className="rounded-lg border border-[#333] py-2 text-[10px] font-bold">Data</button>
            </div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Continue to Surat · 12:45</button>
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
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Continue to destination · 22:05</button>
          </div>
        )}

        {missionStep === 7 && (
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-[#222] bg-black p-3 text-xs"><div className="font-bold">{journey.toStation} · Platform 4</div><p className="mt-1 text-[10px] text-zinc-400">Check your bags and follow the exit signs.</p></div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">Plan last mile</button>
          </div>
        )}

        {missionStep === 8 && (
          <div className="mt-4 space-y-3">
            <DirectionCompass direction={pfDirection} />
            <p className="text-center text-xs font-bold text-white">Exit Platform 4 · {pfDirection} from gate · follow last-mile signs</p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" aria-pressed={lastMileChoice === 'ride'} onClick={() => setLastMileChoice('ride')} className={`rounded-xl border p-3 text-left text-xs font-bold ${lastMileChoice === 'ride' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333]'}`}>Board local transport<span className="mt-1 block text-[10px] text-zinc-400">{ridePref} · to your door</span></button>
              <button type="button" aria-pressed={lastMileChoice === 'station'} onClick={() => setLastMileChoice('station')} className={`rounded-xl border p-3 text-left text-xs font-bold ${lastMileChoice === 'station' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333]'}`}>End at station<span className="mt-1 block text-[10px] text-zinc-400">Finish here</span></button>
            </div>
            <button type="button" onClick={advance} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black">{lastMileChoice === 'ride' ? `Continue by ${ridePref}` : 'End journey at station'}</button>
          </div>
        )}

        {missionStep === 9 && (
          <div className="mt-4 space-y-3">
            {RATING_CATEGORIES.map(([key, label]) => (
              <div key={key} className="flex items-center justify-between gap-2 border-b border-[#222] pb-2">
                <span className="text-[11px]">{label}</span>
                <div className="flex gap-1" role="group" aria-label={`Rate ${label}`}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button key={rating} type="button" aria-label={`${rating} stars for ${label}`} aria-pressed={ratings[key] === rating} onClick={() => setRatings((current) => ({ ...current, [key]: rating }))} className={`px-1 text-sm ${ratings[key] >= rating ? 'text-[#D4AF37]' : 'text-zinc-600'}`}>★</button>
                  ))}
                </div>
              </div>
            ))}
            <button type="button" disabled={!allRated} onClick={() => onComplete(ratings)} className="w-full rounded-xl bg-white py-3 text-xs font-extrabold text-black disabled:cursor-not-allowed disabled:opacity-40">Complete journey · +250 XP</button>
            {!allRated && <p className="text-center text-[10px] text-zinc-500">Rate each item to complete this trip.</p>}
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
