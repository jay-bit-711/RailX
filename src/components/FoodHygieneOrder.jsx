import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  HeartHandshake,
  AlertCircle
} from 'lucide-react';
import { FOOD_ITEMS } from '../data/mockData';
import { createFoodOrder, getUserFoodOrders, submitHygieneReview } from '../services/firestoreService';

export default function FoodHygieneOrder({ user, onRequireAuth }) {
  const [cart, setCart] = useState([]);
  const [coachBerth, setCoachBerth] = useState('B3 / Berth 21');
  const [selectedStation, setSelectedStation] = useState('Ratlam Jn');
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [pastOrders, setPastOrders] = useState([]);
  const [activeFeedbackOrderId, setActiveFeedbackOrderId] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewNote, setReviewNote] = useState('');

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;
    const orders = await getUserFoodOrders(user.uid);
    setPastOrders(orders);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      onRequireAuth();
      return;
    }

    if (cart.length === 0) return;

    setIsOrdering(true);
    setOrderSuccess(null);

    try {
      const orderPayload = {
        trainNumber: "12951",
        station: selectedStation,
        vendorName: cart[0].vendor,
        items: cart.map((i) => `${i.item} x${i.qty} (₹${i.price * i.qty})`),
        totalAmount: cartTotal,
        hygieneRating: 5,
        hygieneReview: "Verified FSSAI sealed food package delivered"
      };

      const newId = await createFoodOrder(user.uid, orderPayload);
      setCart([]);
      setOrderSuccess(`Order #${newId.slice(0, 6)} confirmed! Hot food will be delivered at ${selectedStation} to ${coachBerth}.`);
      await loadOrders();
    } catch (err) {
      console.error('Order error:', err);
    } finally {
      setIsOrdering(false);
    }
  };

  const handleSubmitFeedback = async (orderId) => {
    try {
      await submitHygieneReview(orderId, rating, reviewNote || "Hygienic, sealed meal.");
      setActiveFeedbackOrderId(null);
      setReviewNote('');
      await loadOrders();
    } catch (err) {
      console.error('Feedback error:', err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hygiene Guarantee Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>RailX Food & Pantry Hygiene Assurance</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                FSSAI Certified
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Tamper-proof sanitized packaging, temperature-tested dispatches, and in-seat verified berth delivery.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Delivery Station:{' '}
          <select
            value={selectedStation}
            onChange={(e) => setSelectedStation(e.target.value)}
            className="ml-1 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white font-semibold"
          >
            <option value="Ratlam Jn">Ratlam Jn (Next Halt)</option>
            <option value="Kota Jn">Kota Jn</option>
            <option value="Vadodara Jn">Vadodara Jn</option>
            <option value="Kanpur Central">Kanpur Central</option>
          </select>
        </div>
      </div>

      {orderSuccess && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{orderSuccess}</span>
        </div>
      )}

      {/* Grid: Menu & Cart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Items */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span>Available Partner Outlets & Pantry Delicacies</span>
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {FOOD_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {item.vendor}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">📍 {item.station}</span>
                    </div>
                    <h4 className="font-bold text-white text-base mt-1">{item.item}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-white font-mono">₹{item.price}</span>
                    <div className="text-[10px] text-emerald-400 font-semibold flex items-center justify-end space-x-1">
                      <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                      <span>{item.fssaiScore}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400">{item.desc}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-[11px] text-amber-400 font-medium flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.hygieneCert}</span>
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl transition active:scale-95 text-xs shadow-md shadow-amber-500/20"
                  >
                    + Add to Berth Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In-Seat Delivery Cart */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Truck className="w-5 h-5 text-amber-400" />
              <span>In-Seat Delivery Details</span>
            </h3>

            {/* Coach & Berth Auto-fill */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Coach & Seat / Berth Number</label>
              <input
                type="text"
                value={coachBerth}
                onChange={(e) => setCoachBerth(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                placeholder="e.g. Coach B3, Berth 21"
              />
              <span className="text-[10px] text-slate-400">IRCTC delivery partner brings meal inside coach</span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-2 border-t border-slate-800 pt-4">
              <div className="text-xs font-bold text-slate-300">Selected Items ({cart.length})</div>
              {cart.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">No items added to berth order yet.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs bg-slate-850 p-2.5 rounded-xl">
                      <div>
                        <div className="font-semibold text-white">{item.item}</div>
                        <div className="text-slate-400 text-[10px]">₹{item.price} each</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-5 h-5 rounded bg-slate-750 text-white font-bold flex items-center justify-center hover:bg-slate-700"
                        >
                          -
                        </button>
                        <span className="font-bold text-white font-mono">{item.qty}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-5 h-5 rounded bg-slate-750 text-white font-bold flex items-center justify-center hover:bg-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Summary */}
            {cart.length > 0 && (
              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Item Total</span>
                  <span className="font-mono text-white">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tamper-Proof Sanitized Packaging</span>
                  <span className="text-emerald-400">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-slate-800">
                  <span>Grand Total</span>
                  <span className="font-mono text-amber-400">₹{cartTotal}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isOrdering}
                  className="w-full mt-3 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition active:scale-95 disabled:opacity-50 text-xs"
                >
                  {isOrdering ? 'Placing Order in Firestore...' : 'Place Order & Pay via UPI / Cash'}
                </button>
              </div>
            )}
          </div>

          {/* Past Orders & Hygiene Review Form */}
          {user && pastOrders.length > 0 && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <span>Rate Food Hygiene (My Orders)</span>
              </h4>

              <div className="space-y-3">
                {pastOrders.slice(0, 3).map((ord) => (
                  <div key={ord.id} className="p-3 bg-slate-850 rounded-2xl text-xs space-y-2 border border-slate-800">
                    <div className="flex justify-between font-semibold text-white">
                      <span>{ord.vendorName}</span>
                      <span className="text-amber-400 font-mono">₹{ord.totalAmount}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Halt: {ord.station} • Status: <span className="text-emerald-400 font-semibold">{ord.status}</span>
                    </div>

                    {activeFeedbackOrderId === ord.id ? (
                      <div className="pt-2 space-y-2 border-t border-slate-800">
                        <label className="block text-[11px] text-slate-300 font-semibold">Hygiene Score</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className={`p-1 rounded ${rating >= star ? 'text-amber-400' : 'text-slate-600'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={reviewNote}
                          onChange={(e) => setReviewNote(e.target.value)}
                          placeholder="Feedback on packaging & taste..."
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                        />
                        <button
                          onClick={() => handleSubmitFeedback(ord.id)}
                          className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs"
                        >
                          Submit Hygiene Audit
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveFeedbackOrderId(ord.id)}
                        className="text-[11px] text-amber-400 hover:underline pt-1"
                      >
                        ✍️ Give Hygiene Feedback ({ord.hygieneRating}★ currently)
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
