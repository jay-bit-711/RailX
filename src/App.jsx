import React, { useState, useEffect } from 'react';
import {
  Mic,
  Camera,
  MapPin,
  Share2,
  ShieldAlert,
  Flame,
  Award,
  Bell,
  Search,
  Sparkles,
  Zap,
  Coffee,
  CheckCircle2,
  Compass,
  Radio
} from 'lucide-react';
import { CORRIDOR_TRAINS, INITIAL_PASSENGERS, INITIAL_FEEDS } from './data/mockData';
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
import { subscribeToAuth, getUserProfile, signOutUser, demoPassengerSignIn } from './services/authService';

export default function App() {
  // Navigation: 'radar' | 'mission' | 'memory' | 'engine' | 'feed' | 'me'
  const [activeTab, setActiveTab] = useState('radar');
  const [timeStr, setTimeStr] = useState('09:45');
  const [userXp, setUserXp] = useState(580); // Level 11
  const [streakDays, setStreakDays] = useState(7);

  // Authentication & Profile State
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  // Route State
  const [origin, setOrigin] = useState('Navi Mumbai (Airoli)');
  const [destination, setDestination] = useState('Connaught Place (Delhi)');
  const [journeyDate, setJourneyDate] = useState('2026-10-14');
  const [passengers, setPassengers] = useState(INITIAL_PASSENGERS);
  const [ridePref, setRidePref] = useState('Auto');
  const [selectedCls, setSelectedCls] = useState('3A');
  const [activeAddons, setActiveAddons] = useState(['First mile', 'Food']);
  const [bookingMode, setBookingMode] = useState('plan');
  const [selectedTrain, setSelectedTrain] = useState(CORRIDOR_TRAINS[0]);

  // Modals & Bottom Sheets
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isPaySheetOpen, setIsPaySheetOpen] = useState(false);
  const [isFoodSheetOpen, setIsFoodSheetOpen] = useState(false);
  const [isDataSheetOpen, setIsDataSheetOpen] = useState(false);
  const [isAssistanceOpen, setIsAssistanceOpen] = useState(false);
  const [isFamilyShareOpen, setIsFamilyShareOpen] = useState(false);
  const [assistanceSection, setAssistanceSection] = useState('sos');

  // Feed State
  const [feedItems, setFeedItems] = useState(INITIAL_FEEDS);
  const [newPostText, setNewPostText] = useState('');

  // Toast Notification
  const [toastText, setToastText] = useState(null);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Firebase Auth sync
  useEffect(() => {
    const unsub = subscribeToAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const prof = await getUserProfile(currentUser.uid);
        setUserProfile(prof);
      } else {
        setUserProfile(null);
      }
    });
    return () => unsub();
  }, []);

  const showToast = (msg) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 2500);
  };

  const openAssistance = (section = 'sos') => {
    setAssistanceSection(section);
    setIsAssistanceOpen(true);
  };

  const handleGpsDetect = () => {
    showToast("📍 Accessing browser GPS location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setOrigin(`Navi Mumbai (Airoli) [${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}]`);
          showToast("📍 GPS Locked: Navi Mumbai (Airoli) Sector 8");
        },
        () => {
          setOrigin("Navi Mumbai (Airoli)");
          showToast("📍 GPS Default: Navi Mumbai (Airoli) Sector 8");
        }
      );
    } else {
      setOrigin("Navi Mumbai (Airoli)");
      showToast("📍 GPS Default: Navi Mumbai (Airoli)");
    }
  };

  const userLevel = Math.floor(userXp / 50);

  return (
    <div className="bg-black flex justify-center min-h-screen text-white select-none selection:bg-white selection:text-black font-sans">
      {/* Mobile Shell Frame */}
      <div
        id="app"
        className="w-full max-w-md h-[100vh] sm:h-[960px] sm:my-auto sm:rounded-[1.75rem] bg-black sm:border sm:border-[#222222] shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden relative flex flex-col text-white"
      >
        {/* ==================== TOP STATUS BAR ==================== */}
        <div className="status-bar px-4 py-2.5 flex justify-between items-center text-[11px] text-zinc-400 bg-black/95 z-30 shrink-0 border-b border-[#181818]">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('radar')}>
            <EngineLineLogo className="w-6 h-6" />
            <div className="leading-tight">
              <span className="font-extrabold font-mono tracking-wider text-white text-xs block">
                Rail<span className="text-[#D4AF37]">X</span>
              </span>
              <span className="text-[8px] text-zinc-500 font-mono">RADAR 24</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#D4AF37] font-semibold text-[10px] font-mono">
              Lvl {userLevel} · 🔥{streakDays}
            </span>
            <button
              type="button"
              onClick={() => showToast('🔔 Alerts: 09:45 Auto departure window open, PF 4 confirmed, Surat meal prepped')}
              className="relative p-0.5 text-white"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white text-black text-[7px] font-black rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsFamilyShareOpen(true)}
              className="p-1 text-zinc-400 hover:text-white"
              title="Share live tracker with family (Rapido style)"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ==================== MAIN VIEW PORT ==================== */}
        <div id="main" className="flex-1 overflow-y-auto ns p-4 pb-[68px] space-y-4">
          {/* TAB 1: FLIGHTRADAR24 / GOOGLE MAPS TRAIN RADAR */}
          {activeTab === 'radar' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-base font-extrabold text-white flex items-center space-x-2">
                    <span>Train Radar 24</span>
                    <span className="gold-badge text-[8px] px-2 py-0.5 rounded-full font-mono font-bold">
                      LIVE FLEET
                    </span>
                  </h1>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    Live trains · simple booking
                  </p>
                </div>

                <div className="flex space-x-1">
                  <button
                    type="button"
                    onClick={() => setIsAudioModalOpen(true)}
                    className="p-2 bg-[#0c0c0c] border border-[#222] hover:border-white rounded-xl text-white"
                    title="Audio input"
                  >
                    <Mic className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsScanModalOpen(true)}
                    className="p-2 bg-[#0c0c0c] border border-[#222] hover:border-white rounded-xl text-white"
                    title="Scan ticket"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                </div>
              </div>

              {/* The Interactive Radar Map Component */}
              <TrainRadarMap
                onSelectTrain={(tr) => setSelectedTrain(tr)}
                onOpenPayment={(tr) => {
                  setSelectedTrain(tr);
                  setActiveTab('go');
                }}
                onOpenFood={() => setIsFoodSheetOpen(true)}
                onOpenData={() => setIsDataSheetOpen(true)}
                onToast={showToast}
              />
            </div>
          )}

          {activeTab === 'go' && (
            <div className="space-y-4 animate-in fade-in">
              <header>
                <h1 className="text-lg font-extrabold">Go somewhere</h1>
                <p className="text-xs text-zinc-400">Choose how you travel.</p>
              </header>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'daily', label: 'Daily', detail: 'Local · Metro' },
                  { id: 'quick', label: 'Quick', detail: 'Unreserved' },
                  { id: 'plan', label: 'Plan', detail: 'Reserved' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    aria-pressed={bookingMode === mode.id}
                    onClick={() => {
                      setBookingMode(mode.id);
                      setSelectedCls(mode.id === 'quick' ? 'GN' : mode.id === 'daily' ? 'Local' : '3A');
                    }}
                    className={`min-h-[76px] rounded-xl border p-2 text-left transition ${
                      bookingMode === mode.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#252525] bg-[#080808]'
                    }`}
                  >
                    <span className="block text-sm font-bold">{mode.label}</span>
                    <span className="mt-1 block text-[10px] text-zinc-400">{mode.detail}</span>
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-3 py-2.5 text-[11px] text-zinc-300">
                {bookingMode === 'daily' && 'Local / metro pass · flexible daily travel, no reserved seat.'}
                {bookingMode === 'quick' && 'Unreserved ticket · general coach, no seat selection.'}
                {bookingMode === 'plan' && `${selectedTrain.name} · reserved seat · ₹${selectedTrain.price}`}
              </div>

              <div className="rounded-2xl border border-[#222] bg-[#080808] p-4 space-y-3">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <label className="min-w-0">
                    <span className="mb-1 block text-[9px] uppercase tracking-wide text-zinc-500">From</span>
                    <input value={origin} onChange={(event) => setOrigin(event.target.value)} className="w-full min-w-0 rounded-lg border border-[#222] bg-black px-2 py-2 text-xs text-white outline-none focus:border-[#D4AF37]" />
                  </label>
                  <span className="pt-4 text-[#D4AF37]" aria-hidden="true">→</span>
                  <label className="min-w-0">
                    <span className="mb-1 block text-[9px] uppercase tracking-wide text-zinc-500">To</span>
                    <input value={destination} onChange={(event) => setDestination(event.target.value)} className="w-full min-w-0 rounded-lg border border-[#222] bg-black px-2 py-2 text-xs text-white outline-none focus:border-[#D4AF37]" />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1 block text-[9px] uppercase tracking-wide text-zinc-500">Travel date</span>
                  <input type="date" value={journeyDate} onChange={(event) => setJourneyDate(event.target.value)} className="w-full rounded-lg border border-[#222] bg-black px-3 py-2 text-xs text-white outline-none focus:border-[#D4AF37]" />
                </label>
                {bookingMode === 'plan' && (
                  <>
                    <div>
                      <span className="mb-1.5 block text-[9px] uppercase tracking-wide text-zinc-500">Class</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['1A', '2A', '3A', 'SL', 'CC'].map((travelClass) => (
                          <button key={travelClass} type="button" aria-pressed={selectedCls === travelClass} onClick={() => setSelectedCls(travelClass)} className={`rounded-lg border px-3 py-1.5 text-[10px] font-bold ${selectedCls === travelClass ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#252525] text-zinc-400'}`}>
                            {travelClass}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="mb-1.5 block text-[9px] uppercase tracking-wide text-zinc-500">Passengers</span>
                      <div className="flex flex-wrap gap-1.5">
                        {passengers.map((passenger) => (
                          <button key={passenger.id} type="button" aria-pressed={passenger.selected} onClick={() => setPassengers((current) => current.map((item) => item.id === passenger.id ? { ...item, selected: !item.selected } : item))} className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-semibold ${passenger.selected ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#252525] text-zinc-400'}`}>
                            {passenger.selected ? '✓ ' : '+ '}{passenger.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="rounded-2xl border border-[#222] bg-[#080808] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold">Trip add-ons</h2>
                    <p className="text-[10px] text-zinc-500">Optional. Book even if you skip these.</p>
                  </div>
                  <button type="button" onClick={() => setActiveAddons(['First mile', 'Station help', 'Food', 'Data', 'Last mile'])} className="text-[10px] font-bold text-[#D4AF37] underline underline-offset-2">
                    Add all door-to-door
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['First mile', 'Station help', 'Food', 'Data', 'Last mile'].map((addon) => {
                    const selected = activeAddons.includes(addon);
                    return (
                      <button
                        key={addon}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setActiveAddons(selected ? activeAddons.filter((item) => item !== addon) : [...activeAddons, addon])}
                        className={`min-h-10 rounded-xl border px-3 py-2 text-left text-[11px] font-semibold ${
                          selected ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#252525] text-zinc-400'
                        }`}
                      >
                        <span aria-hidden="true">{selected ? '✓ ' : '+ '}</span>{addon}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPaySheetOpen(true)}
                className="w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-black active:scale-[.98]"
              >
                {bookingMode === 'daily' ? 'Get local / metro pass' : bookingMode === 'quick' ? 'Book unreserved' : `Plan reserved · ₹${selectedTrain.price}`}
              </button>
              <p className="text-center text-[10px] text-zinc-500">Review details in the next step. No add-on is required.</p>
            </div>
          )}

          {/* TAB 2: GAMIFIED MISSION HUB (AIROLI ➔ CONNAUGHT PLACE) */}
          {activeTab === 'mission' && (
            <GamifiedMissionHub
              onOpenEngineDeck={() => setActiveTab('engine')}
              onOpenRapidAssistance={openAssistance}
              onOpenFamilyShare={() => setIsFamilyShareOpen(true)}
              onOpenFoodSheet={() => setIsFoodSheetOpen(true)}
              onOpenDataSheet={() => setIsDataSheetOpen(true)}
              onToast={showToast}
            />
          )}

          {/* TAB 3: AI MEMORY ENGINE ("CRAFTING MEMORIES ON EVERY TRACK") */}
          {activeTab === 'memory' && (
            <AiMemoryEngine
              user={user}
              onToast={showToast}
            />
          )}

          {/* TAB 4: AUTOMOTIVE LOCOMOTIVE ENGINEERING DECK */}
          {activeTab === 'engine' && (
            <LocomotiveEngineDeck onToast={showToast} />
          )}

          {/* TAB 5: COMMUTER CHAT & FEED */}
          {activeTab === 'feed' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-base font-extrabold text-white">Commuter Radar Feed</h1>
                  <p className="text-[10px] text-zinc-500 font-mono">Live station tips & chai conversations</p>
                </div>
                <span className="gold-badge text-[9px] px-2 py-0.5 rounded-full font-mono font-bold">12951 Active</span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newPostText.trim()) return;
                  setFeedItems([
                    {
                      id: Date.now().toString(),
                      author: 'Jayanth (Coach B3)',
                      avatar: 'JK',
                      time: 'Just now',
                      train: '12951',
                      tag: 'PF tips',
                      content: newPostText.trim(),
                      reactions: { smile: 1, laugh: 0, comments: 0 }
                    },
                    ...feedItems
                  ]);
                  setNewPostText('');
                  showToast('Posted to live commuter channel');
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Share a tip or chai spot review..."
                  className="flex-1 bg-black border border-[#222] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-white text-black font-extrabold rounded-xl text-xs active:scale-95 transition"
                >
                  Post
                </button>
              </form>

              <div className="space-y-2.5">
                {feedItems.map((item) => (
                  <div key={item.id} className="p-3 bg-[#080808] border border-[#222222] rounded-xl space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white text-black font-black text-[10px] flex items-center justify-center">
                        {item.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">{item.author}</div>
                        <div className="text-[9px] text-zinc-500 font-mono">{item.time}</div>
                      </div>
                    </div>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">{item.content}</p>
                    <div className="flex gap-4 text-[10px] text-zinc-500 pt-1 border-t border-[#181818]">
                      <button
                        type="button"
                        onClick={() => {
                          setFeedItems(feedItems.map(f => f.id === item.id ? { ...f, reactions: { ...f.reactions, smile: f.reactions.smile + 1 } } : f));
                        }}
                      >
                        😄 {item.reactions.smile}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFeedItems(feedItems.map(f => f.id === item.id ? { ...f, reactions: { ...f.reactions, laugh: f.reactions.laugh + 1 } } : f));
                        }}
                      >
                        😂 {item.reactions.laugh}
                      </button>
                      <button type="button" onClick={() => showToast('Opening discussion')}>
                        💬 {item.reactions.comments}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ME / PASSENGER PROFILE */}
          {activeTab === 'me' && (
            <div className="space-y-3">
              <div className="text-center pt-2">
                <div className="w-14 h-14 mx-auto rounded-full bg-white text-black font-extrabold text-xl flex items-center justify-center mb-1">
                  J
                </div>
                <div className="font-bold text-white text-sm">Jayanth Kumar</div>
                <div className="text-[10px] text-zinc-500 font-mono">
                  {user?.phoneNumber || '+91 98765 43210'} · Level {userLevel} Commuter
                </div>
              </div>

              <div className="p-3 bg-[#080808] border border-[#222222] rounded-xl space-y-2 text-xs">
                <div className="text-[10px] uppercase font-mono text-zinc-500 font-bold flex justify-between">
                  <span>Home Address</span>
                  <span className="text-[#D4AF37]">Airoli Sector 8</span>
                </div>
                <input
                  defaultValue="Sector 8, Airoli, Navi Mumbai 400708"
                  className="w-full bg-black border border-[#222] rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="p-3 bg-[#080808] border border-[#222222] rounded-xl space-y-1.5 text-xs">
                <div className="text-[10px] uppercase font-mono text-zinc-500 font-bold">Saved Passengers</div>
                <div className="text-white">Jayanth · Self (Primary)</div>
                <div className="text-zinc-400">Priya · Wife</div>
                <div className="text-zinc-400">Arjun · Son (Age 5)</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsFamilyShareOpen(true)}
                  className="p-3 bg-[#0a0a0a] border border-[#222] hover:border-white rounded-xl text-left"
                >
                  <div className="font-bold text-white">Family Link</div>
                  <div className="text-[9px] text-zinc-500">Rapido-style GPS</div>
                </button>
                <button
                  type="button"
                  onClick={() => openAssistance('sos')}
                  className="p-3 bg-[#0a0a0a] border border-[#222] hover:border-[#D4AF37] rounded-xl text-left"
                >
                  <div className="font-bold text-white">SOS</div>
                  <div className="text-[9px] text-zinc-500">Emergency help</div>
                </button>
                <button
                  type="button"
                  onClick={() => openAssistance('support')}
                  className="p-3 bg-[#0a0a0a] border border-[#222] hover:border-white rounded-xl text-left"
                >
                  <div className="font-bold text-white">Support</div>
                  <div className="text-[9px] text-zinc-500">Rail help & contacts</div>
                </button>
                <button type="button" onClick={() => setIsPhoneModalOpen(true)} className="p-3 bg-[#0a0a0a] border border-[#222] hover:border-white rounded-xl text-left">
                  <div className="font-bold text-white">Phone Auth</div>
                  <div className="text-[9px] text-zinc-400">{user ? 'Verified ✓' : 'Sign in'}</div>
                </button>
              </div>

              <button
                type="button"
                onClick={async () => {
                  await signOutUser();
                  setUser(null);
                  showToast('Signed out of Firebase');
                }}
                className="w-full py-2.5 text-red-500 text-xs font-bold hover:underline"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* ==================== BOTTOM NAVIGATION BAR ==================== */}
        <div
          id="nav"
          className="absolute bottom-0 inset-x-0 h-[60px] bg-black/95 backdrop-blur border-t border-[#1a1a1a] flex justify-around items-center z-40"
        >
          {[
            { id: 'radar', label: 'Radar 24', icon: <Radio className="w-4 h-4" /> },
            { id: 'go', label: 'Go', icon: <MapPin className="w-4 h-4" /> },
            { id: 'mission', label: 'Ride', icon: <Zap className="w-4 h-4" /> },
            { id: 'memory', label: 'Memories', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'engine', label: 'Engine', icon: <EngineLineLogo className="w-4 h-4" /> },
            { id: 'feed', label: 'Feed', icon: <Coffee className="w-4 h-4" /> },
            { id: 'me', label: 'Me', icon: <Award className="w-4 h-4" /> }
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center flex-1 min-w-0 transition ${
                  isActive ? 'text-white' : 'text-zinc-600'
                }`}
              >
                <span className={`transition ${isActive ? 'scale-110 text-white' : 'text-zinc-600'}`}>
                  {item.icon}
                </span>
                <span className={`text-[8px] mt-0.5 font-mono font-bold ${isActive ? 'text-white' : 'text-zinc-600'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ==================== MODALS & BOTTOM SHEETS ==================== */}
        {/* Audio Speech Recognition Modal */}
        <AudioInputModal
          isOpen={isAudioModalOpen}
          onClose={() => setIsAudioModalOpen(false)}
          onResult={(val) => {
            setOrigin("Navi Mumbai (Airoli)");
            setDestination("Connaught Place (Delhi)");
            setActiveTab('mission');
          }}
          onToast={showToast}
        />

        {/* Ticket Scanner Viewfinder Modal */}
        <TicketScanModal
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
          onScanSuccess={(data) => {
            setOrigin(data.from);
            setDestination(data.to);
            setActiveTab('mission');
          }}
          onToast={showToast}
        />

        {/* Rapid Assistance (RPF SOS, Repairs, Halt Timer, Scenic Radar) */}
        <RapidAssistanceModal
          isOpen={isAssistanceOpen}
          onClose={() => setIsAssistanceOpen(false)}
          initialTab={assistanceSection}
          onToast={showToast}
        />

        {/* Family Live Route Tracker (Rapido Style) */}
        <FamilyShareModal
          isOpen={isFamilyShareOpen}
          onClose={() => setIsFamilyShareOpen(false)}
          user={user}
          onToast={showToast}
        />

        {/* In-Seat Food Order Sheet */}
        <FoodOrderSheet
          isOpen={isFoodSheetOpen}
          onClose={() => setIsFoodSheetOpen(false)}
          user={user}
          onToast={showToast}
        />

        {/* Data Booster Sheet */}
        <DataBoosterSheet
          isOpen={isDataSheetOpen}
          onClose={() => setIsDataSheetOpen(false)}
          user={user}
          onToast={showToast}
        />

        {/* Payment Sheet */}
        <PaymentSheet
          isOpen={isPaySheetOpen}
          onClose={() => setIsPaySheetOpen(false)}
          user={user}
          train={selectedTrain}
          origin={origin}
          destination={destination}
          journeyDate={journeyDate}
          selectedClass={selectedCls}
          passengers={passengers}
          ridePref={ridePref}
          addons={activeAddons}
          bookingMode={bookingMode}
          onToggleAddon={(addon) => setActiveAddons((current) => current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon])}
          onAddAllDoorToDoor={() => setActiveAddons(['First mile', 'Station help', 'Food', 'Data', 'Last mile'])}
          onPaymentSuccess={() => {
            setActiveTab('mission');
          }}
          onToast={showToast}
        />

        {/* Firebase Phone Auth Modal */}
        <PhoneAuthModal
          isOpen={isPhoneModalOpen}
          onClose={() => setIsPhoneModalOpen(false)}
          onAuthSuccess={(authUser) => {
            setUser(authUser);
            showToast('Firebase Phone Verified');
          }}
        />

        {/* Toast Alert */}
        <div
          id="toast"
          className={`absolute top-12 left-3 right-3 bg-white text-black p-3 rounded-2xl text-[11px] font-bold flex items-center gap-2 shadow-2xl z-[60] transition-all duration-300 ${
            toastText ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
          }`}
        >
          <span>✓</span>
          <span>{toastText || 'Done'}</span>
        </div>
      </div>
    </div>
  );
}
