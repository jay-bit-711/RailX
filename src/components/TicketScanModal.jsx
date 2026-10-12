import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, ScanLine, FileText, Sparkles } from 'lucide-react';

export default function TicketScanModal({ isOpen, onClose, onScanSuccess, onToast }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanPreview, setScanPreview] = useState(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setScanPreview(uploadEvent.target?.result);
        triggerOcr();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerOcr = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const parsedData = {
        pnr: "4218903512",
        trainNumber: "12951",
        trainName: "Mumbai Rajdhani Express",
        from: "Navi Mumbai / CSMT",
        to: "Connaught Place / NDLS",
        coach: "B3",
        berth: "21",
        date: "2026-10-14"
      };
      onScanSuccess(parsedData);
      onToast("📷 Ticket scanned & verified! Auto-filled route and PNR.");
      onClose();
    }, 2200);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex flex-col justify-end animate-in fade-in">
      <div className="bg-[#080808] border-t border-[#222222] rounded-t-3xl p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="logo-mark">RX</div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">
              IRCTC Ticket Vision Scanner
            </span>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white text-xs">
            ✕
          </button>
        </div>

        {/* Viewfinder Scan Box with Laser Line */}
        <div className="relative h-56 bg-black border-2 border-dashed border-[#333333] rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4">
          {/* Laser bar animation */}
          {isScanning && <div className="scan-laser z-20"></div>}

          {scanPreview ? (
            <img src={scanPreview} alt="Ticket preview" className="w-full h-full object-cover opacity-60 rounded-xl" />
          ) : (
            <div className="text-center space-y-2 z-10">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-white">
                <Camera className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-white">Scan or Upload Ticket Image</div>
              <p className="text-[10px] text-zinc-500 max-w-xs">
                Snap IRCTC physical counter ticket, UTS QR code, or mobile screenshot to extract journey details instantly.
              </p>
            </div>
          )}

          {/* Corner target reticles */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white pointer-events-none"></div>
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white pointer-events-none"></div>
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white pointer-events-none"></div>
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white pointer-events-none"></div>

          {isScanning && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
              <div className="px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded-full animate-pulse flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reading PNR & Stations...</span>
              </div>
            </div>
          )}
        </div>

        {/* Upload Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center justify-center space-x-2 py-3 bg-[#111] border border-[#222] hover:border-white rounded-xl text-xs font-bold text-white cursor-pointer transition">
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            type="button"
            onClick={triggerOcr}
            disabled={isScanning}
            className="flex items-center justify-center space-x-2 py-3 bg-white text-black rounded-xl text-xs font-bold hover:bg-zinc-200 transition"
          >
            <ScanLine className="w-4 h-4" />
            <span>Simulate Ticket Scan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
