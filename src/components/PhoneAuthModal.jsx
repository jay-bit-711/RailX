import React, { useState } from 'react';
import {
  X,
  Phone,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { sendPhoneOtp, verifyPhoneOtp, demoPassengerSignIn } from '../services/authService';

export default function PhoneAuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    // Clean phone number
    const trimmed = phoneNumber.trim();
    const formatted = trimmed.startsWith('+') ? trimmed : `+91${trimmed.replace(/^0+/, '')}`;

    if (formatted.length < 12) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    const res = await sendPhoneOtp(formatted, 'recaptcha-container');
    setLoading(false);

    if (res.success) {
      setStep('otp');
      setInfo(`6-digit OTP sent via SMS to ${formatted}.`);
    } else {
      const msg = res.error?.message || 'Failed to send OTP.';
      if (msg.includes('auth/operation-not-allowed')) {
        setError('Phone Authentication is not enabled in Firebase Console yet. You can use the Quick Demo Login below or enable Phone Auth in Console.');
      } else if (msg.includes('auth/invalid-app-credential') || msg.includes('reCAPTCHA')) {
        setError('reCAPTCHA verification pending or domain not authorized. You can test immediately using Quick Demo Login.');
      } else {
        setError(msg);
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);

    if (otpCode.length < 6) {
      setError('Please enter the 6-digit OTP received on SMS.');
      return;
    }

    setLoading(true);
    const res = await verifyPhoneOtp(otpCode);
    setLoading(false);

    if (res.success) {
      onAuthSuccess(res.user);
      onClose();
    } else {
      setError(res.error?.message || 'Invalid or expired OTP. Please try again.');
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    setError(null);
    const res = await demoPassengerSignIn('+919876543210', 'Rajesh Kumar (Frequent Commuter)');
    setLoading(false);
    if (res.success) {
      onAuthSuccess(res.user);
      onClose();
    } else {
      setError(res.error?.message || 'Demo sign in failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Passenger Phone Login</h3>
            <p className="text-xs text-slate-400">Firebase Authentication • Project railx-48e91</p>
          </div>
        </div>

        {/* reCAPTCHA Invisible/Normal DOM container */}
        <div id="recaptcha-container" className="my-2 flex justify-center"></div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-3 text-red-300 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        {info && (
          <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start space-x-3 text-emerald-300 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>{info}</div>
          </div>
        )}

        {/* Step 1: Phone input */}
        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Indian Railways Commuter Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-mono text-sm">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-20 pr-4 py-3 bg-slate-800/90 border border-slate-750 rounded-2xl text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  required
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
                <span>Instant OTP via Firebase Phone Auth for tickets, orders & data</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending SMS OTP...</span>
                </>
              ) : (
                <>
                  <span>Send OTP via SMS</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Step 2: OTP input */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Enter 6-Digit Verification Code (OTP)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white font-mono text-center tracking-[0.3em] text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify OTP & Sign In</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setOtpCode('');
                setError(null);
              }}
              className="w-full text-center text-xs text-slate-400 hover:text-amber-400 transition pt-1"
            >
              Change mobile number
            </button>
          </form>
        )}

        {/* Divider & Fast Test Option */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
            <span className="bg-slate-900 px-3 text-slate-400">or instant test passenger</span>
          </div>
        </div>

        {/* Demo Fast Access Button */}
        <button
          onClick={handleDemoSignIn}
          disabled={loading}
          className="w-full flex items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl transition group"
        >
          <div className="flex items-center space-x-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-400 transition">
                1-Click Frequent Commuter Test Login
              </div>
              <div className="text-[11px] text-slate-400">
                +91 98765 43210 • Platinum Tier (14 journeys/yr)
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transform group-hover:translate-x-0.5 transition" />
        </button>

        <p className="mt-4 text-center text-[10px] text-slate-400">
          Secured by Google Firebase Auth • Session stored securely in Firestore
        </p>
      </div>
    </div>
  );
}
