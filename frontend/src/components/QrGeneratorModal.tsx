import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, X, Download, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';

interface QrGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  payload: string;
  category?: string;
}

export const QrGeneratorModal: React.FC<QrGeneratorModalProps> = ({
  isOpen,
  onClose,
  title,
  payload,
  category
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && payload) {
      QRCode.toDataURL(payload, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      }).then((url) => {
        setDataUrl(url);
      }).catch((err) => {
        console.error('QR generation error:', err);
      });
    }
  }, [isOpen, payload]);

  if (!isOpen) return null;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `PayRakshak_Demo_QR_${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
          <div className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-white text-base">Test QR Code Generator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Category */}
        <div className="mb-4">
          <h4 className="font-bold text-slate-100 text-sm">{title}</h4>
          {category && (
            <span className="text-[11px] font-semibold text-indigo-400 block mt-0.5">{category}</span>
          )}
        </div>

        {/* Rendered QR Image */}
        <div className="p-4 bg-white rounded-2xl shadow-xl inline-block mx-auto mb-4">
          {dataUrl ? (
            <img src={dataUrl} alt="Scenario QR Code" className="w-56 h-56 mx-auto rounded-lg" />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-xs">
              Generating QR...
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Scan this QR Code with your smartphone camera or with PayRakshak's live scanner.
        </p>

        {/* Raw Payload string */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-sky-300 break-all text-left mb-4 flex items-center justify-between gap-2">
          <span className="truncate">{payload}</span>
          <button
            onClick={handleCopyPayload}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex-shrink-0"
            title="Copy URI"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={handleDownloadQr}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center space-x-1.5 border border-slate-700"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};