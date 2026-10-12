import React, { useEffect, useState } from 'react';
import { ShieldAlert, Wrench, Sparkles, Cigarette, Mountain, CheckCircle2, AlertTriangle, Coffee, LifeBuoy, Phone } from 'lucide-react';

export default function RapidAssistanceModal({ isOpen, onClose, onToast, initialTab = 'sos' }) {
  const [activeTab, setActiveTab] = useState('sos'); // 'sos' | 'repair' | 'washroom' | 'break' | 'scenic'
  const [washroomRating, setWashroomRating] = useState(4);
  const [repairItem, setRepairItem] = useState('Fan not rotating in Berth 21');
  const [breakTimer, setBreakTimer] = useState(180); // 3 mins break countdown

  useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleRepairSubmit = () => {
    onToast(`🔧 RailMadad Ticket #RM-8419 logged: "${repairItem}". Electrician visiting coach.`);
    onClose();
  };

  const handleWashroomSubmit = () => {
    onToast(`✨ Cleanliness rating (${washroomRating}★) sent to On-Board Housekeeping Staff (OBHS).`);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex flex-col justify-end animate-in fade-in">
      <div className="bg-[#080808] border-t border-[#222222] rounded-t-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto ns">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="logo-mark">RX</div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">
              In-Coach Assistance & Amenities
            </span>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white text-xs">
            ✕
          </button>
        </div>

        {/* Action Switcher Tabs */}
        <div className="grid grid-cols-6 gap-1 p-1 bg-black border border-[#222] rounded-xl text-[9px] font-bold">
          {[
            { id: 'sos', label: 'SOS', icon: '🚨' },
            { id: 'support', label: 'Support', icon: 'ℹ️' },
            { id: 'repair', label: 'Repairs', icon: '⚡' },
            { id: 'washroom', label: 'Hygiene', icon: '🚾' },
            { id: 'break', label: 'Chai/Halt', icon: '☕' },
            { id: 'scenic', label: 'Scenic', icon: '🌄' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 rounded-lg flex flex-col items-center transition ${
                activeTab === tab.id ? 'bg-white text-black font-extrabold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="mt-0.5">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 1. SOS TAB */}
        {activeTab === 'sos' && (
          <div className="p-4 bg-black border border-[#D4AF37]/40 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-[#D4AF37] font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
              <span>Railway emergency</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Does not auto-dispatch emergency services. For urgent railway assistance, call the railway helpline.
            </p>
            <a href="tel:139" className="block w-full rounded-xl bg-[#D4AF37] py-3 text-center text-xs font-black uppercase tracking-wider text-black active:scale-95 transition">
              Call 139 for help
            </a>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-3 rounded-2xl border border-[#222] bg-black p-4">
            <div className="flex items-center gap-2 text-sm font-bold"><LifeBuoy className="h-4 w-4 text-[#D4AF37]" />Railway support</div>
            <p className="text-xs text-zinc-400">Contact official railway support for safety, medical or journey help.</p>
            <a href="tel:139" className="flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-bold text-black">
              <Phone className="h-4 w-4" />Call 139
            </a>
            <a href="https://railmadad.indianrailways.gov.in/" target="_blank" rel="noreferrer" className="block rounded-xl border border-[#333] py-3 text-center text-xs font-bold text-[#D4AF37]">
              Open RailMadad
            </a>
          </div>
        )}

        {/* 2. REPAIR TAB */}
        {activeTab === 'repair' && (
          <div className="p-4 bg-black border border-[#222] rounded-2xl space-y-3 text-xs">
            <div className="font-bold text-white flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-[#D4AF37]" />
              <span>Coach Electrical & Fixture Maintenance</span>
            </div>
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">Issue Description</label>
              <select
                value={repairItem}
                onChange={(e) => setRepairItem(e.target.value)}
                className="w-full bg-[#111] border border-[#222] rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="Fan not rotating in Berth 21">Fan not rotating in Berth 21</option>
                <option value="Reading light flickering / dead">Reading light flickering / dead</option>
                <option value="Charging socket 220V no voltage">Mobile charging socket dead (no 220V)</option>
                <option value="AC vent too cold / cannot close baffle">AC vent too cold / cannot close baffle</option>
                <option value="Window latch stuck">Window latch stuck / rattling</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleRepairSubmit}
              className="w-full py-3 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider hover:bg-zinc-200 transition"
            >
              Dispatch Coach Technician (OBHS)
            </button>
          </div>
        )}

        {/* 3. WASHROOM TAB */}
        {activeTab === 'washroom' && (
          <div className="p-4 bg-black border border-[#222] rounded-2xl space-y-3 text-xs">
            <div className="font-bold text-white">Washroom Hygiene Audit</div>
            <p className="text-[11px] text-zinc-400">
              Rate Coach B3 washroom cleanliness. Water refilled at next major halt.
            </p>
            <div className="flex justify-center space-x-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setWashroomRating(star)}
                  className={`text-2xl transition ${
                    washroomRating >= star ? 'text-[#D4AF37] scale-110' : 'text-zinc-700'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleWashroomSubmit}
              className="w-full py-3 bg-white text-black font-extrabold rounded-xl text-xs uppercase tracking-wider hover:bg-zinc-200 transition"
            >
              Submit Washroom Hygiene Feedback
            </button>
          </div>
        )}

        {/* 4. CHAI / SMOKE BREAK TIMER TAB */}
        {activeTab === 'break' && (
          <div className="p-4 bg-black border border-[#222] rounded-2xl space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-white flex items-center space-x-1.5">
                <Coffee className="w-4 h-4 text-[#D4AF37]" />
                <span>Next Station Break: Ratlam Jn</span>
              </span>
              <span className="gold-badge text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                10 Min Halt
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Audio warning sounds 1 minute before locomotive double-horn whistle to ensure you never miss the train.
            </p>
            <div className="p-3 bg-[#111] border border-[#222] rounded-xl flex justify-between items-center">
              <div>
                <div className="text-[10px] text-zinc-500 uppercase font-mono">Platform Re-boarding Buzzer</div>
                <div className="text-base font-extrabold font-mono text-white">Alarm set for 00:23</div>
              </div>
              <button
                type="button"
                onClick={() => onToast("🔔 Whistle reminder active! You'll get a loud alarm 90s before departure.")}
                className="px-3 py-1.5 bg-white text-black font-bold rounded-lg text-xs"
              >
                Set Alarm
              </button>
            </div>
          </div>
        )}

        {/* 5. SCENIC RADAR TAB */}
        {activeTab === 'scenic' && (
          <div className="p-4 bg-black border border-[#222] rounded-2xl space-y-3 text-xs">
            <div className="flex items-center space-x-2 text-white font-bold">
              <Mountain className="w-4 h-4 text-[#D4AF37]" />
              <span>Scenic Route Radar</span>
            </div>
            <div className="p-3 bg-[#111] border border-[#222] rounded-xl space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Chambal River Deep Ravines</span>
                <span className="text-[#D4AF37]">In 14 Mins</span>
              </div>
              <p className="text-[10px] text-zinc-400">
                Spectacular sunset gorge view from the right window as the train crosses the 800m heritage bridge.
              </p>
            </div>
            <div className="p-3 bg-[#111] border border-[#222] rounded-xl space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-white">
                <span>Kasara Thal Ghat Curves</span>
                <span className="text-zinc-400">Completed</span>
              </div>
              <p className="text-[10px] text-zinc-500">
                1 in 37 mountain gradient tackled using banker locomotives.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
