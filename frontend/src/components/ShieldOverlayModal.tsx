import React, { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, X, Check, ArrowLeft, Info, Lock, Smartphone, ExternalLink, RefreshCw } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ShieldOverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  result?: AnalysisResult;
  selectedLang: string;
  seniorMode: boolean;
}

export const ShieldOverlayModal: React.FC<ShieldOverlayModalProps> = ({
  isOpen,
  onClose,
  result,
  selectedLang,
  seniorMode
}) => {
  const [selectedApp, setSelectedApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [userDismissed, setUserDismissed] = useState(false);
  const [overlayExpanded, setOverlayExpanded] = useState(true);

  if (!isOpen) return null;

  const isCritical = result?.riskLevel === 'CRITICAL' || result?.riskLevel === 'HIGH';
  const isSafe = result?.riskLevel === 'SAFE' || result?.riskLevel === 'LOW';

  const localized = result?.multilingualAlerts[selectedLang] || result?.multilingualAlerts['en'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Interactive Mobile Companion Simulator (PRD §2 & §6.4)
              </h2>
              <p className="text-xs text-slate-400">
                Demonstrates how PayRakshak floats alongside UPI apps without touching banking PINs.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Layout: Controls on Left, Simulated Phone on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Simulation Controls & Architecture Notes */}
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                Underlying UPI App Simulation
              </span>
              <p className="text-xs text-slate-300">
                Choose the payment application you want to simulate:
              </p>
              
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  { id: 'gpay', name: 'Google Pay', color: 'border-blue-500' },
                  { id: 'phonepe', name: 'PhonePe', color: 'border-purple-500' },
                  { id: 'paytm', name: 'Paytm', color: 'border-cyan-500' }
                ].map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedApp(app.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedApp === app.id
                        ? 'bg-slate-800 text-white ' + app.color + ' shadow-lg'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {app.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2.5 text-xs text-slate-300">
              <h4 className="font-bold text-slate-200 flex items-center space-x-2">
                <Info className="w-4 h-4 text-sky-400" />
                <span>How the Overlay Works in Real Life:</span>
              </h4>
              <p>
                1. <strong>Non-Intrusive Accessibility Shield:</strong> PayRakshak detects when a UPI deep link or QR code is opened.
              </p>
              <p>
                2. <strong>Zero Credential Access:</strong> PayRakshak does <em>not</em> see or record your bank account or UPI PIN.
              </p>
              <p>
                3. <strong>Advisory, Never Blocking:</strong> If a scam is detected, PayRakshak pops up an advisory card with plain reasoning. The user always makes the final choice.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setUserDismissed(false);
                  setOverlayExpanded(true);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all flex items-center space-x-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all"
              >
                Done
              </button>
            </div>
          </div>

          {/* Smartphone Frame Simulation */}
          <div className="flex justify-center">
            <div className="w-[320px] h-[580px] bg-slate-950 rounded-[40px] border-4 border-slate-700 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-2xl z-40 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900 mr-2"></div>
                <div className="w-10 h-1 bg-slate-900 rounded-full"></div>
              </div>

              {/* Status Bar */}
              <div className="pt-6 px-5 pb-2 flex justify-between items-center text-[10px] text-slate-400 font-medium z-30">
                <span>09:41</span>
                <div className="flex items-center space-x-1.5">
                  <span>5G</span>
                  <div className="w-4 h-2.5 border border-slate-400 rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-emerald-400 rounded-xs"></div>
                  </div>
                </div>
              </div>

              {/* Underlying Payment App Screen */}
              <div className="flex-1 px-4 py-2 flex flex-col justify-between text-center relative z-20">
                
                {/* App Brand Header */}
                <div className="py-2 border-b border-slate-800/80 flex items-center justify-center space-x-2">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    {selectedApp === 'gpay' ? 'Google Pay' : selectedApp === 'phonepe' ? 'PhonePe' : 'Paytm'}
                  </span>
                </div>

                {/* Receiver Info */}
                <div className="my-auto space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-xl font-bold text-sky-400">
                    {result?.parsedUpi?.payeeName ? result.parsedUpi.payeeName.charAt(0) : 'U'}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">
                      {result?.parsedUpi?.payeeName || 'Unknown Receiver'}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {result?.parsedUpi?.payeeVpa || 'receiver@upi'}
                    </p>
                  </div>

                  <div className="text-2xl font-black text-white">
                    ₹{result?.parsedUpi?.amount || '15,000'}
                  </div>

                  <p className="text-[11px] text-slate-400 italic bg-slate-900/80 py-1.5 px-3 rounded-lg">
                    Note: "{result?.parsedUpi?.transactionNote || 'Advance payment'}"
                  </p>
                </div>

                {/* Base UPI App Action Button */}
                <div className="pb-4 space-y-2">
                  <button className="w-full py-3 rounded-xl bg-indigo-600 font-bold text-xs text-white shadow-lg opacity-60">
                    Pay with Bank Account
                  </button>
                  <p className="text-[9px] text-slate-500">
                    UPI MPIN required on next step
                  </p>
                </div>

              </div>

              {/* PAYRAKSHAK FLOATING SHIELD OVERLAY (Bottom Sheet) */}
              {!userDismissed && (
                <div className={`absolute bottom-0 inset-x-0 bg-slate-900 border-t-2 ${
                  isCritical ? 'border-rose-500 shadow-rose-500/50' : isSafe ? 'border-emerald-500' : 'border-amber-500'
                } rounded-t-3xl p-4 shadow-2xl z-40 transition-all transform ${
                  overlayExpanded ? 'translate-y-0' : 'translate-y-36'
                }`}>
                  
                  {/* Floating Shield Pill */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isCritical ? 'bg-rose-500 text-white animate-pulse' : isSafe ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                      }`}>
                        <Shield className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-xs tracking-tight text-white">
                        PayRakshak Shield
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCritical ? 'bg-rose-500/20 text-rose-300' : isSafe ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {result?.riskLevel || 'SCAM'} RISK ({result?.riskScore || 90}%)
                    </span>
                  </div>

                  {/* Warning Body */}
                  <div className="py-2.5 space-y-1 text-left">
                    <span className="font-bold text-xs text-rose-300 block">
                      {isCritical ? '🚨 DO NOT ENTER UPI PIN!' : '✅ Payment check verified'}
                    </span>
                    <p className="text-[10px] text-slate-300 leading-tight line-clamp-3">
                      {localized?.explanation || 'You are being asked to enter your PIN to receive money. This is a scam!'}
                    </p>
                  </div>

                  {/* Overlay Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => setUserDismissed(true)}
                      className="py-2 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-[11px] text-white shadow-md"
                    >
                      ❌ Cancel Payment
                    </button>
                    <button
                      onClick={() => setUserDismissed(true)}
                      className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-[10px] text-slate-400"
                    >
                      Proceed Anyway
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};