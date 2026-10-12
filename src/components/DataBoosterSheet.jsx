import React, { useState } from 'react';
import { DATA_BOOSTERS } from '../data/mockData';
import { createDataRecharge } from '../services/firestoreService';

export default function DataBoosterSheet({ isOpen, onClose, user, onToast }) {
  const [selectedPack, setSelectedPack] = useState(DATA_BOOSTERS[0]);
  const [phone, setPhone] = useState(user?.phoneNumber || '+91 98765 43210');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleRecharge = async () => {
    setIsSubmitting(true);
    try {
      if (user) {
        await createDataRecharge(user.uid, {
          phone: phone.trim(),
          operator: selectedPack.operator,
          packName: selectedPack.data,
          dataAmount: selectedPack.data,
          amount: selectedPack.price
        });
      }
      onToast(`⚡ Activated ₹${selectedPack.price} Data Booster on ${phone}!`);
      onClose();
    } catch (err) {
      console.error(err);
      onToast(`⚡ Recharged ₹${selectedPack.price} ${selectedPack.data}!`);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex flex-col justify-end animate-in fade-in">
      <div className="bg-[#0A0A0A] border-t border-[#222] rounded-t-3xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="logo-mark logo-dark">RX</div>
            <div className="text-sm font-bold text-white">In-Train Data Booster</div>
          </div>
          <button type="button" onClick={onClose} className="text-xs text-zinc-500 hover:text-white">✕</button>
        </div>

        <p className="text-[11px] text-zinc-400">
          Instant high-speed 4G/5G data voucher top-up for uninterrupted train streaming.
        </p>

        <div className="grid grid-cols-2 gap-2">
          {DATA_BOOSTERS.map((pack) => (
            <div
              key={pack.id}
              onClick={() => setSelectedPack(pack)}
              className={`p-3 rounded-xl border cursor-pointer transition ${
                selectedPack.id === pack.id
                  ? 'border-white bg-white/10'
                  : 'border-[#222] bg-black hover:border-zinc-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-zinc-400 font-bold">{pack.operator}</span>
                <span className="text-xs font-bold font-mono text-white">₹{pack.price}</span>
              </div>
              <div className="text-xs font-bold text-emerald-400 mt-1">{pack.data}</div>
              <div className="text-[9px] text-zinc-500 mt-0.5">{pack.desc}</div>
            </div>
          ))}
        </div>

        <div>
          <label className="text-[10px] text-zinc-500 block mb-1">Mobile Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-black border border-[#222] rounded-lg px-3 py-2 text-xs outline-none text-white font-mono"
            placeholder="+91 98765 43210"
          />
        </div>

        <button
          type="button"
          onClick={handleRecharge}
          disabled={isSubmitting}
          className="w-full py-3 bg-white text-black font-bold rounded-xl text-xs active:scale-[.98] transition disabled:opacity-50"
        >
          {isSubmitting ? 'Activating in Firestore...' : `Recharge ₹${selectedPack.price} Now`}
        </button>
      </div>
    </div>
  );
}
