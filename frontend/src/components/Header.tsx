import React from 'react';
import { 
  Shield, 
  ShieldAlert, 
  Languages, 
  Eye, 
  Activity, 
  HeartHandshake, 
  Smartphone, 
  BarChart3, 
  Lock, 
  GraduationCap, 
  AlertOctagon, 
  Search, 
  CheckCircle2 
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
  seniorMode: boolean;
  setSeniorMode: (mode: boolean) => void;
  serverOnline: boolean;
}

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' }
];

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedLang,
  setSelectedLang,
  seniorMode,
  setSeniorMode,
  serverOnline
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#080d1a]/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      
      {/* Top National Advisory Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800/50 py-1.5 px-4 sm:px-8 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>National Cyber Crime Helpline: <strong className="text-white font-mono font-bold">1930</strong></span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-400">Official Portal: <span className="text-slate-300 font-medium">cybercrime.gov.in</span></span>
        </div>

        <div className="flex items-center space-x-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            NPCI Spec 2.0 Compliant
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Zero Banking Data Retention
          </span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => setCurrentTab('scanner')}>
            <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg relative group">
              <Shield className="w-6 h-6 text-sky-400 transition-transform group-hover:scale-105" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  PAYRAKSHAK
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  SHIELD 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Smart Advisory Defense Against UPI Scams & Financial Fraud
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Senior Citizen Accessibility Toggle */}
            <button
              onClick={() => setSeniorMode(!seniorMode)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                seniorMode 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm' 
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border-slate-800'
              }`}
              title="Toggle Large Typography & High-Contrast Mode"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">
                {seniorMode ? 'Senior Mode: ON' : 'Senior Accessibility'}
              </span>
            </button>

            {/* Language Dropdown */}
            <div className="relative flex items-center">
              <Languages className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="pl-8 pr-7 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-slate-900 text-slate-200">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Live Engine Status */}
            <div className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border ${
              serverOnline 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${serverOnline ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></div>
              <span className="hidden md:inline">{serverOnline ? 'Engine Active' : 'Offline'}</span>
            </div>

          </div>
        </div>

        {/* Crisp Navigation Bar */}
        <nav className="flex space-x-1 overflow-x-auto pb-3 pt-0.5 scrollbar-none text-xs font-medium border-t border-slate-800/40">
          {[
            { id: 'scanner', label: 'Risk Scanner Terminal', icon: Search },
            { id: 'companion', label: 'UPI Overlay Simulator', icon: Smartphone },
            { id: 'sandbox', label: 'Threat Intel Bank (12)', icon: Activity },
            { id: 'emergency', label: 'Golden Hour 1930 Incident Desk', icon: AlertOctagon },
            { id: 'quiz', label: 'Cyber Literacy Assessment', icon: GraduationCap },
            { id: 'rakshak_circle', label: 'Guardian Protection Circle', icon: HeartHandshake },
            { id: 'benchmark', label: 'PRD Compliance Audit', icon: BarChart3 },
            { id: 'privacy', label: 'Privacy Vault & Logs', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-400 border-sky-500/40 font-bold'
                    : 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900 border-transparent'
                } ${seniorMode ? 'text-sm font-semibold' : ''}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};