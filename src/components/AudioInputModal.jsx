import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Volume2, CheckCircle2, Sparkles } from 'lucide-react';

export default function AudioInputModal({ isOpen, onClose, onResult, onToast }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const samplePresets = [
    "Navi Mumbai Airoli to Connaught Place Delhi",
    "Patancheru Lingampally to Gollapudi Vijayawada",
    "Mumbai Central to New Delhi 3A Coach"
  ];

  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      setIsListening(false);
      setTranscript('');
    }
  }, [isOpen]);

  const startListening = () => {
    setIsListening(true);
    setTranscript('Listening for voice journey command...');

    // Attempt browser Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-IN';
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = () => {
          simulateVoice();
        };

        recognition.start();
        return;
      } catch {
        // Fallback simulation
      }
    }

    simulateVoice();
  };

  const simulateVoice = () => {
    setTimeout(() => {
      setTranscript('“Navi Mumbai Airoli (10:05) to Connaught Place Delhi (22:05)”');
      setIsListening(false);
    }, 1800);
  };

  const handleApply = (text) => {
    const finalVal = text || transcript;
    onResult(finalVal);
    onToast(`🎙️ Voice command recognized: "${finalVal.replace(/^[“”]|["”]$/g, '')}"`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex flex-col justify-end animate-in fade-in">
      <div className="bg-[#080808] border-t border-[#222222] rounded-t-3xl p-6 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="logo-mark">RX</div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">
              AI Voice Command HUD
            </span>
          </div>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white text-xs">
            ✕
          </button>
        </div>

        {/* Visual Audio Waveform */}
        <div className="p-6 bg-black border border-[#222222] rounded-2xl flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border transition ${
              isListening
                ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.4)]'
                : 'bg-[#111] text-zinc-400 border-[#333]'
            }`}>
              <Mic className="w-7 h-7" />
            </div>
            {isListening && (
              <div className="absolute inset-0 rounded-full border border-white radar-ping pointer-events-none"></div>
            )}
          </div>

          {/* Animated Waveform Bars */}
          <div className="flex items-center space-x-1.5 h-8">
            <span className={`w-1 bg-[#D4AF37] rounded-full ${isListening ? 'audio-bar-1' : 'h-1'}`}></span>
            <span className={`w-1 bg-white rounded-full ${isListening ? 'audio-bar-2' : 'h-2'}`}></span>
            <span className={`w-1 bg-[#D4AF37] rounded-full ${isListening ? 'audio-bar-3' : 'h-3'}`}></span>
            <span className={`w-1 bg-white rounded-full ${isListening ? 'audio-bar-4' : 'h-2'}`}></span>
            <span className={`w-1 bg-[#D4AF37] rounded-full ${isListening ? 'audio-bar-5' : 'h-1'}`}></span>
          </div>

          <div className="text-center">
            <div className="text-sm font-bold text-white font-mono px-4">
              {transcript}
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">
              Speak origin, destination, or train number in natural Indian English / Hindi
            </p>
          </div>
        </div>

        {/* Quick Voice Presets */}
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-zinc-500">Suggested Voice Prompts</div>
          <div className="grid grid-cols-1 gap-1.5">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApply(preset)}
                className="w-full text-left p-2.5 bg-black border border-[#222222] hover:border-white rounded-xl text-xs text-zinc-300 font-mono transition flex justify-between items-center"
              >
                <span>🗣️ “{preset}”</span>
                <span className="text-[10px] text-[#D4AF37] font-sans font-bold">Use</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => handleApply(transcript)}
          className="w-full py-3.5 bg-white text-black font-extrabold rounded-2xl text-xs uppercase tracking-wider active:scale-[.98] transition shadow-lg shadow-white/10"
        >
          Confirm Audio Route Input
        </button>
      </div>
    </div>
  );
}
