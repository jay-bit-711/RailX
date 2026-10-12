import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Zap,
  Phone,
  CheckCircle,
  CreditCard,
  History,
  ShieldCheck,
  Signal
} from 'lucide-react';
import { DATA_PACKS } from '../data/mockData';
import { createDataRecharge, getUserDataRecharges } from '../services/firestoreService';

export default function DataRecharge({ user, onRequireAuth }) {
  const [selectedOperator, setSelectedOperator] = useState('Jio');
  const [rechargePhone, setRechargePhone] = useState(user?.phoneNumber || '+919876543210');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [rechargeHistory, setRechargeHistory] = useState([]);

  useEffect(() => {
    if (user) {
      if (user.phoneNumber) setRechargePhone(user.phoneNumber);
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;
    const items = await getUserDataRecharges(user.uid);
    setRechargeHistory(items);
  };

  const handleRechargePack = async (pack) => {
    if (!user) {
      onRequireAuth();
      return;
    }

    setIsProcessing(true);
    setStatusMessage(null);

    try {
      await createDataRecharge(user.uid, {
        phone: rechargePhone,
        operator: selectedOperator,
        packName: pack.name,
        dataAmount: pack.data,
        amount: pack.price
      });

      setStatusMessage(`⚡ ₹${pack.price} Data Booster activated on ${rechargePhone}! ${pack.data} credited instantly for train streaming.`);
      await loadHistory();
    } catch (err) {
      console.error('Recharge error:', err);
      setStatusMessage('Recharge failed: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredPacks = DATA_PACKS.filter((p) => p.operator === selectedOperator);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Wifi className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Instant In-Train 4G/5G Data Booster</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold">
                Instant Top-up
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Never get disconnected during long train journeys. Recharge high-speed booster packs in seconds.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <Signal className="w-4 h-4" />
          <span>High-Speed Railway Tower Handover</span>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Operator & Phone Selector */}
      <div className="glass-panel p-6 rounded-3xl space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Mobile Operator</label>
            <div className="grid grid-cols-4 gap-2">
              {['Jio', 'Airtel', 'Vi', 'BSNL'].map((op) => (
                <button
                  key={op}
                  onClick={() => setSelectedOperator(op)}
                  className={`py-2 rounded-xl text-xs font-bold transition border ${
                    selectedOperator === op
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Number to Recharge</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={rechargePhone}
                onChange={(e) => setRechargePhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Available Data Packs Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Popular Railway Travel Data Add-ons ({selectedOperator})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPacks.map((pack) => (
            <div
              key={pack.id}
              className={`p-5 rounded-2xl bg-slate-900/80 border transition flex flex-col justify-between ${
                pack.popular ? 'border-amber-500/50 shadow-lg shadow-amber-500/10' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                      {pack.validity}
                    </span>
                    <h4 className="font-bold text-white text-base mt-2">{pack.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-400 font-mono">₹{pack.price}</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-emerald-400 mt-2 font-mono">{pack.data}</div>
                <p className="text-xs text-slate-400 mt-1">{pack.benefit}</p>
              </div>

              <button
                onClick={() => handleRechargePack(pack)}
                disabled={isProcessing}
                className="mt-5 w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-500/20 transition active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? 'Activating via Gateway...' : `Recharge ₹${pack.price} Now`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recharge History from Firestore */}
      {user && rechargeHistory.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <History className="w-4 h-4 text-slate-400" />
            <span>My In-Train Recharges (Stored in Firestore)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {rechargeHistory.map((rec) => (
              <div key={rec.id} className="p-3 bg-slate-850 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{rec.operator} • {rec.dataAmount}</span>
                  <span className="text-emerald-400 font-mono">₹{rec.amount}</span>
                </div>
                <div className="text-[11px] text-slate-400">{rec.packName}</div>
                <div className="text-[10px] text-emerald-400">Status: {rec.status.toUpperCase()} ✓</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
