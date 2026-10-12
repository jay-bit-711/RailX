import React from 'react';
import { Share2, Copy, ShieldCheck, Battery, Navigation, Clock, CheckCircle } from 'lucide-react';

export default function FamilyShareModal({ isOpen, onClose, user, onToast }) {
  if (!isOpen) return null;

  const shareUrl = `https://railx-48e91.web.app/live/jayanth-delhi-trip`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    onToast("🔗 Family Live Tracking Link copied! Share on WhatsApp to eliminate travel anxiety.");
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Track my train journey live on RailX (Navi Mumbai ➔ Delhi): ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex flex-col justify-end animate-in fade-in">
      <div className="bg-[#080808] border-t border-[#222222] rounded-t-3xl p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="logo-mark">RX</div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">
              Family Anxiety-Free Live Tracker
            </span>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white text-xs">
            ✕
          </button>
        </div>

        {/* Live Tracking Card Preview */}
        <div className="p-4 bg-black border border-[#222222] rounded-2xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-white">Live Passenger Broadcast Active</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-zinc-400 font-mono">
              <Battery className="w-3.5 h-3.5 text-emerald-400" />
              <span>84%</span>
            </div>
          </div>

          <div className="p-3 bg-[#111] border border-[#222] rounded-xl flex justify-between items-center text-xs">
            <div>
              <div className="text-[10px] text-zinc-500 font-mono uppercase">Route</div>
              <div className="font-bold text-white">Airoli ➔ Connaught Place</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-zinc-500 font-mono uppercase">Arrival ETA</div>
              <div className="font-bold text-[#D4AF37] font-mono">22:05 Tonight</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 bg-[#0e0e0e] rounded-xl border border-[#1f1f1f]">
              <span className="text-zinc-500 block text-[9px]">CURRENT SPEED</span>
              <span className="font-bold text-white font-mono">112 km/h · Safe</span>
            </div>
            <div className="p-2.5 bg-[#0e0e0e] rounded-xl border border-[#1f1f1f]">
              <span className="text-zinc-500 block text-[9px]">NEXT STATION</span>
              <span className="font-bold text-white">Kota Jn (PF 1)</span>
            </div>
          </div>

          <p className="text-[10px] text-zinc-400 text-center">
            Loved ones can view live train speed, platform arrival, and phone battery without installing the app.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center space-x-2 py-3 bg-[#111] border border-[#222] hover:border-white rounded-xl text-xs font-bold text-white transition active:scale-95"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Link</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center space-x-2 py-3 bg-white text-black rounded-xl text-xs font-bold hover:bg-zinc-200 transition active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
