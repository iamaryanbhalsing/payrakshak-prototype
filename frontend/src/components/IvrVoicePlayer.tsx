import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, PhoneCall, PhoneOff, MessageSquare, Send, CheckCircle2, X } from 'lucide-react';
import { AnalysisResult } from '../types';
import { soundService } from '../services/audio';
import { LANGUAGES } from './Header';

interface IvrVoicePlayerProps {
  isOpen: boolean;
  onClose: () => void;
  result?: AnalysisResult;
  selectedLang: string;
  onLangChange: (lang: string) => void;
  seniorMode: boolean;
}

export const IvrVoicePlayer: React.FC<IvrVoicePlayerProps> = ({
  isOpen,
  onClose,
  result,
  selectedLang,
  onLangChange,
  seniorMode
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'call' | 'sms'>('call');
  const [callDuration, setCallDuration] = useState(0);
  const [smsSent, setSmsSent] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState('+91 98765 43210');
  const timerRef = useRef<any>(null);

  const localized = result?.multilingualAlerts[selectedLang] || result?.multilingualAlerts['en'];
  const speechText = localized?.ivrSpeechScript || 'PayRakshak Emergency Alert: Please do not enter your UPI PIN. This is a scam!';

  // SpeechSynthesis handler
  const speakVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    
    // Set appropriate language tag
    const langMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      mr: 'mr-IN',
      gu: 'gu-IN'
    };
    utterance.lang = langMap[selectedLang] || 'hi-IN';
    utterance.rate = seniorMode ? 0.85 : 0.95; // Slower rate for senior citizens
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsPlaying(true);
      if (result?.riskLevel === 'CRITICAL' || result?.riskLevel === 'HIGH') {
        soundService.playDangerAlarm();
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isOpen) {
      setCallDuration(0);
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      speakVoice();
    } else {
      stopVoice();
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopVoice();
    };
  }, [isOpen, selectedLang]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Multilingual IVR Voice & SMS Alert Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Senior citizen & feature-phone friendly voice guidance in 8 regional languages.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopVoice();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch: Simulated Call vs SMS */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-slate-950/70 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('call')}
            className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'call'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Interactive Voice Call (IVR)</span>
          </button>
          <button
            onClick={() => setActiveTab('sms')}
            className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'sms'
                ? 'bg-sky-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Regional SMS Template</span>
          </button>
        </div>

        {/* Language selector in modal */}
        <div className="mb-6 flex items-center justify-between bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-300">
            Voice Alert Language:
          </span>
          <select
            value={selectedLang}
            onChange={(e) => onLangChange(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-medium focus:ring-2 focus:ring-sky-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* TAB 1: Voice Call Simulation */}
        {activeTab === 'call' && (
          <div className="space-y-6">
            
            {/* Call Screen Simulation */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-4 shadow-inner">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                <PhoneCall className={`w-8 h-8 ${isPlaying ? 'animate-pulse' : ''}`} />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">
                  PayRakshak Emergency Voice Line
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  1800-RAKSHAK (Toll Free)
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Duration: {formatTime(callDuration)} • {isPlaying ? 'Speaking...' : 'Paused'}
                </span>
              </div>

              {/* Animated Waveform */}
              <div className="flex items-center justify-center space-x-1.5 h-10 py-2">
                {[40, 70, 90, 60, 30, 80, 100, 50, 75, 45, 95, 60, 30].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isPlaying ? 'bg-sky-400' : 'bg-slate-700'
                    }`}
                    style={{ height: isPlaying ? `${h}%` : '20%' }}
                  ></div>
                ))}
              </div>

              {/* Transcript box */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Audio Speech Transcript:
                </span>
                <p className={`text-slate-200 leading-relaxed font-medium ${seniorMode ? 'text-base' : 'text-xs'}`}>
                  "{speechText}"
                </p>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center space-x-4 pt-2">
                {isPlaying ? (
                  <button
                    onClick={stopVoice}
                    className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 shadow-md transition-all"
                    title="Pause"
                  >
                    <Pause className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    onClick={speakVoice}
                    className="p-4 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
                    title="Play"
                  >
                    <Play className="w-6 h-6 ml-0.5" />
                  </button>
                )}
                
                <button
                  onClick={() => {
                    stopVoice();
                    speakVoice();
                  }}
                  className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 shadow-md transition-all"
                  title="Replay from start"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Interactive IVR Keypad Prompts */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-300 block mb-2">Simulated Interactive Keypad Actions:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={speakVoice}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-left transition-all"
                >
                  <span className="font-mono font-bold text-sky-400 mr-1.5">[1]</span>
                  <span className="text-slate-300">Repeat Alert</span>
                </button>
                <button
                  onClick={() => {
                    alert('🚨 Rakshak Family Alert Triggered! SMS sent to registered guardian.');
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-left transition-all"
                >
                  <span className="font-mono font-bold text-amber-400 mr-1.5">[2]</span>
                  <span className="text-slate-300">Alert Family</span>
                </button>
                <button
                  onClick={() => {
                    window.open('tel:1930');
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500 text-left transition-all"
                >
                  <span className="font-mono font-bold text-rose-400 mr-1.5">[3]</span>
                  <span className="text-slate-300">Call 1930</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Regional SMS Template */}
        {activeTab === 'sms' && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Offline Feature Phone SMS Payload:
              </span>
              
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                {localized?.smsAlertTemplate || 'PAYRAKSHAK: Scam detected. Do not enter PIN!'}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="Enter recipient mobile number"
                  className="w-full sm:flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100"
                />
                <button
                  onClick={() => {
                    setSmsSent(true);
                    setTimeout(() => setSmsSent(false), 3000);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-slate-950 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{smsSent ? 'SMS Sent!' : 'Simulate SMS Dispatch'}</span>
                </button>
              </div>

              {smsSent && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SMS alert successfully dispatched to {recipientPhone} in {localized?.language || 'Selected Language'}.</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};