import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { soundService } from '../services/audio';

interface Question {
  id: number;
  title: string;
  scenarioText: string;
  category: string;
  options: {
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'OLX Marketplace Advance Payment',
    scenarioText: 'A buyer on OLX claims: "I am paying ₹15,000 advance for your furniture. I sent you a QR code on WhatsApp. Please scan it and enter your UPI PIN to accept the money into your account."',
    category: 'Inverted PIN Intent',
    options: [
      {
        label: '❌ Dangerous Scam! Entering PIN will debit ₹15,000 from my account.',
        isCorrect: true,
        explanation: 'Correct! The golden rule of UPI: You NEVER scan a QR code or enter your UPI PIN to RECEIVE money. Entering your PIN always debits funds!'
      },
      {
        label: '✅ Safe. Entering PIN is required to authorize receiving bank transfer.',
        isCorrect: false,
        explanation: 'Incorrect! You NEVER enter a PIN to receive money. UPI transfers to you are automatic and require zero PIN authentication from your side.'
      }
    ]
  },
  {
    id: 2,
    title: 'Electricity Disconnection Panic Alert',
    scenarioText: 'You get an SMS at 7 PM: "Dear Consumer, your electricity power will be disconnected at 9:30 PM tonight because your last bill was unpaid. Call officer Mr. Sharma at 9876543210 immediately."',
    category: 'Urgency & Fear Exploitation',
    options: [
      {
        label: '❌ Panic Scam! Utility boards never disconnect power over arbitrary SMS numbers.',
        isCorrect: true,
        explanation: 'Correct! Official electricity boards send notice weeks in advance and never list personal mobile numbers or threaten instant night disconnection.'
      },
      {
        label: '✅ Genuine Notice. I must call the officer immediately and pay whatever link he gives.',
        isCorrect: false,
        explanation: 'Incorrect! This is one of the most common scams in India. Always check bills exclusively on official utility apps or the Bharat BillPay (BBPS) portal.'
      }
    ]
  },
  {
    id: 3,
    title: 'Customer Care Refund via Remote App',
    scenarioText: 'You had a failed grocery delivery. A caller claiming to be Customer Care says: "To credit your ₹499 refund directly, install AnyDesk / QuickSupport from Play Store and share the 9-digit code."',
    category: 'Remote Screen-Share Trap',
    options: [
      {
        label: '❌ Critical Danger! Installing AnyDesk allows them to watch my screen and steal OTPs.',
        isCorrect: true,
        explanation: 'Correct! Remote desktop apps give attackers complete visibility of your phone screen, allowing them to steal OTPs and view your banking PIN.'
      },
      {
        label: '✅ Helpful Support. It helps customer service configure the refund gateway.',
        isCorrect: false,
        explanation: 'Incorrect! Legitimate customer support NEVER asks you to install remote control software (AnyDesk/TeamViewer/RustDesk) to process refunds.'
      }
    ]
  },
  {
    id: 4,
    title: 'Postal Package Address Rescheduling Link',
    scenarioText: 'An SMS says: "Your India Post parcel is held at the depot due to incomplete address. Update address and pay ₹5 rescheduling fee on http://indiapost-delivery-portal.xyz/update"',
    category: 'Phishing & Micro-Fee Trap',
    options: [
      {
        label: '❌ Phishing Link! The ₹5 payment page is a cloned trap to capture card/UPI credentials.',
        isCorrect: true,
        explanation: 'Correct! Fraudsters use tiny ₹5 fees to lure victims into entering full debit card or netbanking details on fake lookalike domains (.xyz / .online).'
      },
      {
        label: '✅ Safe. It is only ₹5, so there is no risk in trying.',
        isCorrect: false,
        explanation: 'Incorrect! The risk is not the ₹5, but the cloned phishing page that captures your bank credentials, which the scammer then uses to drain your entire balance.'
      }
    ]
  },
  {
    id: 5,
    title: 'Friend Google Pay Dinner Split',
    scenarioText: 'Your friend Rohit sends a Google Pay payment request for ₹350 with the note "Dinner split at Dosa Plaza" and the verified VPA is "rohit.verma@oksbi".',
    category: 'Legitimate Peer Transfer',
    options: [
      {
        label: '✅ Safe Peer Transfer. Known friend, recognized VPA on official SBI handle (@oksbi).',
        isCorrect: true,
        explanation: 'Correct! A direct transfer to a known contact with an official major bank handle (@oksbi, @okhdfcbank, @okaxis, @ybl) for a verified split is legitimate.'
      },
      {
        label: '❌ High Risk Scam. I should report Rohit to 1930.',
        isCorrect: false,
        explanation: 'Incorrect! This is a legitimate peer-to-peer split between friends on an official NPCI bank handle.'
      }
    ]
  }
];

export const ScamAwarenessQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (answered) return;
    setSelectedOption(optIdx);
    setAnswered(true);

    const isCorrect = currentQ.options[optIdx].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      soundService.playSafeChime();
    } else {
      soundService.playWarningBeep();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Can You Spot The UPI Scam? Interactive Awareness Challenge
            </h2>
            <p className="text-xs text-slate-400">
              Test your scam recognition reflexes with 5 real-world Indian payment situations.
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      {!showResult ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6 max-w-3xl mx-auto">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
            <span className="text-sky-400 font-mono">Current Score: {score}</span>
          </div>

          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Body */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {currentQ.category}
              </span>
              <h3 className="text-base font-bold text-white">{currentQ.title}</h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed italic">
              "{currentQ.scenarioText}"
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              let btnStyle = 'bg-slate-950/60 border-slate-800 hover:border-sky-500 text-slate-300';

              if (answered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-200';
                } else {
                  btnStyle = 'opacity-50 border-slate-800 text-slate-500';
                }
              }

              return (
                <div key={optIdx} className="space-y-2">
                  <button
                    disabled={answered}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-start space-x-3 ${btnStyle}`}
                  >
                    <span className="font-mono font-bold text-slate-400">[{optIdx + 1}]</span>
                    <span className="flex-1">{opt.label}</span>
                  </button>

                  {/* Feedback on answer */}
                  {answered && isSelected && (
                    <div className={`p-3.5 rounded-xl text-xs font-medium ${
                      opt.isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                    }`}>
                      {opt.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next Button */}
          {answered && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all flex items-center space-x-2 shadow-lg shadow-sky-500/20"
              >
                <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'View Final Results' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Results Screen */
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-sky-500 mx-auto flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20 animate-bounce">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              CHALLENGE COMPLETED
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              Your Scam Shield Score: {score} / {QUIZ_QUESTIONS.length}
            </h3>
            
            <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
              {score === 5
                ? '🏆 Perfect Score! You are a Certified PayRakshak Master. You can spot inverted PIN traps, panic scams, and fake links instantly.'
                : score >= 3
                ? '🛡️ Great job! You caught most scams, but remember: You NEVER enter your UPI PIN to receive money.'
                : '⚠️ Be careful! Digital scammers exploit urgency and fake buyer traps. Always double check before paying.'}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center space-x-2 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Challenge</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};