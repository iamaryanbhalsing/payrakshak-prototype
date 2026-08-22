import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, AlertTriangle, Clock, Lock, CheckCircle2, Copy, Check, ExternalLink, ChevronRight, RefreshCw } from 'lucide-react';
import { AnalysisResult } from '../types';

interface EmergencyPanicLockProps {
  lastAnalysis?: AnalysisResult;
  seniorMode: boolean;
}

export const BANK_HELPLINES = [
  { bank: 'State Bank of India (SBI)', number: '1800 1234 / 1800 2100', directCall: '18001234', notes: 'Press 1 for immediate card & UPI block' },
  { bank: 'HDFC Bank', number: '1800 1600 / 1800 2600', directCall: '18001600', notes: '24x7 Dedicated Fraud Reporting Desk' },
  { bank: 'ICICI Bank', number: '1800 1080', directCall: '18001080', notes: 'Emergency customer care & digital debit block' },
  { bank: 'Axis Bank', number: '1800 419 5959', directCall: '18004195959', notes: 'Emergency transaction dispute registration' },
  { bank: 'Punjab National Bank (PNB)', number: '1800 180 2222', directCall: '18001802222', notes: 'National toll-free fraud helpline' },
  { bank: 'Kotak Mahindra Bank', number: '1860 266 2666', directCall: '18602662666', notes: 'Emergency Netbanking & UPI freeze' },
  { bank: 'Bank of Baroda', number: '1800 5700', directCall: '18005700', notes: 'National digital banking helpline' },
  { bank: 'PhonePe Emergency Grievance', number: '080-68727374', directCall: '08068727374', notes: 'PhonePe trust & fraud reporting team' },
  { bank: 'Google Pay India Support', number: '1800-419-0157', directCall: '18004190157', notes: 'GPay digital payments dispute line' },
  { bank: 'Paytm Payments Bank Desk', number: '0120-4456-456', directCall: '01204456456', notes: '24x7 fraud & unauthorized transaction line' },
  { bank: 'India Post Payments Bank (IPPB)', number: '155299 / 1800 8899 860', directCall: '155299', notes: 'Postal digital banking helpline' }
];

export const EmergencyPanicLock: React.FC<EmergencyPanicLockProps> = ({
  lastAnalysis,
  seniorMode
}) => {
  const [selectedBank, setSelectedBank] = useState(BANK_HELPLINES[0]);
  const [copiedScript, setCopiedScript] = useState(false);

  const callerScript = `Hello Officer, I am reporting an unauthorized fraudulent digital UPI transaction that occurred just now.
Suspect UPI ID: ${lastAnalysis?.parsedUpi?.payeeVpa || '[Insert Scammer UPI ID]'}
Claimed Name: ${lastAnalysis?.parsedUpi?.payeeName || '[Insert Name]'}
Amount: ₹${lastAnalysis?.parsedUpi?.amount || '[Insert Amount]'}
Date & Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
My Debited Bank: ${selectedBank.bank}
Please initiate an emergency Golden Hour wallet freeze on the suspect receiver VPA under the Citizen Financial Cyber Fraud Reporting System.`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(callerScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Emergency Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-2 border-rose-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-rose-600/30 animate-pulse">
              1930
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-rose-300 block">
                GOLDEN HOUR EMERGENCY RESPONSE WIZARD
              </span>
              <h2 className="text-2xl font-black text-white">
                Money Transferred Already? Act Now!
              </h2>
              <p className="text-xs text-rose-200/90 mt-0.5 font-medium">
                The first 1 to 4 hours are critical. Police & Banks can freeze the recipient wallet before money is cashed out.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="tel:1930"
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 font-black text-white text-sm shadow-xl shadow-rose-600/40 flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Dial 1930 Now</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Step-by-Step Response & Operator Script */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: 1930 Call Preparation */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-100 text-base flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Step 1: Read This Exact Script to the 1930 Operator</span>
              </h3>
              
              <button
                onClick={handleCopyScript}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all flex items-center space-x-1.5 border border-slate-700"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? 'Copied Script!' : 'Copy Script'}</span>
              </button>
            </div>

            <textarea
              readOnly
              value={callerScript}
              rows={6}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-rose-300 leading-relaxed focus:outline-none"
            />

            <p className="text-xs text-slate-400">
              💡 <strong>Tip:</strong> Keep your Bank Account Number and UPI Transaction ID (from SMS/UPI App) ready before speaking to the operator.
            </p>
          </div>

          {/* Step 2: Bank Fraud Desks Direct Directory */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
            <h3 className="font-bold text-slate-100 text-base flex items-center space-x-2">
              <Lock className="w-5 h-5 text-sky-400" />
              <span>Step 2: Call Your Bank's Official Emergency Freeze Desk</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BANK_HELPLINES.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBank(item)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedBank.bank === item.bank
                      ? 'bg-sky-500/10 border-sky-500/50 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-200">{item.bank}</h4>
                    <span className="font-mono text-xs text-sky-400 font-semibold block mt-0.5">{item.number}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">{item.notes}</span>
                  </div>

                  <a
                    href={`tel:${item.directCall}`}
                    className="mt-3 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-300 font-bold text-[11px] text-center transition-all flex items-center justify-center space-x-1.5"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Call Bank Desk</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Device & Security Checklist */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center space-x-2 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Immediate Device Safety Checklist</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">1. Uninstall Remote Apps:</span>
                If you installed <strong>AnyDesk, TeamViewer, RustDesk, or QuickSupport</strong>, delete them from your phone immediately to stop scammers from viewing your screen.
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">2. Change UPI MPIN:</span>
                Open your official banking app (YONO / iMobile / HDFC Mobile) from a safe device or mobile data and reset your UPI PIN.
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">3. File Formal Cyber Complaint:</span>
                Visit <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-sky-400 underline font-semibold">cybercrime.gov.in</a> and file an online report. Keep the generated Acknowledgement Number for your bank dispute.
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="font-bold text-white block mb-1">4. RBI Zero Liability Policy:</span>
                Under RBI guidelines, if you notify your bank of an unauthorized electronic transaction within 3 working days, your liability is strictly limited.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};