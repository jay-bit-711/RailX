import React, { useState, useEffect } from 'react';
import {
  Compass,
  ArrowRightLeft,
  Calendar,
  Train,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  BookmarkCheck,
  UserCheck,
  Zap
} from 'lucide-react';
import { POPULAR_TRAINS, STATIONS } from '../data/mockData';
import { createJourney, getUserJourneys } from '../services/firestoreService';

export default function JourneyPlanner({ user, onRequireAuth, onNavigateTab }) {
  const [fromStation, setFromStation] = useState('MMCT');
  const [toStation, setToStation] = useState('NDLS');
  const [journeyDate, setJourneyDate] = useState(new Date().toISOString().split('T')[0]);
  const [travelType, setTravelType] = useState('reserved'); // 'reserved' | 'unreserved' | 'daily_commute'
  const [selectedTrain, setSelectedTrain] = useState(POPULAR_TRAINS[0]);
  const [selectedClass, setSelectedClass] = useState('3A');
  const [doorOrigin, setDoorOrigin] = useState('Home / Andheri East');
  const [doorDestination, setDoorDestination] = useState('Hotel / Connaught Place');
  const [isExecuting, setIsExecuting] = useState(false);
  const [savedJourneys, setSavedJourneys] = useState([]);
  const [executionMessage, setExecutionMessage] = useState(null);

  // Load user saved journeys from Firestore
  useEffect(() => {
    if (user) {
      loadJourneys();
    }
  }, [user]);

  const loadJourneys = async () => {
    if (!user) return;
    const journeys = await getUserJourneys(user.uid);
    setSavedJourneys(journeys);
  };

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleExecuteJourney = async () => {
    if (!user) {
      onRequireAuth();
      return;
    }

    setIsExecuting(true);
    setExecutionMessage(null);

    try {
      const journeyPayload = {
        trainNumber: selectedTrain.number,
        trainName: selectedTrain.name,
        fromStation: fromStation,
        toStation: toStation,
        journeyDate: journeyDate,
        travelType: travelType,
        pnr: Math.floor(2000000000 + Math.random() * 8000000000).toString(),
        coachBerth: selectedClass === 'GN' ? 'General Unreserved Coach' : `Coach B${Math.floor(Math.random() * 6) + 1} / Berth ${Math.floor(Math.random() * 64) + 1} (MB)`,
        platformGuidance: `Gate 2 Entry -> Escalator to PF ${selectedTrain.currentStatus.platform} -> Footbridge walk 120m -> Coach Position aligned with Marker ${selectedClass}1`
      };

      await createJourney(user.uid, journeyPayload);
      await loadJourneys();

      setExecutionMessage('🎉 Journey plan activated and committed to Firestore! AI executor monitoring door-to-door legs.');
      setTimeout(() => setExecutionMessage(null), 7000);
    } catch (err) {
      console.error('Error executing journey:', err);
      setExecutionMessage('Failed to save journey: ' + err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Personalized AI Door-to-Door Journey Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            One App for Your Entire Indian Railways Journey
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Tailored for daily commuters and frequent passengers traveling 12+ times a year.
            Plan door-to-door, track platform crowds, order hygiene-verified meals, boost in-train data, and preserve journey memories.
          </p>
        </div>
      </div>

      {/* Main Planning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Journey Search & Preferences */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Plan Your Route</span>
              </h2>
              {/* Travel Category Selector */}
              <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
                <button
                  onClick={() => setTravelType('reserved')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    travelType === 'reserved'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Reserved Express
                </button>
                <button
                  onClick={() => setTravelType('unreserved')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    travelType === 'unreserved'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  General Unreserved
                </button>
                <button
                  onClick={() => setTravelType('daily_commute')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    travelType === 'daily_commute'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Daily Commute
                </button>
              </div>
            </div>

            {/* Door-to-Door First/Last Mile Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-850 rounded-2xl border border-slate-800/80">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  1. Origin Door (Home/Office)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={doorOrigin}
                    onChange={(e) => setDoorOrigin(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Lokhandwala, Andheri W"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  4. Final Destination Door
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-red-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={doorDestination}
                    onChange={(e) => setDoorDestination(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                    placeholder="e.g. Connaught Place, New Delhi"
                  />
                </div>
              </div>
            </div>

            {/* Railway Station Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">From Station</label>
                <select
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {STATIONS.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center sm:pt-6">
                <button
                  type="button"
                  onClick={handleSwapStations}
                  className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-amber-400 rounded-xl border border-slate-700 transition"
                  title="Swap Stations"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">To Station</label>
                <select
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {STATIONS.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Journey Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Date of Journey</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Available Trains Selector */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Recommended Trains for Route ({POPULAR_TRAINS.length} Trains)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {POPULAR_TRAINS.map((train) => {
                  const isSelected = selectedTrain.number === train.number;
                  return (
                    <div
                      key={train.number}
                      onClick={() => setSelectedTrain(train)}
                      className={`p-4 rounded-2xl cursor-pointer border transition ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/10'
                          : 'bg-slate-800/60 border-slate-750 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-amber-400">{train.number}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300">
                          {train.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-sm mt-1">{train.name}</h3>
                      <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                        <span>{train.depTime} ({train.from})</span>
                        <span className="text-slate-400">➔</span>
                        <span>{train.arrTime} ({train.to})</span>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/40 text-[11px]">
                        <span className="text-emerald-400 font-semibold">{train.currentStatus.status}</span>
                        <span className="text-slate-400">PF {train.currentStatus.platform}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Seat Class Selection */}
            {selectedTrain.classes && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-300">Travel Class & Availability</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedTrain.classes.map((cls) => {
                    const isSelected = selectedClass === cls.code;
                    return (
                      <button
                        type="button"
                        key={cls.code}
                        onClick={() => setSelectedClass(cls.code)}
                        className={`p-3 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                            : 'bg-slate-800/70 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span>{cls.code}</span>
                          <span className="font-mono text-white">₹{cls.fare}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{cls.name}</div>
                        <div className="text-[10px] font-semibold mt-1 text-emerald-400">
                          {cls.available > 0 ? `AVL ${cls.available}` : (cls.waitingList || 'Available')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Execute Button */}
            {executionMessage && (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{executionMessage}</span>
              </div>
            )}

            <button
              onClick={handleExecuteJourney}
              disabled={isExecuting}
              className="w-full flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 hover:from-amber-600 hover:to-red-700 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>
                {isExecuting ? 'Committing to Firebase & Setting Up AI Legs...' : 'Execute Door-to-Door Journey with RailX'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: AI Door-to-Door Tailored Execution Plan */}
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Door-to-Door AI Breakdown</h3>
            </div>

            {/* The 4 Door-to-Door Journey Legs */}
            <div className="space-y-4">
              {/* Leg 1 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative">
                <span className="absolute -left-2 top-4 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-slate-950 flex items-center justify-center">1</span>
                <div className="pl-3">
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span>Door to Station Departure</span>
                    <span className="text-emerald-400">45 mins</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Cab/Metro from <strong className="text-slate-300">{doorOrigin}</strong> to {selectedTrain.fromName}.
                    Leave by <strong>{selectedTrain.depTime} minus 60 mins</strong> for peak platform entry buffer.
                  </p>
                </div>
              </div>

              {/* Leg 2 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative">
                <span className="absolute -left-2 top-4 w-4 h-4 rounded-full bg-amber-500 text-[10px] font-bold text-slate-950 flex items-center justify-center">2</span>
                <div className="pl-3">
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span>Station & Platform Navigation</span>
                    <span className="text-amber-400">PF {selectedTrain.currentStatus.platform}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Entry Gate 2. Take FOB Escalator to PF {selectedTrain.currentStatus.platform}.
                    Coach {selectedClass} position is ~120m from central staircase.
                  </p>
                </div>
              </div>

              {/* Leg 3 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative">
                <span className="absolute -left-2 top-4 w-4 h-4 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center">3</span>
                <div className="pl-3">
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span>In-Train Experience & Safety</span>
                    <span className="text-blue-400">{selectedTrain.duration}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Live train speed & signal tracking. Order FSSAI-audited meals at scheduled halts.
                    Auto-trigger 4G booster when daily quota drops below 200MB.
                  </p>
                </div>
              </div>

              {/* Leg 4 */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative">
                <span className="absolute -left-2 top-4 w-4 h-4 rounded-full bg-purple-500 text-[10px] font-bold text-white flex items-center justify-center">4</span>
                <div className="pl-3">
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span>Arrival to Final Destination</span>
                    <span className="text-purple-400">Last Mile</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Arrive at {selectedTrain.toName}. Exit via Paharganj/Ajmeri Gate side to reach{' '}
                    <strong className="text-slate-300">{doorDestination}</strong> with prepaid auto stand.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions during travel */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigateTab('food')}
                className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-center border border-slate-700 transition"
              >
                🍱 Order Food at PF
              </button>
              <button
                onClick={() => onNavigateTab('data')}
                className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-center border border-slate-700 transition"
              >
                ⚡ Boost 4G Data
              </button>
            </div>
          </div>

          {/* Active Saved Journeys in Firestore */}
          {user && savedJourneys.length > 0 && (
            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                  <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                  <span>My Active Trips in Firestore</span>
                </h4>
                <span className="text-[11px] text-slate-400">{savedJourneys.length} Saved</span>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {savedJourneys.map((j) => (
                  <div key={j.id} className="p-3.5 bg-slate-800/90 border border-slate-700/80 rounded-2xl text-xs space-y-1.5">
                    <div className="flex justify-between font-bold text-white">
                      <span>{j.trainName} ({j.trainNumber})</span>
                      <span className="text-amber-400 font-mono">PNR: {j.pnr || 'UNRES'}</span>
                    </div>
                    <div className="text-slate-400 flex justify-between">
                      <span>{j.fromStation} ➔ {j.toStation}</span>
                      <span>{j.journeyDate}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-medium">
                      {j.coachBerth}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
