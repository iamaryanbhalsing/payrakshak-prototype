import React, { useState, useEffect } from 'react';
import { ShieldAlert, Copy, Check, Download, PhoneCall, ExternalLink, X, FileText, AlertCircle } from 'lucide-react';
import { AnalysisResult, CybercrimeReportData } from '../types';
import { generate1930Report } from '../services/api';

interface CybercrimeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result?: AnalysisResult;
}

export const CybercrimeReportModal: React.FC<CybercrimeReportModalProps> = ({
  isOpen,
  onClose,
  result
}) => {
  const [reportData, setReportData] = useState<CybercrimeReportData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [customNote, setCustomNote] = useState('');

  useEffect(() => {
    if (isOpen && result) {
      setLoading(true);
      generate1930Report({
        incidentType: result.redFlags[0]?.title || 'UPI Financial Cyber Fraud',
        suspectVpa: result.parsedUpi?.payeeVpa,
        suspectName: result.parsedUpi?.payeeName,
        suspectUrl: result.detectedUrls?.[0],
        amountAttempted: result.parsedUpi?.amount,
        rawInput: result.parsedUpi?.rawUri || 'N/A',
        evidenceNote: customNote,
        detectedRedFlags: result.redFlags
      })
        .then((data) => {
          setReportData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isOpen, result, customNote]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!reportData) return;
    navigator.clipboard.writeText(reportData.fullNarrative);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!reportData) return;
    const blob = new Blob([reportData.fullNarrative], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PayRakshak_Cybercrime_Report_${reportData.reportId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                National Cyber Crime 1930 Incident Draft Generator
              </h2>
              <p className="text-xs text-slate-400">
                Pre-fills structured evidence for filing complaints on cybercrime.gov.in or calling 1930.
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

        {/* Content */}
        {loading || !reportData ? (
          <div className="text-center py-12 text-slate-400 text-xs">Generating incident report transcript...</div>
        ) : (
          <div className="space-y-6">
            
            {/* Helplines Callout */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-rose-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg shadow-rose-500/20">
                  1930
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">National Cyber Financial Fraud Helpline</h4>
                  <p className="text-xs text-slate-400">Toll-free 24x7 Emergency Line • Dial immediately</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href="tel:1930"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all flex items-center space-x-1.5 shadow-md"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call 1930 Now</span>
                </a>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs transition-all flex items-center space-x-1.5 border border-slate-700"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Generated Narrative Transcript Box */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Pre-Formatted Complaint Narrative:
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all flex items-center space-x-1.5 border border-slate-700"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 font-semibold text-xs transition-all flex items-center space-x-1.5 border border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .TXT</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={reportData.fullNarrative}
                rows={9}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-200 leading-relaxed focus:outline-none select-all"
              />
            </div>

            {/* Guided Step by Step */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                Golden Hour Action Checklist:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {reportData.reportingGuideSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};