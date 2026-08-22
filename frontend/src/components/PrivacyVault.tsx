import React, { useState, useEffect } from 'react';
import { Lock, Trash2, Download, ShieldCheck, CheckCircle2, AlertCircle, Database, EyeOff } from 'lucide-react';
import { AnalysisResult } from '../types';

interface PrivacyVaultProps {
  history: AnalysisResult[];
  onClearHistory: () => void;
  seniorMode: boolean;
}

export const PrivacyVault: React.FC<PrivacyVaultProps> = ({
  history,
  onClearHistory,
  seniorMode
}) => {
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    if (confirm('Are you sure you want to purge all local analysis history? This action cannot be undone.')) {
      onClearHistory();
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    }
  };

  const exportHistoryJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `PayRakshak_Local_Vault_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`font-bold tracking-tight text-white ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
                Zero-Storage Privacy Vault & Local Data Control
              </h2>
              <p className="text-xs text-slate-400">
                100% On-Device Analysis • Zero Banking Credentials Stored • One-Click History Wipe
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportHistoryJson}
              disabled={history.length === 0}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center space-x-1.5 border border-slate-700 disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span>Export History</span>
            </button>
            <button
              onClick={handleClear}
              disabled={history.length === 0}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center space-x-1.5 shadow-md disabled:opacity-40"
            >
              <Trash2 className="w-4 h-4" />
              <span>Purge All Data</span>
            </button>
          </div>
        </div>
      </div>

      {cleared && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Local memory and device cache successfully purged. All scan records deleted.</span>
        </div>
      )}

      {/* Privacy Guarantees Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <EyeOff className="w-4 h-4" />
            <span>No Banking Credentials</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            PayRakshak never requests, reads, stores, or logs your UPI PIN, Netbanking passwords, or debit card CVVs.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
            <Database className="w-4 h-4" />
            <span>On-Device Storage Only</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Scan logs reside solely inside your browser's private LocalStorage sandbox. No tracking telemetry is sent to cloud servers.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Advisory Decision Shield</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            PayRakshak provides plain-language risk scores to help you decide. It never holds or intercepts payment funds.
          </p>
        </div>

      </div>

      {/* Local Scan History List */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <h3 className="font-bold text-slate-100 text-sm mb-4">
          Local On-Device Scan Audit Records ({history.length})
        </h3>

        {history.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No local scan history found. Run a check from the Multi-Modal Scanner or Scenario Sandbox.
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, idx) => {
              const isCrit = item.riskLevel === 'CRITICAL' || item.riskLevel === 'HIGH';
              const isMed = item.riskLevel === 'MEDIUM';
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCrit ? 'bg-rose-500/20 text-rose-300' : isMed ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {item.riskLevel} ({item.riskScore}%)
                      </span>
                      <span className="text-[10px] uppercase font-mono text-slate-400">
                        {item.inputType}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-200 line-clamp-1">{item.headline}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{item.summary}</p>
                  </div>

                  <div className="text-right sm:self-center">
                    <span className="text-xs font-bold font-mono text-sky-400">
                      {item.redFlags.length} Flag{item.redFlags.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};