import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  ArrowUpRight,
  Shield,
  LifeBuoy,
  Coffee,
  Luggage,
  Sparkles,
  Users
} from 'lucide-react';
import { STATIONS } from '../data/mockData';

export default function PlatformGuidance() {
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);

  const amenities = [
    { title: "IRCTC Executive Lounge", location: "Platform 1 & 16 Entry", desc: "Buffet dining, recliner resting zones, WiFi & clean showers.", icon: Coffee },
    { title: "Foot-over-Bridge & Escalators", location: "Central & North FOB", desc: "Equipped with automated escalators & lifts connecting all platforms.", icon: Compass },
    { title: "Luggage Cloak Room & Coolie Rates", location: "Main Concourse Near Gate 2", desc: "Government fixed coolie tariff: ₹150 up to 40kg. 24h luggage deposit.", icon: Luggage },
    { title: "Emergency Medical Booth & Pharmacy", location: "Platform 1, Near Station Director", desc: "24x7 doctor on call, first aid & emergency oxygen cylinders.", icon: LifeBuoy },
    { title: "Unreserved Passenger Holding Area", location: "Ajmeri Gate Entry Pavilion", desc: "Dedicated queued sheltered area to avoid rush during peak hours.", icon: Users },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Platform & Station Navigation Guide</span>
            </h2>
            <p className="text-xs text-slate-400">Door-to-Coach platform navigation & commuter facilities</p>
          </div>
        </div>

        <div>
          <label className="text-xs text-slate-400 block mb-1">Select Station</label>
          <select
            value={selectedStation.code}
            onChange={(e) => {
              const st = STATIONS.find((s) => s.code === e.target.value);
              if (st) setSelectedStation(st);
            }}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
          >
            {STATIONS.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({s.code}) - {s.platforms} Platforms
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rake Positioning Decoded Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">How Coach Positioning Indicators Work at {selectedStation.name}</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Indian Railways platforms feature digital overhead Coach Guidance Indicators (CGI).
          Here is how to decode your exact stopping spot before your train pulls into the platform:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 text-xs space-y-2">
            <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">General / Unreserved</div>
            <p className="text-slate-400">
              Coaches marked <strong className="text-white">GEN / GS</strong> stop either at the extreme front (behind Locomotive) or extreme rear end. Reach platform 25 mins early to position in queue.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 text-xs space-y-2">
            <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Sleeper Coaches</div>
            <p className="text-slate-400">
              Coaches marked <strong className="text-white">S1 to S8</strong> are situated next to the General coaches, spanning the mid-section of the train rake.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-800 text-xs space-y-2">
            <div className="text-blue-400 font-bold uppercase tracking-wider text-[11px]">AC Tier Coaches</div>
            <p className="text-slate-400">
              Coaches marked <strong className="text-white">B1-B8 (3A), A1-A3 (2A), H1 (1A)</strong> are grouped around the Pantry Car (PC), typically near the central FOB escalator for rapid access.
            </p>
          </div>
        </div>
      </div>

      {/* Station Amenities & Help Desks */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Essential Station Facilities ({selectedStation.name})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">{item.title}</h4>
                  <div className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
