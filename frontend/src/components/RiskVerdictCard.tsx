import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, AlertTriangle, XCircle, Volume2, 
  Send, FileText, ChevronDown, ChevronUp, Lock, CheckCircle2, 
  AlertCircle, Smartphone, Info, RefreshCw, Share2, ExternalLink
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface RiskVerdictCardProps {
  result: AnalysisResult;
  onOpenReportModal: () => void;
  onOpenIvrPlayer: () => void;
  onOpenCompanionMode: () => void;
  onOpenRakshakCircle: () => void;
  onReset: () => void;
  seniorMode: boolean;
  selectedLang: string;
}

export const RiskVerdictCard: React.FC<RiskVerdictCardProps> = ({
  result,
  onOpenReportModal,
  onOpenIvrPlayer,
  onOpenCompanionMode,
  onOpenRakshakCircle,
  onReset,
  seniorMode,
  selectedLang
}) => {
  const [showRedFlags, setShowRedFlags] = useState(true);
  const [showParsedDetails, setShowParsedDetails] = useState(false);

  const isCritical = result.riskLevel === 'CRITICAL';
  const isHigh = result.riskLevel === 'HIGH';
  const isMedium = result.riskLevel === 'MEDIUM';
  const isSafe = result.riskLevel === 'SAFE' || result.riskLevel === 'LOW';

  // Get active localized translation
  const localized = result.multilingualAlerts[selectedLang] || result.multilingualAlerts['en'];

  return (
    <div className="space-y-6">
      
      {/* Main Verdict Hero Card */}
      <div className={`rounded-3xl p-6 sm:p-8 border transition-all relative overflow-hidden backdrop-blur-2xl shadow-2xl ${
        isCritical || isHigh
          ? 'bg-rose-950/40 border-rose-500/50 shadow-rose-950/50'
          : isMedium
          ? 'bg-amber-950/30 border-amber-500/40 shadow-amber-950/40'
          : 'bg-emerald-950/30 border-emerald-500/40 shadow-emerald-950/40'
      }`}>
        
        {/* Ambient background aura */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isCritical || isHigh ? 'bg-rose-500/10' : isMedium ? 'bg-amber-500/10' : 'bg-emerald-500/10'
        }`}></div>

        <div className="relative z-10">
          
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-center space-x-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                isCritical || isHigh
                  ? 'bg-rose-500 text-slate-950 shadow-rose-500/30 animate-bounce'
                  : isMedium
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/30'
                  : 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
              }`}>
                {isCritical || isHigh ? (
                  <ShieldAlert className="w-8 h-8" />
                ) : isMedium ? (
                  <AlertTriangle className="w-8 h-8" />
                ) : (
                  <ShieldCheck className="w-8 h-8" />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                    isCritical || isHigh
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : isMedium
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {result.riskLevel} RISK VERDICT
                  </span>
                  <span className="text-xs text-slate-400">
                    Confidence: {result.confidenceScore}% • Response: {result.latencyMs}ms
                  </span>
                </div>
                <h1 className={`font-black tracking-tight text-white mt-1 ${seniorMode ? 'text-3xl' : 'text-2xl'}`}>
                  {localized?.headline || result.headline}
                </h1>
              </div>
            </div>

            {/* Score Pill / Meter */}
            <div className="flex items-center space-x-3 bg-slate-950/70 border border-slate-800 px-5 py-3 rounded-2xl self-start sm:self-auto">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Risk Threat Score</span>
                <span className={`text-2xl font-black ${
                  isCritical || isHigh ? 'text-rose-400' : isMedium ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {result.riskScore} <span className="text-sm font-normal text-slate-500">/ 100</span>
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border-4 flex items-center justify-center font-bold text-xs" style={{
                borderColor: isCritical || isHigh ? '#f43f5e' : isMedium ? '#f59e0b' : '#10b981'
              }}>
                {result.riskScore}%
              </div>
            </div>
          </div>

          {/* CRITICAL INVERTED PIN BANNER */}
          {(isCritical || isHigh) && (
            <div className="my-5 p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500/60 flex items-start space-x-3 animate-pulse">
              <XCircle className="w-7 h-7 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-rose-200 text-base sm:text-lg uppercase tracking-wide block">
                  DO NOT ENTER YOUR UPI PIN!
                </span>
                <p className="text-rose-200/90 text-xs sm:text-sm mt-0.5 font-medium">
                  {localized?.actionGuidance || 'The golden rule of UPI: You NEVER enter your UPI PIN to RECEIVE money. Entering your PIN will DEBIT money from your bank account!'}
                </p>
              </div>
            </div>
          )}

          {/* Explanation Text */}
          <div className="my-5 space-y-2">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">Analysis Explanation:</h3>
            <p className={`text-slate-200 leading-relaxed font-medium ${seniorMode ? 'text-lg' : 'text-sm'}`}>
              {localized?.explanation || result.summary}
            </p>
          </div>

          {/* Senior Citizen Special Note Card */}
          {seniorMode && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl mb-6">
              <h4 className="text-sm font-bold text-amber-300 flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>वरिष्ठ नागरिक सुरक्षा सुझाव (Senior Citizen Safe Advice):</span>
              </h4>
              <p className="text-base text-slate-200 mt-2 font-medium">
                👉 <strong>क्या करें:</strong> {result.seniorCitizenSummary.whatToDo}
              </p>
              <p className="text-base text-rose-300 mt-1 font-semibold">
                ⚠️ <strong>क्या न करें:</strong> {result.seniorCitizenSummary.whatNotToDo}
              </p>
            </div>
          )}

          {/* Quick Action Button Group */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* IVR Voice Listen Button */}
            <button
              onClick={onOpenIvrPlayer}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 font-semibold text-xs transition-all shadow-md hover:scale-[1.02]"
            >
              <Volume2 className="w-4 h-4" />
              <span>{seniorMode ? 'आवाज़ में सुनें (Voice Alert)' : 'Voice Alert (IVR Audio)'}</span>
            </button>

            {/* Phone Companion Overlay Demo */}
            <button
              onClick={onOpenCompanionMode}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-semibold text-xs transition-all shadow-md hover:scale-[1.02]"
            >
              <Smartphone className="w-4 h-4" />
              <span>Simulate App Overlay</span>
            </button>

            {/* Rakshak Circle Family Alert */}
            <button
              onClick={onOpenRakshakCircle}
              className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-semibold text-xs transition-all shadow-md hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Rakshak Family SMS</span>
            </button>

            {/* Cybercrime 1930 Report Generator */}
            {(isCritical || isHigh) ? (
              <button
                onClick={onOpenReportModal}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs transition-all shadow-lg shadow-rose-600/30 hover:scale-[1.02]"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>File 1930 Incident Draft</span>
              </button>
            ) : (
              <button
                onClick={onReset}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all shadow-md hover:scale-[1.02]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Scan Another Request</span>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* Identified Red Flags Accordion */}
      {result.redFlags.length > 0 && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <button
            onClick={() => setShowRedFlags(!showRedFlags)}
            className="w-full flex items-center justify-between text-left font-bold text-slate-200 hover:text-white"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">
                {result.redFlags.length}
              </div>
              <div>
                <span className="text-base">Detected Fraud Indicators & Red Flags</span>
                <p className="text-xs font-normal text-slate-400">Rule-based threat signatures matched</p>
              </div>
            </div>
            {showRedFlags ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {showRedFlags && (
            <div className="mt-5 space-y-3 pt-4 border-t border-slate-800">
              {result.redFlags.map((flag, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start space-x-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                    flag.severity === 'critical' ? 'bg-rose-500 ring-4 ring-rose-500/20' : 'bg-amber-500 ring-4 ring-amber-500/20'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-100">{flag.title}</h4>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {flag.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{flag.description}</p>
                    <div className="mt-2 text-[11px] text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">
                      💡 <strong>Rakshak Advice:</strong> {flag.recommendation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Parsed Details & Action Checklist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Actionable Next Steps Checklist */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center space-x-2.5 mb-4">
            <CheckCircle2 className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-slate-100 text-base">Actionable Safety Guidance</h3>
          </div>
          
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            {result.actionSteps.map((step, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Parsed Payment Payload Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center space-x-2.5 mb-4">
            <Info className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-slate-100 text-base">Parsed Technical Parameters</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
              <span className="text-slate-400">Input Modality:</span>
              <span className="font-semibold text-slate-200 uppercase">{result.inputType}</span>
            </div>

            {result.parsedUpi?.payeeVpa && (
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Payee UPI ID (VPA):</span>
                <span className="font-mono text-sky-400 font-bold">{result.parsedUpi.payeeVpa}</span>
              </div>
            )}

            {result.parsedUpi?.payeeName && (
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Payee Claimed Name:</span>
                <span className="font-semibold text-slate-200">{result.parsedUpi.payeeName}</span>
              </div>
            )}

            {result.parsedUpi?.amount && (
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Requested Amount:</span>
                <span className="font-bold text-amber-400">₹{result.parsedUpi.amount}</span>
              </div>
            )}

            {result.parsedUpi?.handleBank && (
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Associated Bank / PSP:</span>
                <span className="font-medium text-slate-300">{result.parsedUpi.handleBank}</span>
              </div>
            )}

            {result.parsedUpi?.merchantCategory && (
              <div className="flex justify-between p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400">Merchant Category (MCC):</span>
                <span className="font-medium text-emerald-400">{result.parsedUpi.merchantCategory}</span>
              </div>
            )}

            {result.detectedUrls && result.detectedUrls.length > 0 && (
              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-1">Embedded Web Links:</span>
                {result.detectedUrls.map((url, i) => (
                  <span key={i} className="font-mono text-rose-400 break-all text-[11px] block">{url}</span>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};