import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Users,
  ShieldCheck,
  Sparkles,
  Train,
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_CHATS } from '../data/mockData';
import { sendChatMessage, subscribeToChatChannel } from '../services/firestoreService';

export default function LiveCommuterChat({ user, onRequireAuth, userProfile }) {
  const [channel, setChannel] = useState('12951');
  const [chatMessages, setChatMessages] = useState(SAMPLE_CHATS);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Subscribe to Firestore live chat channel updates
    const unsubscribe = subscribeToChatChannel(channel, (remoteMessages) => {
      if (remoteMessages.length > 0) {
        setChatMessages(remoteMessages);
      }
    });

    return () => unsubscribe();
  }, [channel]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }

    if (!inputText.trim()) return;

    setIsSending(true);
    const senderName = userProfile?.displayName || user.phoneNumber || 'Passenger';

    try {
      await sendChatMessage(user.uid, {
        channel,
        senderName: `${senderName} (Coach B3)`,
        text: inputText.trim()
      });
      setInputText('');
    } catch (err) {
      console.error('Chat send error:', err);
      // Fallback local append for immediate responsive feel
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          senderName: `${senderName} (Coach B3)`,
          text: inputText.trim(),
          time: 'Just now',
          trainNumber: channel
        }
      ]);
      setInputText('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 glass-panel p-6 rounded-3xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>Live Commuter Community Channel</span>
            </h2>
            <p className="text-xs text-slate-400">Realtime passenger chatter • Powered by Firestore live sync</p>
          </div>
        </div>

        {/* Channel Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Channel:</span>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
          >
            <option value="12951">Train 12951 (Mumbai Rajdhani)</option>
            <option value="90001">Train 90001 (Mumbai Suburban Fast)</option>
            <option value="22436">Train 22436 (Vande Bharat Express)</option>
            <option value="MMCT">Station: Mumbai Central (MMCT)</option>
            <option value="NDLS">Station: New Delhi (NDLS)</option>
          </select>
        </div>
      </div>

      {/* Chat Container */}
      <div className="glass-panel rounded-3xl border border-slate-800 flex flex-col h-[520px] overflow-hidden">
        {/* Chat Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="text-center py-2">
            <span className="px-3 py-1 bg-slate-800/80 rounded-full text-[11px] text-slate-400 border border-slate-700/60">
              🔒 End-to-end community guidelines active. Respect fellow passengers.
            </span>
          </div>

          {chatMessages.map((msg, idx) => {
            const isMe = user && msg.uid === user.uid;
            return (
              <div
                key={msg.id || idx}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-2 mb-1 px-1">
                  <span className="text-[11px] font-bold text-amber-400">{msg.senderName}</span>
                  <span className="text-[10px] text-slate-400">
                    {msg.time || (msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live')}
                  </span>
                </div>
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/70 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Share update for ${channel} (e.g. platform rush, coach water, food review)...`}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={isSending}
            className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
