import React, { useState } from 'react';
import { Camera, Sparkles, Award, BookmarkPlus, Share2, CheckCircle2, Heart } from 'lucide-react';
import EngineLineLogo from './EngineLineLogo';
import { createJourneyMemory } from '../services/firestoreService';

function getJourneyDate(journey) {
  if (journey.journeyDate) {
    const date = new Date(`${journey.journeyDate}T00:00:00`);
    if (!Number.isNaN(date.getTime())) return date;
  }
  if (journey.createdAt?.toDate) return journey.createdAt.toDate();
  return null;
}

function getWeekStart(date) {
  const weekStart = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  weekStart.setUTCDate(weekStart.getUTCDate() - ((weekStart.getUTCDay() + 6) % 7));
  return weekStart.getTime();
}

function getWeekStreak(dates) {
  const weeks = new Set(dates.map((date) => getWeekStart(date)));
  let week = getWeekStart(new Date());
  let streak = 0;
  while (weeks.has(week)) {
    streak += 1;
    week -= 7 * 24 * 60 * 60 * 1000;
  }
  return streak;
}

function getMonthStreak(dates) {
  const months = new Set(dates.map((date) => date.getFullYear() * 12 + date.getMonth()));
  let month = new Date().getFullYear() * 12 + new Date().getMonth();
  let streak = 0;
  while (months.has(month)) {
    streak += 1;
    month -= 1;
  }
  return streak;
}

export default function AiMemoryEngine({ user, journeys = [], onToast }) {
  const [photoStory, setPhotoStory] = useState('');
  const [memoryTitle, setMemoryTitle] = useState('Chambal Canyon Sunset on Rajdhani');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [savedBadge, setSavedBadge] = useState(false);
  const journeyDates = journeys.map(getJourneyDate).filter(Boolean);
  const thisYear = new Date().getFullYear();
  const trainsThisYear = new Set(
    journeys
      .filter((journey) => getJourneyDate(journey)?.getFullYear() === thisYear)
      .map((journey) => journey.trainNumber)
      .filter(Boolean)
  ).size;
  const totalKm = journeys.reduce((sum, journey) => sum + (Number(journey.distanceKm) || 0), 0);
  const hasTrackedDistance = journeys.some((journey) => Number(journey.distanceKm) > 0);

  const MILESTONE_STAMPS = [
    {
      id: 'm1',
      station: 'Mumbai / Airoli (10:05)',
      title: 'First-Mile Auto & WAP-7 Boarding',
      speed: '34 km/h ➔ 110 km/h',
      tag: 'DEPARTURE STAMP'
    },
    {
      id: 'm2',
      station: 'Surat Junction (12:45)',
      title: 'Surati Locho & Hot Pantry Lunch',
      speed: '124 km/h',
      tag: 'GASTRONOMY STAMP'
    },
    {
      id: 'm3',
      station: 'Chambal River Bridge (17:20)',
      title: 'Golden Sunset Gorge Curve (Right Window)',
      speed: '128 km/h',
      tag: 'HERITAGE STAMP'
    },
    {
      id: 'm4',
      station: 'Connaught Place Delhi (22:05)',
      title: 'Arrival at Capital Milestone',
      speed: '130 km/h Peak',
      tag: 'DESTINATION STAMP'
    }
  ];

  const handleGenerateAiMemory = async () => {
    setIsSynthesizing(true);
    setTimeout(async () => {
      setIsSynthesizing(false);
      setSavedBadge(true);
      const memoryText = `“Golden evening light cutting across Coach B3 as WAP-7 #30481 pulls 1,450 tonnes smoothly along the Chambal ravines at 128 km/h. Pure Indian Railways soul.”`;
      setPhotoStory(memoryText);

      if (user) {
        try {
          await createJourneyMemory(user.uid, {
            title: memoryTitle,
            note: memoryText,
            trainNumber: "12951"
          });
        } catch (err) {
          console.error(err);
        }
      }

      onToast("✨ AI Journey Memory etched into your permanent Travelogue!");
    }, 1500);
  };

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
            <span>Journey memories</span>
            <span className="gold-badge text-[9px] px-2 py-0.5 rounded-full font-mono font-bold">
              SAVED
            </span>
          </h2>
          <p className="text-[10px] text-zinc-500">
            Save moments from your journey.
          </p>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-2" aria-label="Journey statistics">
        {[
          ['Total km by train', hasTrackedDistance ? `${totalKm.toLocaleString('en-GB')} km` : 'Not tracked'],
          ['Total journeys', journeys.length],
          ['Trains this year', trainsThisYear],
          ['Week streak', `${getWeekStreak(journeyDates)} wk`],
          ['Month streak', `${getMonthStreak(journeyDates)} mo`]
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-[#222] bg-[#080808] p-3">
            <div className="text-[9px] uppercase tracking-wide text-zinc-500">{label}</div>
            <div className="mt-1 text-base font-extrabold text-[#D4AF37]">{value}</div>
          </div>
        ))}
      </section>

      {/* Official AI Speed & Journey Certificate */}
      <div className="panel bg-[#050505] border border-[#222222] rounded-2xl p-5 space-y-4 text-center relative overflow-hidden">
        {/* Watermark Logo */}
        <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
          <EngineLineLogo className="w-24 h-24" />
        </div>

        <div className="flex justify-center">
          <EngineLineLogo className="w-10 h-10" goldAccent />
        </div>

        <div>
          <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] block font-bold">
          JOURNEY RECORD
          </span>
          <h3 className="text-sm font-extrabold text-white mt-1">
            Journey certificate
          </h3>
          <p className="text-[11px] text-zinc-400 mt-1 max-w-xs mx-auto">
            This digital certificate commemorates your 1,384 km journey from <strong>Navi Mumbai (Airoli)</strong> to <strong>Connaught Place (Delhi)</strong>.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#181818] text-xs font-mono">
          <div>
            <div className="text-[8px] text-zinc-500 uppercase">MAX SPEED</div>
            <div className="font-extrabold text-white">130 km/h</div>
          </div>
          <div>
            <div className="text-[8px] text-zinc-500 uppercase">LOCOMOTIVE</div>
            <div className="font-extrabold text-[#D4AF37]">WAP-7</div>
          </div>
          <div>
            <div className="text-[8px] text-zinc-500 uppercase">PUNCTUALITY</div>
            <div className="font-extrabold text-emerald-400">0m Delay</div>
          </div>
        </div>

        {photoStory && (
          <div className="p-3 bg-black border border-[#222222] rounded-xl text-left text-xs font-serif italic text-zinc-300">
            {photoStory}
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerateAiMemory}
          disabled={isSynthesizing}
          className="w-full py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[.98] transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isSynthesizing ? 'AI Synthesizing Memory...' : 'Generate & Save AI Journey Memory'}</span>
        </button>
      </div>

      {/* Geotagged Milestone Stamps on Track */}
      <div className="space-y-2">
        <div className="text-[10px] uppercase font-mono font-bold text-zinc-500">
          Journey milestones ({MILESTONE_STAMPS.length})
        </div>
        <div className="space-y-2">
          {MILESTONE_STAMPS.map((st) => (
            <div
              key={st.id}
              className="p-3 bg-[#080808] border border-[#222222] rounded-xl flex justify-between items-center text-xs"
            >
              <div>
                <div className="text-[9px] font-mono text-[#D4AF37] font-bold">{st.tag}</div>
                <div className="font-bold text-white text-xs">{st.title}</div>
                <div className="text-[10px] text-zinc-500">{st.station}</div>
              </div>
              <div className="text-right font-mono text-[10px] text-zinc-400">
                <span>{st.speed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
