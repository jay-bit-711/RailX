import React, { useState, useEffect } from 'react';
import {
  Camera,
  Sparkles,
  Gamepad2,
  Heart,
  Share2,
  BookmarkPlus,
  Trophy,
  CheckCircle2,
  Train,
  Plus
} from 'lucide-react';
import { createJourneyMemory, getUserMemories } from '../services/firestoreService';

export default function JourneyMemories({ user, onRequireAuth }) {
  const [memories, setMemories] = useState([]);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [trainNumber, setTrainNumber] = useState('12951');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  // Travel Quiz Game State for Passenger Entertainment
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const QUIZ_QUESTIONS = [
    {
      q: "Which is the longest railway platform in India and the world?",
      options: ["Gorakhpur Junction", "Hubballi Junction (SSS Hubballi)", "Kollam Junction", "Kharagpur"],
      answer: 1,
      fact: "Hubballi Junction's platform 8 is 1,507 meters long, officially certified by Guinness World Records!"
    },
    {
      q: "What does the 5-digit Indian Railways train number starting with '1' or '2' mean?",
      options: ["Suburban EMU Local", "Long-Distance Superfast / Express", "Holiday Special Train", "Toy Train"],
      answer: 1,
      fact: "Digits starting with 1 or 2 denote regular long-distance Mail/Express or Superfast trains."
    },
    {
      q: "Which train was India's first semi-high speed train manufactured under Make in India?",
      options: ["Rajdhani Express", "Gatimaan Express", "Vande Bharat Express (Train 18)", "Tejas Express"],
      answer: 2,
      fact: "Vande Bharat Express was designed and built at Integral Coach Factory (ICF), Chennai."
    }
  ];

  useEffect(() => {
    if (user) {
      loadMemories();
    }
  }, [user]);

  const loadMemories = async () => {
    if (!user) return;
    const items = await getUserMemories(user.uid);
    setMemories(items);
  };

  const handleSaveMemory = async (e) => {
    e.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }

    if (!title.trim() || !note.trim()) return;

    setIsSaving(true);
    setSuccessMsg(null);

    try {
      await createJourneyMemory(user.uid, {
        title,
        note,
        trainNumber
      });

      setTitle('');
      setNote('');
      setSuccessMsg('✨ Journey memory saved to your personal travelogue in Firestore!');
      await loadMemories();
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Save memory error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAnswerQuiz = (index) => {
    setSelectedAnswer(index);
    if (index === QUIZ_QUESTIONS[currentQuizIndex].answer) {
      setQuizScore((prev) => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Journey Memories & Commuter Lounge</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                12+ Journeys / Year Club
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Preserve travel moments, chai conversations, and play Indian Railways Trivia while traveling.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-xs text-purple-300 font-bold">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Commuter Quiz Score: {quizScore} pts</span>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid: Save Memory Form & Commuter Play Lounge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Travelogue Memory Creator */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center space-x-2">
            <BookmarkPlus className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Capture a Journey Memory</h3>
          </div>

          <form onSubmit={handleSaveMemory} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Memory Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sunset view while crossing Chambal river bridge"
                className="w-full px-3.5 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Train Number</label>
                <input
                  type="text"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                  placeholder="e.g. 12951"
                  className="w-full px-3.5 py-2 bg-slate-850 border border-slate-750 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <div className="px-3.5 py-2 bg-slate-850 border border-slate-750 rounded-xl text-xs text-slate-400">
                  Scenic Landmark / Chai Stop
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Travel Story / Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Write about the conversation with fellow passengers, spicy mirchi pakoras at platform 2, or the gentle rocking of the train..."
                className="w-full px-3.5 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-purple-500/20 transition active:scale-95 disabled:opacity-50"
            >
              {isSaving ? 'Preserving in Firestore...' : 'Save Memory in Personal Travelogue'}
            </button>
          </form>

          {/* Saved Memories List */}
          {user && memories.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                My Travel Memories ({memories.length})
              </h4>
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {memories.map((mem) => (
                  <div key={mem.id} className="p-3.5 bg-slate-850 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-white">
                      <span>{mem.title}</span>
                      <span className="font-mono text-amber-400 text-[10px]">Train #{mem.trainNumber}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{mem.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: In-Train Game & Quiz Lounge */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Play & Pass Time: Railways Quiz</h3>
          </div>

          <div className="p-5 rounded-2xl bg-slate-850 border border-slate-750 space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Question {currentQuizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-emerald-400 font-semibold">+10 pts for correct answer</span>
            </div>

            <p className="font-bold text-sm text-white leading-relaxed">
              {QUIZ_QUESTIONS[currentQuizIndex].q}
            </p>

            <div className="space-y-2">
              {QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === QUIZ_QUESTIONS[currentQuizIndex].answer;

                let btnStyle = "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750";
                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-red-500/20 border-red-500/50 text-red-300";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => selectedAnswer === null && handleAnswerQuiz(idx)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2 animate-in fade-in">
                <div className="text-amber-400 font-bold">💡 Did you know?</div>
                <p className="text-slate-300">{QUIZ_QUESTIONS[currentQuizIndex].fact}</p>
                <button
                  onClick={handleNextQuestion}
                  className="w-full mt-2 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition"
                >
                  Next Railways Trivia Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
