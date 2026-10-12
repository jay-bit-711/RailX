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
  bookingMode = 'plan',
  onToggleAddon,
  onAddAllDoorToDoor,
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
      const stationValue = (value, fallback) => {
        const trimmed = value.trim();
        return trimmed.length >= 2 ? trimmed.slice(0, 20) : fallback;
      };
      const journeyPayload = {
        trainNumber: bookingMode === 'daily' ? '90001' : train?.number || '12739',
        trainName: bookingMode === 'daily' ? 'Local / Metro Pass' : train?.name || 'Vande Bharat Express',
        fromStation: stationValue(origin, 'MMCT'),
        toStation: stationValue(destination, 'NDLS'),
        journeyDate: journeyDate,
        pnr: bookingMode === 'plan' ? pnrNum : '',
        coachBerth: bookingMode === 'quick' ? 'General Unreserved Coach' : bookingMode === 'daily' ? 'Local / Metro Pass' : `Coach ${selectedClass} / Seat ${Math.floor(Math.random() * 60) + 1}`,
        travelType: bookingMode === 'daily' ? 'daily_commute' : bookingMode === 'quick' ? 'unreserved' : 'reserved',
        platformGuidance: bookingMode === 'daily'
          ? 'Use the local or metro entry and follow station pass guidance'
          : bookingMode === 'quick'
            ? `Gate 1 -> PF ${train?.platform?.replace('PF ', '') || '4'} -> General coach marker`
            : `Gate 1 -> PF ${train?.platform?.replace('PF ', '') || '4'} -> Coach ${selectedClass} near middle FOB`,
        addons
      };

      if (user) {
        await createJourney(user.uid, journeyPayload);
      }

      onToast(user ? 'Booking saved · Ride opened' : 'Demo booking ready · Ride opened');
      onPaymentSuccess(journeyPayload);
      onClose();
    } catch (err) {
      console.error(err);
      onToast(`Could not save booking: ${err.message || 'Please try again.'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex flex-col justify-end animate-in fade-in">
      <div className="bg-[#0A0A0A] border-t border-[#222] rounded-t-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto ns">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="logo-mark logo-dark">RX</div>
            <div className="text-sm font-bold text-white">Review booking</div>
          </div>
          <button type="button" onClick={onClose} className="text-xs text-zinc-500 hover:text-white">✕</button>
        </div>

        <div className="flex gap-2">
          {[
            { id: 'daily', label: 'Daily', detail: 'Local · Metro' },
            { id: 'quick', label: 'Quick', detail: 'Unreserved' },
            { id: 'plan', label: 'Plan', detail: 'Reserved' }
          ].map((mode) => (
            <div key={mode.id} className={`flex-1 rounded-xl border px-2 py-2 ${bookingMode === mode.id ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#222] text-zinc-500'}`}>
              <div className="text-xs font-bold">{mode.label}</div>
              <div className="text-[9px]">{mode.detail}</div>
            </div>
          ))}
        </div>

        {/* Trip Mini Summary */}
        <div className="p-3 bg-black border border-[#222] rounded-xl text-xs space-y-1">
          <div className="flex justify-between font-bold text-white">
            <span>{train?.name || '12739 Vande Bharat'}</span>
            <span className="font-mono text-[#D4AF37]">₹{train?.price || 1245}</span>
          </div>
          <div className="text-[10px] text-zinc-400 flex justify-between">
            <span>{origin} ➔ {destination}</span>
            <span>{selectedClass} · {passengers.filter(p => p.selected).map(p => p.name).join(', ')}</span>
          </div>
          <div className="text-[9px] text-zinc-500">
            Ride: {ridePref} • {addons.length ? addons.join(', ') : 'No add-ons'}
          </div>
        </div>

        <div className="rounded-xl border border-[#222] p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold">Add-ons</div>
            <button type="button" onClick={onAddAllDoorToDoor} className="text-[10px] font-bold text-[#D4AF37] underline underline-offset-2">Add all door-to-door</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['First mile', 'Station help', 'Food', 'Data', 'Last mile'].map((addon) => {
              const selected = addons.includes(addon);
              return (
                <button
                  key={addon}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onToggleAddon?.(addon)}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${
                    selected ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333] text-zinc-400'
                  }`}
                >
                  {selected ? '✓ ' : '+ '}{addon}
                </button>
              );
            })}
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
          {isProcessing ? 'Saving booking...' : `${bookingMode === 'daily' ? 'Get pass' : 'Book'} · ₹${train?.price || 1245} with ${payMethod}`}
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
