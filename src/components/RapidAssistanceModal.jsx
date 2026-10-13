import React, { useEffect, useState } from 'react';

const CATEGORIES = [
  { id: 'safety', emoji: '🛡️', label: 'RPF', slaMinutes: 5 },
  { id: 'maintenance', emoji: '🔧', label: 'Fix', slaMinutes: 30 },
  { id: 'cleaning', emoji: '🧹', label: 'Clean', slaMinutes: 30 },
  { id: 'food', emoji: '🍱', label: 'Food', slaMinutes: 20 },
  { id: 'cab', emoji: '🚕', label: 'Cab', detail: 'Rapido / Uber / Ola', slaMinutes: 15 }
];
const FEEDBACK = ['😡', '😕', '😐', '🙂', '🤩'];
const STATUSES = ['Open', 'In progress', 'Escalated', 'Resolved'];

function formatRemaining(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export function TicketCard({ ticket, onAdvance }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const statusIndex = STATUSES.indexOf(ticket.status);
  return (
    <div className="ticket-card rounded-xl border border-[#D4AF37]/40 bg-black p-3 text-xs">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-white">{ticket.emoji} {ticket.id}</span>
        <span className="rounded-full border border-[#D4AF37]/40 px-2 py-1 text-[9px] font-bold text-[#D4AF37]">{ticket.status}</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#D4AF37]/10 px-2 py-1 font-mono text-[10px] text-[#D4AF37]">⏱ {formatRemaining(ticket.dueAt - now)}</span>
        {statusIndex >= 0 && statusIndex < STATUSES.length - 1 && (
          <button type="button" onClick={() => onAdvance(ticket.id, STATUSES[statusIndex + 1])} className="rounded-lg border border-[#333] px-2 py-1 text-[10px] font-bold text-white" aria-label={`Mark ${STATUSES[statusIndex + 1]}`}>
            {STATUSES[statusIndex + 1]}
          </button>
        )}
      </div>
    </div>
  );
}

export default function RapidAssistanceModal({
  isOpen,
  onClose,
  onToast,
  initialTab = 'categories',
  tickets = [],
  onCreateTicket,
  onAdvanceTicket
}) {
  const [view, setView] = useState('categories');
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const [createdTicket, setCreatedTicket] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const mapped =
        initialTab === 'sos' || initialTab === 'support'
          ? 'support'
          : initialTab === 'tickets'
            ? 'tickets'
            : 'categories';
      setView(mapped);
      setCreatedTicket(null);
      setCategory(null);
      setRating(0);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const createTicket = () => {
    if (!category || !rating) return;
    const now = Date.now();
    const ticket = {
      id: `RX-${now.toString(36).toUpperCase()}`,
      emoji: category.emoji,
      category: category.label,
      rating,
      status: 'Open',
      createdAt: now,
      dueAt: now + category.slaMinutes * 60 * 1000
    };
    onCreateTicket?.(ticket);
    setCreatedTicket(ticket);
    setView('success');
    onToast?.(`Ticket ${ticket.id} · ⏱ ${category.slaMinutes}m`);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/95 animate-in fade-in">
      <div className="max-h-[80vh] space-y-4 overflow-y-auto rounded-t-3xl border-t border-[#333] bg-[#080808] p-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setView('categories')} className={`rounded-lg border px-2 py-1 text-[10px] font-bold ${view === 'categories' || view === 'feedback' || view === 'success' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333] text-zinc-400'}`}>🆘 Help</button>
            <button type="button" onClick={() => setView('support')} className={`rounded-lg border px-2 py-1 text-[10px] font-bold ${view === 'support' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333] text-zinc-400'}`}>📞 139</button>
            <button type="button" onClick={() => setView('tickets')} className={`rounded-lg border px-2 py-1 text-[10px] font-bold ${view === 'tickets' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#333] text-zinc-400'}`}>📋 Tickets</button>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="px-3 py-1 text-xl text-zinc-400">×</button>
        </div>
        <p className="text-center text-[10px] text-zinc-400">No auto-dispatch · we route your issue</p>

        {view === 'categories' && (
          <div className="grid grid-cols-5 gap-2">
            {CATEGORIES.map((item) => (
              <button key={item.id} type="button" aria-label={item.detail ? `${item.label} · ${item.detail}` : item.label} onClick={() => { setCategory(item); setRating(0); setView('feedback'); }} className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border border-[#333] bg-black text-2xl hover:border-[#D4AF37]">
                <span>{item.emoji}</span>
                <span className="text-[9px] font-bold text-zinc-400">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {view === 'feedback' && category && (
          <section className="space-y-4 rounded-2xl border border-[#222] bg-black p-4">
            <div className="text-center text-3xl" aria-label={category.label}>{category.emoji}</div>
            <div className="flex justify-center gap-2" role="group" aria-label="Feedback">
              {FEEDBACK.map((emoji, index) => (
                <button key={emoji} type="button" aria-label={`Feedback ${index + 1} of 5`} aria-pressed={rating === index + 1} onClick={() => setRating(index + 1)} className={`rounded-xl p-1 text-3xl ${rating === index + 1 ? 'bg-[#D4AF37]/20' : 'opacity-60'}`}>{emoji}</button>
              ))}
            </div>
            <button type="button" disabled={!rating} onClick={createTicket} className="w-full rounded-xl bg-white py-3 text-sm font-extrabold text-black disabled:opacity-40">Submit</button>
          </section>
        )}

        {view === 'success' && createdTicket && (
          <section className="ticket-success space-y-3 rounded-2xl border border-[#D4AF37]/50 bg-black p-4 text-center">
            <div className="text-3xl">✅</div>
            <div className="text-xs font-bold text-white">{createdTicket.emoji} {createdTicket.id}</div>
            <span className="inline-flex rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold text-[#D4AF37]">⏱ {formatRemaining(createdTicket.dueAt - Date.now())}</span>
            <button type="button" onClick={onClose} className="block w-full rounded-xl border border-[#333] py-2 text-xs font-bold text-white">Done</button>
          </section>
        )}

        {view === 'support' && (
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:139" aria-label="Call 139" className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-[#D4AF37] bg-black text-3xl text-[#D4AF37]">📞<span className="text-[10px] font-bold">139</span></a>
            <a href="https://railmadad.indianrailways.gov.in/" target="_blank" rel="noreferrer" aria-label="RailMadad" className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl border border-white bg-black text-3xl text-white">🛟<span className="text-[10px] font-bold">RailMadad</span></a>
          </div>
        )}

        {view === 'tickets' && (
          <section className="space-y-2">
            {tickets.length === 0
              ? <p className="py-6 text-center text-2xl" aria-label="No tickets">📭</p>
              : [...tickets].reverse().map((ticket) => <TicketCard key={ticket.id} ticket={ticket} onAdvance={onAdvanceTicket} />)}
          </section>
        )}
      </div>
    </div>
  );
}
