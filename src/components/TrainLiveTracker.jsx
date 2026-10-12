import React, { useState } from 'react';
import {
  Train,
  Gauge,
  Navigation,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Wifi,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { POPULAR_TRAINS } from '../data/mockData';

export default function TrainLiveTracker() {
  const [selectedTrain, setSelectedTrain] = useState(POPULAR_TRAINS[0]);
  const [activeCoach, setActiveCoach] = useState('B3');

  const stationsProgress = [
    { name: 'Mumbai Central (MMCT)', code: 'MMCT', pf: '1', scheduled: '17:00', actual: '17:00', passed: true, dist: '0 km' },
    { name: 'Borivali (BVI)', code: 'BVI', pf: '6', scheduled: '17:33', actual: '17:35', passed: true, dist: '30 km' },
    { name: 'Surat (ST)', code: 'ST', pf: '1', scheduled: '19:42', actual: '19:40', passed: true, dist: '263 km' },
    { name: 'Vadodara Jn (BRC)', code: 'BRC', pf: '2', scheduled: '21:05', actual: '21:05', passed: true, dist: '392 km' },
    { name: 'Ratlam Jn (RTM)', code: 'RTM', pf: '1', scheduled: '00:15', actual: '00:15', current: true, dist: '653 km' },
    { name: 'Kota Jn (KOTA)', code: 'KOTA', pf: '1', scheduled: '03:15', actual: '03:15', upcoming: true, dist: '920 km' },
    { name: 'New Delhi (NDLS)', code: 'NDLS', pf: '1', scheduled: '08:32', actual: '08:32', upcoming: true, dist: '1384 km' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Train className="w-6 h-6 train-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>{selectedTrain.name}</span>
              <span className="font-mono text-sm px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                #{selectedTrain.number}
              </span>
            </h2>
            <p className="text-xs text-slate-400">Live Indian Railways GPS & Platform Telemetry</p>
          </div>
        </div>

        {/* Live Train Switcher */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedTrain.number}
            onChange={(e) => {
              const tr = POPULAR_TRAINS.find((t) => t.number === e.target.value);
              if (tr) setSelectedTrain(tr);
            }}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
          >
            {POPULAR_TRAINS.map((t) => (
              <option key={t.number} value={t.number}>
                {t.number} - {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Live Speed</div>
            <div className="text-base font-extrabold text-white font-mono">{selectedTrain.currentStatus.speed}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Current Station</div>
            <div className="text-xs font-bold text-white truncate">{selectedTrain.currentStatus.station}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Punctuality Status</div>
            <div className="text-xs font-bold text-emerald-400">{selectedTrain.currentStatus.status}</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Arriving On</div>
            <div className="text-xs font-bold text-white font-mono">Platform {selectedTrain.currentStatus.platform}</div>
          </div>
        </div>
      </div>

      {/* Interactive Coach Composition Visualizer */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Interactive Rake / Coach Position Indicator</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Click any coach to view berth map & distance to pantry or locomotive
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-amber-400 font-bold">Selected: Coach {activeCoach}</span>
          </div>
        </div>

        {/* Train Rake Scroll Track */}
        <div className="overflow-x-auto py-3 no-scrollbar">
          <div className="inline-flex space-x-2 min-w-full items-center">
            {selectedTrain.coachLayout.map((coach, idx) => {
              const isSelected = activeCoach === coach;
              const isEngine = coach === 'ENG' || coach === 'DTC' || coach === 'MOTOR';
              const isPantry = coach === 'PC';

              return (
                <button
                  key={`${coach}-${idx}`}
                  onClick={() => setActiveCoach(coach)}
                  className={`flex flex-col items-center justify-center w-14 h-16 rounded-xl border font-mono text-xs transition ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-lg shadow-amber-500/30 scale-105'
                      : isEngine
                      ? 'bg-red-500/20 text-red-400 border-red-500/30'
                      : isPantry
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-[10px] opacity-75">{isEngine ? 'FRONT' : isPantry ? 'PANTRY' : `COACH`}</span>
                  <span className="font-bold text-sm">{coach}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-slate-850 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-300">
            📍 <strong className="text-amber-400">Coach {activeCoach}</strong> is positioned ~
            <strong className="text-white">
              {Math.max(1, selectedTrain.coachLayout.indexOf(activeCoach)) * 25} meters
            </strong>{' '}
            from the main station foot-over-bridge staircase.
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Synced with IRCTC Coach Guidance</span>
        </div>
      </div>

      {/* Route Stations Timeline */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h3 className="text-sm font-bold text-white">Halts & Live Distance Timeline</h3>
        <div className="space-y-3">
          {stationsProgress.map((st, idx) => (
            <div
              key={st.code}
              className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition ${
                st.current
                  ? 'bg-amber-500/10 border-amber-500/40 text-white'
                  : st.passed
                  ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                  : 'bg-slate-850 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    st.current
                      ? 'bg-amber-500 text-slate-950 font-black animate-pulse'
                      : st.passed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {st.passed ? '✓' : idx + 1}
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center space-x-2">
                    <span>{st.name}</span>
                    <span className="font-mono text-[10px] text-slate-400">({st.code})</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Platform {st.pf} • Distance: {st.dist}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-semibold text-white">Sch: {st.scheduled}</div>
                <div className={`text-[11px] font-medium ${st.current ? 'text-amber-400' : 'text-slate-400'}`}>
                  {st.current ? 'Current Station' : st.passed ? 'Departed' : `Exp: ${st.actual}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
