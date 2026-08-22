import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuickScanner } from './components/QuickScanner';
import { RiskVerdictCard } from './components/RiskVerdictCard';
import { ShieldOverlayModal } from './components/ShieldOverlayModal';
import { IvrVoicePlayer } from './components/IvrVoicePlayer';
import { ScenarioSandbox } from './components/ScenarioSandbox';
import { RakshakCircle } from './components/RakshakCircle';
import { CybercrimeReportModal } from './components/CybercrimeReportModal';
import { BenchmarkDashboard } from './components/BenchmarkDashboard';
import { PrivacyVault } from './components/PrivacyVault';
import { EmergencyPanicLock } from './components/EmergencyPanicLock';
import { ScamAwarenessQuiz } from './components/ScamAwarenessQuiz';
import { AnalysisResult, ScenarioItem } from './types';
import { analyzeInput } from './services/api';
import { Shield, Sparkles, AlertTriangle, ExternalLink, HeartHandshake } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('scanner');
  const [selectedLang, setSelectedLang] = useState<string>('hi');
  const [seniorMode, setSeniorMode] = useState<boolean>(false);
  const [serverOnline, setServerOnline] = useState<boolean>(true);
  
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  
  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isIvrPlayerOpen, setIsIvrPlayerOpen] = useState(false);
  const [isCompanionModalOpen, setIsCompanionModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('payrakshak_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    // Health check
    fetch('/api/health')
      .then((res) => res.json())
      .then(() => setServerOnline(true))
      .catch(() => setServerOnline(false));

    // Pre-load default introductory demo
    analyzeInput(
      'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous bill was unpaid. Call officer Mr. Sharma at 9876543210 immediately.',
      'text'
    ).then((res) => {
      setAnalysisResult(res);
    }).catch((err) => {
      console.warn('Initial load notice:', err);
    });
  }, []);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    const updated = [result, ...history.slice(0, 49)];
    setHistory(updated);
    localStorage.setItem('payrakshak_history', JSON.stringify(updated));
    setCurrentTab('scanner');
  };

  const handleSelectScenario = async (scenario: ScenarioItem) => {
    try {
      const result = await analyzeInput(scenario.rawInput, scenario.inputType);
      handleAnalysisComplete(result);
      setCurrentTab('scanner');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('payrakshak_history');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        seniorMode={seniorMode}
        setSeniorMode={setSeniorMode}
        serverOnline={serverOnline}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Tab 1: Scanner & Active Verdict */}
        {currentTab === 'scanner' && (
          <div className="space-y-8">
            <QuickScanner
              onAnalysisComplete={handleAnalysisComplete}
              seniorMode={seniorMode}
              selectedLang={selectedLang}
            />

            {analysisResult && (
              <RiskVerdictCard
                result={analysisResult}
                onOpenReportModal={() => setIsReportModalOpen(true)}
                onOpenIvrPlayer={() => setIsIvrPlayerOpen(true)}
                onOpenCompanionMode={() => setIsCompanionModalOpen(true)}
                onOpenRakshakCircle={() => setCurrentTab('rakshak_circle')}
                onReset={() => setAnalysisResult(null)}
                seniorMode={seniorMode}
                selectedLang={selectedLang}
              />
            )}
          </div>
        )}

        {/* Tab 2: Companion Mode Overlay Simulation */}
        {currentTab === 'companion' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <h2 className="text-2xl font-bold text-white">
                Mobile Phone Companion Simulation (PRD §2 & §6.4)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Experience how PayRakshak acts as a non-intrusive floating decision assistant alongside Google Pay, PhonePe, and Paytm without blocking transactions or touching banking credentials.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsCompanionModalOpen(true)}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 font-bold text-slate-950 text-sm shadow-xl shadow-indigo-500/25 transition-all hover:scale-105"
              >
                📱 Open Interactive Smartphone Simulator
              </button>
            </div>

            {analysisResult && (
              <div className="pt-6">
                <RiskVerdictCard
                  result={analysisResult}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                  onOpenIvrPlayer={() => setIsIvrPlayerOpen(true)}
                  onOpenCompanionMode={() => setIsCompanionModalOpen(true)}
                  onOpenRakshakCircle={() => setCurrentTab('rakshak_circle')}
                  onReset={() => setAnalysisResult(null)}
                  seniorMode={seniorMode}
                  selectedLang={selectedLang}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Scenario Sandbox */}
        {currentTab === 'sandbox' && (
          <ScenarioSandbox
            onSelectScenario={handleSelectScenario}
            seniorMode={seniorMode}
          />
        )}

        {/* Tab 4: Emergency Golden Hour Lock (1930 Wizard) */}
        {currentTab === 'emergency' && (
          <EmergencyPanicLock
            lastAnalysis={analysisResult || undefined}
            seniorMode={seniorMode}
          />
        )}

        {/* Tab 5: Spot The Scam Quiz Challenge */}
        {currentTab === 'quiz' && (
          <ScamAwarenessQuiz />
        )}

        {/* Tab 6: Rakshak Circle (Guardian Network) */}
        {currentTab === 'rakshak_circle' && (
          <RakshakCircle
            lastAnalysis={analysisResult || undefined}
            seniorMode={seniorMode}
          />
        )}

        {/* Tab 7: PRD Benchmark Suite */}
        {currentTab === 'benchmark' && (
          <BenchmarkDashboard />
        )}

        {/* Tab 8: Privacy Vault */}
        {currentTab === 'privacy' && (
          <PrivacyVault
            history={history}
            onClearHistory={handleClearHistory}
            seniorMode={seniorMode}
          />
        )}

      </main>

      {/* Global Modals */}
      <CybercrimeReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        result={analysisResult || undefined}
      />

      <IvrVoicePlayer
        isOpen={isIvrPlayerOpen}
        onClose={() => setIsIvrPlayerOpen(false)}
        result={analysisResult || undefined}
        selectedLang={selectedLang}
        onLangChange={setSelectedLang}
        seniorMode={seniorMode}
      />

      <ShieldOverlayModal
        isOpen={isCompanionModalOpen}
        onClose={() => setIsCompanionModalOpen(false)}
        result={analysisResult || undefined}
        selectedLang={selectedLang}
        seniorMode={seniorMode}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4 text-sky-400" />
            <span className="font-bold text-slate-300">PayRakshak Decision Shield</span>
            <span>•</span>
            <span>Zero Banking Credential Access Policy (PRD §4 & §6.6)</span>
          </div>
          <p className="text-slate-500">
            Advisory companion for Indian digital payment safety. National Cybercrime Helpline: <strong>1930</strong> • Portal: <strong>cybercrime.gov.in</strong>
          </p>
        </div>
      </footer>

    </div>
  );
};