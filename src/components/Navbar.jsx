import React from 'react';
import {
  Train,
  Compass,
  UtensilsCrossed,
  Wifi,
  MapPin,
  Camera,
  MessageSquare,
  LogOut,
  Phone,
  ShieldCheck,
  Award
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  user,
  userProfile,
  onOpenLogin,
  onLogout
}) {
  const tabs = [
    { id: 'plan', label: 'Plan & Execute', icon: Compass },
    { id: 'track', label: 'Live Train Tracker', icon: Train },
    { id: 'food', label: 'Hygiene Food Order', icon: UtensilsCrossed },
    { id: 'data', label: 'Train Data Boost', icon: Wifi },
    { id: 'guide', label: 'PF & Door Guide', icon: MapPin },
    { id: 'memories', label: 'Journey Memories', icon: Camera },
    { id: 'chat', label: 'Commuter Live Chat', icon: MessageSquare }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('plan')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-bold">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white">Rail<span className="text-amber-500">X</span></span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  AI Journey Executor
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Door-to-door for Indian Railways travelers</p>
            </div>
          </div>

          {/* User profile / Auth status */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Frequent Traveler Badge */}
                <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-semibold text-amber-400">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{userProfile?.frequentTier || 'Platinum'} Commuter (12+ trips/yr)</span>
                </div>

                {/* Phone Profile Pill */}
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-medium text-slate-200">
                    {user.phoneNumber || userProfile?.phone || '+91 98765 43210'}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="Firebase Phone Verified" />
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-xl transition"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/25 transition active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Phone Login / OTP</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2.5 border-t border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
