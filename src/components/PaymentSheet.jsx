import React, { useState } from 'react';
import { createJourney } from '../services/firestoreService';

export default function PaymentSheet({
  isOpen,
  onClose,
  user,
  train,
  origin,
  destination,
  journeyDate,
  selectedClass,
  passengers,
  ridePref,
  addons,
  onPaymentSuccess,
  onToast
}) {
  const [payMethod, setPayMethod] = useState('GPay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const pnrNum = Math.floor(2000000000 + Math.random() * 8000000000).toString();
      const journeyPayload = {
        trainNumber: train?.number || '12739',
        trainName: train?.name || 'Vande Bharat Express',
        fromStation: 'SC',
        toStation: 'BZA',
        journeyDate: journeyDate,
        pnr: pnrNum,
        coachBerth: selectedClass === 'General' ? 'General Coach' : `Coach C2 / Seat ${Math.floor(Math.random() * 60) + 1}`,
        travelType: selectedClass === 'General' ? 'unreserved' : 'reserved',
        platformGuidance: `Gate 1 -> Escalator to PF ${train?.platform?.replace('PF ', '') || '4'} -> Coach C2 near middle FOB`
      };

      if (user) {
        await createJourney(user.uid, journeyPayload);
      }

      onToast('Paid · Invoice saved · Switched to Live');
      onPaymentSuccess(journeyPayload);
      onClose();
    } catch (err) {
      console.error(err);
      onToast('Paid · Switched to Live');
      onPaymentSuccess();
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex flex-col justify-end animate-in fade-in">
      <div className="bg-[#0A0A0A] border-t border-[#222] rounded-t-3xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="logo-mark logo-dark">RX</div>
            <div className="text-sm font-bold text-white">Pay · Invoice generated after</div>
          </div>
          <button type="button" onClick={onClose} className="text-xs text-zinc-500 hover:text-white">✕</button>
        </div>

        {/* Trip Mini Summary */}
        <div className="p-3 bg-black border border-[#222] rounded-xl text-xs space-y-1">
          <div className="flex justify-between font-bold text-white">
            <span>{train?.name || '12739 Vande Bharat'}</span>
            <span className="font-mono text-emerald-400">₹{train?.price || 1245}</span>
          </div>
          <div className="text-[10px] text-zinc-400 flex justify-between">
            <span>{origin} ➔ {destination}</span>
            <span>{selectedClass} · {passengers.filter(p => p.selected).map(p => p.name).join(', ')}</span>
          </div>
          <div className="text-[9px] text-zinc-500">
            Ride: {ridePref} • Addons: {addons.length > 0 ? addons.join(', ') : 'Standard'}
          </div>
        </div>

        {/* Payment Gateway Selector */}
        <div className="grid grid-cols-4 gap-2">
          {['GPay', 'Apple', 'RailX', 'Card'].map((method) => {
            const isSelected = payMethod === method;
            return (
              <button
                key={method}
                type="button"
                onClick={() => setPayMethod(method)}
                className={`py-3 rounded-xl border text-[10px] font-bold transition ${
                  isSelected
                    ? 'bg-white text-black border-white'
                    : 'border-[#333] text-zinc-400 bg-[#111] hover:border-zinc-600'
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3.5 bg-white text-black font-bold rounded-xl text-sm active:scale-[.98] transition disabled:opacity-50"
        >
          {isProcessing ? 'Saving to Firestore...' : `Pay ₹${train?.price || 1245} with ${payMethod}`}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-1 text-zinc-500 hover:text-zinc-300 text-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
