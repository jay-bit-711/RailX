import React, { useState, useEffect } from 'react';
import { CORRIDOR_TRAINS, INITIAL_PASSENGERS, INITIAL_FEEDS } from './data/mockData';
import { CORRIDOR_STATIONS, LOCALITIES, RIDE_RULES, getStationByCode } from './data/corridor';
import { nearbyPlaces } from './services/placesService';
import EngineLineLogo from './components/EngineLineLogo';
import TrainRadarMap from './components/TrainRadarMap';
import GamifiedMissionHub from './components/GamifiedMissionHub';
import AiMemoryEngine from './components/AiMemoryEngine';
import LocomotiveEngineDeck from './components/LocomotiveEngineDeck';
import RapidAssistanceModal from './components/RapidAssistanceModal';
import FamilyShareModal from './components/FamilyShareModal';
import AudioInputModal from './components/AudioInputModal';
import TicketScanModal from './components/TicketScanModal';
import FoodOrderSheet from './components/FoodOrderSheet';
import DataBoosterSheet from './components/DataBoosterSheet';
import PaymentSheet from './components/PaymentSheet';
import PhoneAuthModal from './components/PhoneAuthModal';
import { subscribeToAuth, getUserProfile, signOutUser } from './services/authService';

/**
 * NOTE: This is a recovery build focusing on corridor chips + defaults.
 * Door chips now try Places Nearby around the selected station, fall back to LOCALITIES.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('go');
  const [origin, setOrigin] = useState('LPI · Lingampalli');
  const [destination, setDestination] = useState('BZA · Vijayawada Jn');
  const [journeyDate, setJourneyDate] = useState('2026-10-14');
  const [bookingMode, setBookingMode] = useState('plan');
  const [activeAddons, setActiveAddons] = useState(['First mile', 'Food']);
  const [assistanceOpen, setAssistanceOpen] = useState(false);
  const [assistanceTab, setAssistanceTab] = useState('categories');
  const [toast, setToast] = useState(null);
  const [nearbyDoors, setNearbyDoors] = useState([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const openHelp = (tab = 'categories') => {
    setAssistanceTab(tab);
    setAssistanceOpen(true);
  };

  // Dynamic nearby places around destination station (last mile)
  useEffect(() => {
    const code = (destination.split('·')[0] || '').trim();
    const station = getStationByCode(code);
    if (!station?.lat) {
      setNearbyDoors(LOCALITIES.slice(0, 8).map(l => ({ id: l.id, name: l.name })));
      return;
    }

    let cancelled = false;
    setNearbyLoading(true);
    nearbyPlaces(station.lat, station.lng).then((res) => {
      if (cancelled) return;
      if (res.places?.length) {
        setNearbyDoors(res.places);
      } else {
        // Fallback to manual localities near this station
        const fallback = LOCALITIES.filter(l => l.nearStations?.includes(code)).slice(0, 8)
          .map(l => ({ id: l.id, name: l.name }));
        setNearbyDoors(fallback.length ? fallback : LOCALITIES.slice(0, 8).map(l => ({ id: l.id, name: l.name })));
        if (res.error) showToast('Places fallback: ' + res.error.slice(0, 40));
      }
      setNearbyLoading(false);
    });
    return () => { cancelled = true; };
  }, [destination]);

  return (
    <div className="bg-black min-h-screen text-white flex justify-center font-sans">
      <div className="w-full max-w-md min-h-screen bg-black border-x border-[#222] relative flex flex-col">
        <header className="px-4 py-3 flex items-center justify-between border-b border-[#181818]">
          <button type="button" className="flex items-center gap-2" onClick={() => setActiveTab('go')}>
            <EngineLineLogo className="w-6 h-6" />
            <span className="font-extrabold text-sm">Rail<span className="text-[#D4AF37]">X</span></span>
          </button>
          <button type="button" onClick={() => openHelp('categories')} className="text-xs font-bold text-[#D4AF37]">🆘 Help</button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
          {activeTab === 'go' && (
            <div className="space-y-4">
              <h1 className="text-lg font-extrabold">Go</h1>
              <p className="text-xs text-zinc-400">LPI · SC · BMT → BZA · GNT · TNL</p>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'daily', label: 'Daily' },
                  { id: 'quick', label: 'Quick' },
                  { id: 'plan', label: 'Plan' }
                ].map((m) => (
                  <button key={m.id} type="button" onClick={() => setBookingMode(m.id)}
                    className={`rounded-xl border p-3 text-sm font-bold ${bookingMode===m.id?'border-[#D4AF37] text-[#D4AF37]':'border-[#252525] text-zinc-400'}`}>
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="rounded-2xl border border-[#222] bg-[#080808] p-4 space-y-3">
                <div className="text-[9px] uppercase text-zinc-500">From station</div>
                <div className="flex flex-wrap gap-1.5">
                  {CORRIDOR_STATIONS.sources.map((s) => (
                    <button key={s.code} type="button" onClick={() => setOrigin(`${s.code} · ${s.name}`)}
                      className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-bold ${origin.includes(s.code)?'border-[#D4AF37] text-[#D4AF37]':'border-[#252525] text-zinc-400'}`}>
                      {s.code}
                    </button>
                  ))}
                </div>
                <input value={origin} onChange={(e)=>setOrigin(e.target.value)} className="w-full rounded-lg border border-[#222] bg-black px-3 py-2 text-xs" />

                <div className="text-[9px] uppercase text-zinc-500">To station</div>
                <div className="flex flex-wrap gap-1.5">
                  {CORRIDOR_STATIONS.destinations.map((s) => (
                    <button key={s.code} type="button" onClick={() => setDestination(`${s.code} · ${s.name}`)}
                      className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-bold ${destination.includes(s.code)?'border-[#D4AF37] text-[#D4AF37]':'border-[#252525] text-zinc-400'}`}>
                      {s.code}
                    </button>
                  ))}
                </div>
                <input value={destination} onChange={(e)=>setDestination(e.target.value)} className="w-full rounded-lg border border-[#222] bg-black px-3 py-2 text-xs" />

                <div className="text-[9px] uppercase text-zinc-500">Door / last mile {nearbyLoading && '· loading'}</div>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                  {nearbyDoors.map((l) => (
                    <button key={l.id} type="button" onClick={() => {
                      const code = (destination.split('·')[0] || 'BZA').trim();
                      setDestination(`${code} · ${l.name}`);
                    }}
                      className="rounded-lg border border-[#252525] px-2 py-1 text-[10px] text-zinc-400">
                      {l.name}
                    </button>
                  ))}
                </div>

                <label className="block text-[9px] uppercase text-zinc-500">Date
                  <input type="date" value={journeyDate} onChange={(e)=>setJourneyDate(e.target.value)} className="mt-1 w-full rounded-lg border border-[#222] bg-black px-3 py-2 text-xs" />
                </label>
              </div>

              <button type="button" onClick={() => { showToast('Mock book · deep-link IRCTC (Path A)'); setActiveTab('mission'); }}
                className="w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-black">
                Continue · {origin.split('·')[0]} → {destination.split('·')[0]}
              </button>
              <p className="text-center text-[10px] text-zinc-500">IRCTC Path A · ticket via official app when ready</p>
            </div>
          )}

          {activeTab === 'mission' && (
            <div className="space-y-3">
              <h1 className="text-lg font-extrabold">Ride</h1>
              <p className="text-xs text-zinc-400">{origin} → {destination}</p>
              <button type="button" onClick={() => openHelp('categories')} className="w-full rounded-xl border border-[#D4AF37] py-3 font-bold text-[#D4AF37]">🆘 Help · RPF Fix Food Cab</button>
              <GamifiedMissionHub onOpenRapidAssistance={() => openHelp('categories')} onToast={showToast} />
            </div>
          )}

          {activeTab === 'radar' && <TrainRadarMap onToast={showToast} />}
          {activeTab === 'memory' && <AiMemoryEngine onToast={showToast} />}
          {activeTab === 'engine' && <LocomotiveEngineDeck onToast={showToast} />}
          {activeTab === 'me' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => openHelp('categories')} className="min-h-24 rounded-2xl border border-[#D4AF37] text-[#D4AF37] font-bold">🆘 Help</button>
                <button type="button" onClick={() => openHelp('support')} className="min-h-24 rounded-2xl border border-white font-bold">📞 139</button>
              </div>
              <p className="text-xs text-zinc-500">Home · Patancheru / LPI corridor</p>
            </div>
          )}
        </main>

        <nav className="absolute bottom-0 inset-x-0 h-14 border-t border-[#1a1a1a] bg-black flex justify-around items-center text-[10px]">
          {[
            { id: 'go', label: 'Go' },
            { id: 'mission', label: 'Ride' },
            { id: 'radar', label: 'Radar' },
            { id: 'memory', label: 'Mem' },
            { id: 'me', label: 'Me' }
          ].map((item) => (
            <button key={item.id} type="button" onClick={() => setActiveTab(item.id)} className={activeTab===item.id?'text-white font-bold':'text-zinc-600'}>
              {item.label}
            </button>
          ))}
        </nav>

        <RapidAssistanceModal
          isOpen={assistanceOpen}
          onClose={() => setAssistanceOpen(false)}
          initialTab={assistanceTab}
          onToast={showToast}
        />

        {toast && (
          <div className="absolute top-16 left-4 right-4 rounded-xl bg-white text-black text-xs font-bold px-3 py-2 text-center z-50">{toast}</div>
        )}

        <AudioInputModal isOpen={false} onClose={()=>{}} />
        <TicketScanModal isOpen={false} onClose={()=>{}} />
        <FoodOrderSheet isOpen={false} onClose={()=>{}} />
        <DataBoosterSheet isOpen={false} onClose={()=>{}} />
        <PaymentSheet isOpen={false} onClose={()=>{}} />
        <PhoneAuthModal isOpen={false} onClose={()=>{}} />
        <FamilyShareModal isOpen={false} onClose={()=>{}} />
      </div>
    </div>
  );
}
