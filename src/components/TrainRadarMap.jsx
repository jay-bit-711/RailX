import React, { useState, useEffect } from 'react';
import {
  Navigation,
  Compass,
  Zap,
  CreditCard,
  Layers,
  MapPin,
  Clock,
  Gauge,
  Wifi,
  ChevronUp,
  Crosshair,
  ShieldCheck,
  CheckCircle2,
  Share2
} from 'lucide-react';
import EngineLineLogo from './EngineLineLogo';

export default function TrainRadarMap({ onSelectTrain, onOpenPayment, onOpenFood, onOpenData, onToast }) {
  const [mapMode, setMapMode] = useState('radar'); // 'radar' | 'route'
  const [selectedTrainId, setSelectedTrainId] = useState('12951');
  const [radarZoom, setRadarZoom] = useState(1);
  const [sweepAngle, setSweepAngle] = useState(0);

  // Live Simulated Train Fleet on Radar 24
  const RADAR_FLEET = [
    {
      id: '12951',
      number: '12951',
      name: 'Mumbai Rajdhani Express',
      type: 'Premium Superfast',
      loco: 'WAP-7 #30481 (6,350 HP)',
      from: 'Airoli / MMCT',
      to: 'Connaught Place / NDLS',
      speed: 128,
      heading: 'NE (38°)',
      elevation: '482 m',
      status: 'On Time (0m)',
      signal: 'Clear Green (Signal Block 14A)',
      nextHalt: 'Surat Jn (12:45)',
      price: 2150,
      x: 140,
      y: 260
    },
    {
      id: '12739',
      number: '12739',
      name: 'Vande Bharat Express',
      type: 'Semi-High Speed EMU',
      loco: 'Train-18 Distributed Traction',
      from: 'Secunderabad (SC)',
      to: 'Vijayawada (BZA)',
      speed: 130,
      heading: 'SE (122°)',
      elevation: '112 m',
      status: '3m Early',
      signal: 'Clear Green',
      nextHalt: 'Nalgonda (07:15)',
      price: 1245,
      x: 240,
      y: 310
    },
    {
      id: '12137',
      number: '12137',
      name: 'Punjab Mail',
      type: 'Superfast Mail',
      loco: 'WAP-4 #22019',
      from: 'CSMT',
      to: 'Firozpur Cantt',
      speed: 92,
      heading: 'N (10°)',
      elevation: '310 m',
      status: '8m Late',
      signal: 'Double Yellow Caution',
      nextHalt: 'Bhusaval Jn (16:15)',
      price: 650,
      x: 180,
      y: 190
    },
    {
      id: '90001',
      number: '90001',
      name: 'Suburban AC Fast Local',
      type: '12-Car Medha Rake',
      from: 'Churchgate',
      to: 'Virar',
      speed: 72,
      heading: 'N (5°)',
      elevation: '12 m',
      status: 'On Time',
      signal: 'Clear Green',
      nextHalt: 'Andheri PF 4',
      price: 140,
      x: 110,
      y: 340
    }
  ];

  // Rotate radar scan sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setSweepAngle((prev) => (prev + 3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const activeTrain = RADAR_FLEET.find((t) => t.id === selectedTrainId) || RADAR_FLEET[0];

  return (
    <div className="relative w-full h-[540px] bg-black border border-[#222222] rounded-3xl overflow-hidden flex flex-col select-none">
      {/* Top Map HUD Controls */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center space-x-2 bg-black/90 border border-[#222222] px-3 py-1.5 rounded-xl backdrop-blur-md">
          <EngineLineLogo className="w-5 h-5" />
          <span className="text-[11px] font-extrabold font-mono tracking-wider text-white">
            TRAIN RADAR 24
          </span>
          <span className="gold-badge text-[8px] px-1.5 py-0.5 rounded font-mono font-bold">
            LIVE GPS
          </span>
        </div>

        {/* Mode Toggles */}
        <div className="flex items-center space-x-1 bg-black/90 border border-[#222222] p-1 rounded-xl backdrop-blur-md text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setMapMode('radar')}
            className={`px-2.5 py-1 rounded-lg transition ${
              mapMode === 'radar' ? 'bg-white text-black font-extrabold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Radar
          </button>
          <button
            type="button"
            onClick={() => setMapMode('route')}
            className={`px-2.5 py-1 rounded-lg transition ${
              mapMode === 'route' ? 'bg-white text-black font-extrabold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Door-to-Door
          </button>
        </div>
      </div>

      {/* Interactive Canvas Radar Map */}
      <div className="relative flex-1 w-full bg-[#030303] overflow-hidden">
        {/* Subtle Latitude/Longitude Coordinate Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:40px_40px] opacity-70"></div>

        {/* Radar Concentric Rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <circle cx="200" cy="240" r="80" stroke="#222" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <circle cx="200" cy="240" r="160" stroke="#1c1c1c" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          <circle cx="200" cy="240" r="240" stroke="#181818" strokeWidth="1" fill="none" />

          {/* Sweeping Radar Scanner Line */}
          {mapMode === 'radar' && (
            <g transform={`rotate(${sweepAngle} 200 240)`}>
              <line x1="200" y1="240" x2="200" y2="0" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              <polygon
                points="200,240 230,0 200,0"
                fill="url(#radarGradient)"
                opacity="0.25"
              />
            </g>
          )}

          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Golden Rail Trunk Corridors (White Railroad Tracks with Ties) */}
          {/* Mumbai to Delhi Western Trunk Line */}
          <path
            d="M 110 380 Q 130 310 140 260 T 180 180 T 210 100 T 230 40"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeDasharray="6 3"
            fill="none"
          />
          {/* Central to South Central Corridor */}
          <path
            d="M 120 370 Q 180 340 240 310 T 320 330"
            stroke="#666666"
            strokeWidth="1.8"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* Door-to-Door GPS Multi-modal Route Overlay */}
          {mapMode === 'route' && (
            <>
              {/* Leg 1: Airoli Home ➔ Station Auto Path (Gold Dotted) */}
              <line x1="90" y1="365" x2="120" y2="350" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="3 3" />
              {/* Leg 2: High Speed Track Line (Glowing Solid White) */}
              <path
                d="M 120 350 Q 140 260 180 180 T 230 40"
                stroke="#ffffff"
                strokeWidth="4"
                fill="none"
              />
              {/* Leg 3: Station ➔ Connaught Place Cab (Gold Dotted) */}
              <line x1="230" y1="40" x2="250" y2="30" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="3 3" />
            </>
          )}
        </svg>

        {/* Major Station Geo Nodes */}
        {[
          { name: 'CSMT / BCT', x: 105, y: 360 },
          { name: 'Surat Jn', x: 135, y: 250 },
          { name: 'Ratlam Jn', x: 175, y: 170 },
          { name: 'Kota Jn', x: 205, y: 95 },
          { name: 'New Delhi (NDLS)', x: 235, y: 35 },
          { name: 'Vijayawada (BZA)', x: 315, y: 325 }
        ].map((st) => (
          <div
            key={st.name}
            style={{ left: `${st.x}px`, top: `${st.y}px` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="w-2 h-2 rounded-full bg-white border border-black shadow-[0_0_8px_#fff]"></div>
            <span className="text-[8px] font-mono font-bold text-zinc-400 whitespace-nowrap ml-2.5 -mt-2 block">
              {st.name}
            </span>
          </div>
        ))}

        {/* Live Trains On Radar (Clickable Blips) */}
        {RADAR_FLEET.map((tr) => {
          const isSelected = selectedTrainId === tr.id;
          return (
            <div
              key={tr.id}
              onClick={() => {
                setSelectedTrainId(tr.id);
                onSelectTrain?.(tr);
              }}
              style={{ left: `${tr.x}px`, top: `${tr.y}px` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              {/* Train Radar Marker */}
              <div
                className={`relative flex items-center justify-center rounded-xl p-1.5 transition active:scale-95 ${
                  isSelected
                    ? 'bg-white text-black border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-110'
                    : 'bg-black text-white border border-[#333] hover:border-white'
                }`}
              >
                <EngineLineLogo className="w-4 h-4" goldAccent={!isSelected} />
                <span className="text-[9px] font-black font-mono ml-1">{tr.number}</span>
              </div>

              {/* Pulsing ring for active train */}
              {isSelected && (
                <div className="absolute inset-0 -m-1 rounded-xl border border-white animate-ping pointer-events-none"></div>
              )}

              {/* Tooltip Mini Pill */}
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[8px] font-mono text-zinc-400 whitespace-nowrap bg-black/80 px-1 rounded border border-[#222]">
                {tr.speed} km/h • {tr.status}
              </div>
            </div>
          );
        })}

        {/* Door 1 (Airoli) & Door 2 (Connaught Place) Markers in Route Mode */}
        {mapMode === 'route' && (
          <>
            <div className="absolute left-[85px] top-[365px] bg-[#D4AF37] text-black text-[8px] font-black font-mono px-2 py-0.5 rounded-full shadow-lg">
              DOOR 1: AIROLI HOME
            </div>
            <div className="absolute left-[215px] top-[15px] bg-[#D4AF37] text-black text-[8px] font-black font-mono px-2 py-0.5 rounded-full shadow-lg">
              DOOR 2: CONNAUGHT PLACE
            </div>
          </>
        )}
      </div>

      {/* ================= FLIGHTRADAR24-STYLE BOTTOM TELEMETRY HUD ================= */}
      <div className="p-4 bg-[#050505] border-t border-[#222222] space-y-3 z-30">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span className="text-xs font-black font-mono text-white tracking-wide">
                TRAIN #{activeTrain.number} · {activeTrain.name}
              </span>
              <span className="text-[9px] font-mono font-bold text-black bg-white px-1.5 py-0.2 rounded">
                {activeTrain.type}
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
              Last known station: {activeTrain.from} · Next: {activeTrain.nextHalt}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xl font-black font-mono text-white">
              {activeTrain.speed} <span className="text-[10px] font-normal text-zinc-400">km/h</span>
            </div>
            <div className="text-[9px] font-mono text-emerald-400">{activeTrain.status}</div>
          </div>
        </div>

        {/* Telemetry Vector Badges */}
        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
          <div className="p-2 bg-black border border-[#1f1f1f] rounded-xl">
            <span className="text-[8px] text-zinc-500 block uppercase">Locomotive</span>
            <span className="font-bold text-white truncate block">{activeTrain.loco}</span>
          </div>
          <div className="p-2 bg-black border border-[#1f1f1f] rounded-xl">
            <span className="text-[8px] text-zinc-500 block uppercase">Signal Block</span>
            <span className="font-bold text-white truncate block">{activeTrain.signal}</span>
          </div>
          <div className="p-2 bg-black border border-[#1f1f1f] rounded-xl">
            <span className="text-[8px] text-zinc-500 block uppercase">Elevation</span>
            <span className="font-bold text-white truncate block">{activeTrain.elevation}</span>
          </div>
        </div>

        {/* 1-Tap Payment & Direct Actions Attached */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => onOpenPayment?.(activeTrain)}
            className="col-span-2 py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[.98] transition flex items-center justify-center space-x-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Book · ₹{activeTrain.price}</span>
          </button>

          <button
            type="button"
            onClick={onOpenFood}
            className="py-3 bg-[#0f0f0f] border border-[#222222] hover:border-white text-white font-bold text-xs rounded-xl active:scale-95 transition"
          >
            🍱 Food
          </button>

          <button
            type="button"
            onClick={onOpenData}
            className="py-3 bg-[#0f0f0f] border border-[#222222] hover:border-white text-white font-bold text-xs rounded-xl active:scale-95 transition"
          >
            ⚡ Data
          </button>
        </div>
      </div>
    </div>
  );
}
