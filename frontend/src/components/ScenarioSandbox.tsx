import React, { useState, useEffect } from 'react';
import { Play, Sparkles, ShieldAlert, ShieldCheck, AlertTriangle, Users, Tag, ArrowRight, QrCode } from 'lucide-react';
import { ScenarioItem } from '../types';
import { fetchScenarios } from '../services/api';
import { QrGeneratorModal } from './QrGeneratorModal';

interface ScenarioSandboxProps {
  onSelectScenario: (scenario: ScenarioItem) => void;
  seniorMode: boolean;
}

export const ScenarioSandbox: React.FC<ScenarioSandboxProps> = ({
  onSelectScenario,
  seniorMode
}) => {
  const [scenarios, setScenarios] = useState<ScenarioItem[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  
  // QR Generator Modal State
  const [qrModalData, setQrModalData] = useState<{ isOpen: boolean; title: string; payload: string; category?: string }>({
    isOpen: false,
    title: '',
    payload: '',
    category: ''
  });

  useEffect(() => {
    fetchScenarios()
      .then((data) => {
        setScenarios(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load scenarios:', err);
        setLoading(false);
      });
  }, []);

  const personas = ['All', 'Senior Citizen', 'Student', 'Small Business', 'General Public'];

  const filtered = scenarios.filter((s) => {
    const matchPersona = selectedPersona === 'All' || s.targetPersona === selectedPersona;
    const matchRisk = selectedRisk === 'All' || s.expectedRisk === selectedRisk;
    return matchPersona && matchRisk;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className={`font-bold tracking-tight text-white ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
                {seniorMode ? 'धोखाधड़ी के विभिन्न मामलों का परीक्षण (12 Scenarios)' : 'Real-World Indian UPI Scam Sandbox'}
              </h2>
            </div>
            <p className={`text-slate-400 mt-1 ${seniorMode ? 'text-base' : 'text-xs'}`}>
              Test all 12 real-world cases or generate live QR codes to test camera scanner verification.
            </p>
          </div>

          {/* Persona Filter Buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            {personas.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPersona(p)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedPersona === p
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">Loading scenario library...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isCritical = item.expectedRisk === 'CRITICAL' || item.expectedRisk === 'HIGH';
            const isMedium = item.expectedRisk === 'MEDIUM';
            const isSafe = item.expectedRisk === 'SAFE';

            return (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between transition-all hover:scale-[1.01] group backdrop-blur-md"
              >
                <div>
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : isMedium
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {item.expectedRisk} RISK
                    </span>

                    <span className="text-[11px] font-medium text-slate-400 flex items-center space-x-1">
                      <Users className="w-3 h-3 text-sky-400" />
                      <span>{item.targetPersona}</span>
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className={`font-bold text-slate-100 group-hover:text-sky-300 transition-colors ${seniorMode ? 'text-lg' : 'text-sm'}`}>
                    {item.title}
                  </h3>
                  
                  <span className="text-[11px] font-semibold text-indigo-400 block mt-1">
                    {item.category}
                  </span>

                  <p className={`text-slate-400 mt-2 line-clamp-2 leading-relaxed ${seniorMode ? 'text-sm' : 'text-xs'}`}>
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Action Button Group */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectScenario(item)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-sky-500 text-slate-200 hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md group-hover:bg-sky-500 group-hover:text-slate-950"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Test</span>
                  </button>

                  <button
                    onClick={() => {
                      setQrModalData({
                        isOpen: true,
                        title: item.title,
                        payload: item.rawInput,
                        category: item.category
                      });
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 font-bold text-xs transition-all flex items-center justify-center space-x-1.5 border border-slate-800"
                    title="Generate QR to scan with camera"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Show QR</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* QR Generator Modal */}
      <QrGeneratorModal
        isOpen={qrModalData.isOpen}
        onClose={() => setQrModalData({ ...qrModalData, isOpen: false })}
        title={qrModalData.title}
        payload={qrModalData.payload}
        category={qrModalData.category}
      />

    </div>
  );
};