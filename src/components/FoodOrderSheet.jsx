import React, { useState } from 'react';
import { FOOD_MENU } from '../data/mockData';
import { createFoodOrder } from '../services/firestoreService';

export default function FoodOrderSheet({ isOpen, onClose, user, onToast }) {
  const [selectedFood, setSelectedFood] = useState(FOOD_MENU[0]);
  const [berthInfo, setBerthInfo] = useState('Coach B3 / Berth 21');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleOrder = async () => {
    setIsSubmitting(true);
    try {
      if (user) {
        await createFoodOrder(user.uid, {
          trainNumber: "12739",
          station: selectedFood.halt,
          vendorName: selectedFood.vendor,
          items: [`${selectedFood.item} (₹${selectedFood.price})`],
          totalAmount: selectedFood.price,
          hygieneRating: 5,
          hygieneReview: selectedFood.fssai
        });
      }
      onToast(`Ordered ${selectedFood.item}! In-seat delivery to ${berthInfo}.`);
      onClose();
    } catch (err) {
      console.error(err);
      onToast('Order placed locally (login to save in cloud).');
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
            <div className="text-sm font-bold text-white">In-Seat Food Delivery</div>
          </div>
          <button type="button" onClick={onClose} className="text-xs text-zinc-500 hover:text-white">✕</button>
        </div>

        <p className="text-[11px] text-zinc-400">
          FSSAI Grade A+ verified IRCTC station & pantry delivery directly inside coach.
        </p>

        <div className="space-y-2 max-h-48 overflow-y-auto ns">
          {FOOD_MENU.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedFood(item)}
              className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center transition ${
                selectedFood.id === item.id
                  ? 'border-white bg-white/10'
                  : 'border-[#222] bg-black hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-white">{item.item}</div>
                <div className="text-[10px] text-zinc-500">{item.vendor} • {item.halt}</div>
                <div className="text-[9px] text-emerald-400 mt-0.5">{item.fssai}</div>
              </div>
              <div className="text-xs font-bold font-mono text-white">₹{item.price}</div>
            </div>
          ))}
        </div>

        <div>
          <label className="text-[10px] text-zinc-500 block mb-1">Your Coach & Berth</label>
          <input
            type="text"
            value={berthInfo}
            onChange={(e) => setBerthInfo(e.target.value)}
            className="w-full bg-black border border-[#222] rounded-lg px-3 py-2 text-xs outline-none text-white font-mono"
            placeholder="Coach B3, Berth 21"
          />
        </div>

        <button
          type="button"
          onClick={handleOrder}
          disabled={isSubmitting}
          className="w-full py-3 bg-white text-black font-bold rounded-xl text-xs active:scale-[.98] transition disabled:opacity-50"
        >
          {isSubmitting ? 'Placing Order in Firestore...' : `Confirm Order · Pay ₹${selectedFood.price} on Delivery`}
        </button>
      </div>
    </div>
  );
}
