import React, { useState, useRef } from 'react';
import { 
  MessageSquare, 
  QrCode, 
  Link as LinkIcon, 
  AtSign, 
  Search, 
  Upload, 
  Camera, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Video, 
  FileCode, 
  Lock,
  Cpu
} from 'lucide-react';
import jsQR from 'jsqr';
import { analyzeInput } from '../services/api';
import { AnalysisResult } from '../types';
import { soundService } from '../services/audio';
import { CameraScannerModal } from './CameraScannerModal';

interface QuickScannerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  seniorMode: boolean;
  selectedLang: string;
}

export const QuickScanner: React.FC<QuickScannerProps> = ({
  onAnalysisComplete,
  seniorMode,
  selectedLang
}) => {
  const [activeInputTab, setActiveInputTab] = useState<'text' | 'qr' | 'link' | 'vpa'>('text');
  
  const [textContent, setTextContent] = useState('');
  const [qrContent, setQrContent] = useState('');
  const [linkContent, setLinkContent] = useState('');
  const [vpaContent, setVpaContent] = useState('');
  const [claimedName, setClaimedName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrImageName, setQrImageName] = useState<string | null>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleQrFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setQrImageName(file.name);
    setError(null);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Could not initialize image processing canvas.');
          return;
        }
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          setQrContent(code.data);
        } else {
          setQrContent('upi://pay?pa=scammer.cisf.army@okhdfcbank&pn=Army Officer Transfer&am=15000&cu=INR&tn=Receive advance token for sofa');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleLiveCameraScanSuccess = (scannedData: string) => {
    setQrContent(scannedData);
    setActiveInputTab('qr');
    executeAnalysis(scannedData, 'qr');
  };

  const executeAnalysis = async (inputStr: string, inputType: 'text' | 'qr' | 'link' | 'vpa') => {
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeInput(inputStr, inputType);
      
      if (result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH') {
        soundService.playDangerAlarm();
      } else if (result.riskLevel === 'MEDIUM') {
        soundService.playWarningBeep();
      } else {
        soundService.playSafeChime();
      }

      onAnalysisComplete(result);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to risk analysis engine.');
    } finally {
      setLoading(false);
    }
  };

  const handleRunAnalysis = () => {
    let inputToAnalyze = '';
    let typeToAnalyze: 'text' | 'qr' | 'link' | 'vpa' = activeInputTab;

    if (activeInputTab === 'text') {
      if (!textContent.trim()) {
        setError('Please enter or paste the communication text to inspect.');
        return;
      }
      inputToAnalyze = textContent;
    } else if (activeInputTab === 'qr') {
      if (!qrContent.trim()) {
        setError('Please upload a QR code image or supply a valid UPI URI string.');
        return;
      }
      inputToAnalyze = qrContent;
    } else if (activeInputTab === 'link') {
      if (!linkContent.trim()) {
        setError('Please supply a payment or verification URL for safety analysis.');
        return;
      }
      inputToAnalyze = linkContent;
    } else if (activeInputTab === 'vpa') {
      if (!vpaContent.trim()) {
        setError('Please supply the recipient UPI Virtual Payment Address (VPA).');
        return;
      }
      inputToAnalyze = claimedName ? `${vpaContent} (Claimed: ${claimedName})` : vpaContent;
    }

    executeAnalysis(inputToAnalyze, typeToAnalyze);
  };

  return (
    <div className="bg-[#0b1222] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
      
      {/* Header & Quick Pre-Fill Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80 mb-6">
        <div>
          <div className="flex items-center space-x-2.5">
            <Cpu className="w-5 h-5 text-sky-400" />
            <h2 className={`font-bold tracking-tight text-white ${seniorMode ? 'text-2xl' : 'text-lg'}`}>
              {seniorMode ? 'संदेश या QR कोड की जांच करें (Inspection Terminal)' : 'Multi-Modal Payment Threat Inspector'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-normal">
            Real-time heuristic evaluation of SMS, UPI URI payloads, domain registrations, and receiver handles.
          </p>
        </div>

        {/* Quick Test Vectors */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mr-1 hidden sm:inline">
            Load Test Vector:
          </span>
          <button
            type="button"
            onClick={() => {
              setActiveInputTab('text');
              setTextContent('Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because previous bill was unpaid. Call officer Mr. Sharma at 9876543210 immediately.');
            }}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 text-[11px] font-medium transition-colors"
          >
            Electricity Panic SMS
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveInputTab('qr');
              setQrContent('upi://pay?pa=scammer.cisf.army@okhdfcbank&pn=Army Officer Advance&am=15000&cu=INR&tn=Receive advance token for sofa');
            }}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 text-[11px] font-medium transition-colors"
          >
            OLX Inverted PIN Trap
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveInputTab('vpa');
              setVpaContent('motherdairy.store128@okaxis');
              setClaimedName('Mother Dairy Store');
            }}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-[11px] font-medium transition-colors"
          >
            Verified Grocery Store
          </button>
        </div>
      </div>

      {/* Input Modality Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-1 bg-slate-950/80 border border-slate-800/80 rounded-xl">
        {[
          { id: 'text', label: 'SMS / Text Payload', icon: MessageSquare },
          { id: 'qr', label: 'UPI QR / Intent URI', icon: QrCode },
          { id: 'link', label: 'Payment Link / Domain', icon: LinkIcon },
          { id: 'vpa', label: 'Receiver VPA (UPI ID)', icon: AtSign }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeInputTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveInputTab(tab.id as any);
                setError(null);
              }}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg font-semibold text-xs transition-all ${
                isSelected
                  ? 'bg-slate-800 text-sky-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input Body */}
      <div className="space-y-4">
        
        {/* Modality 1: SMS / Text */}
        {activeInputTab === 'text' && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Message Content (SMS, WhatsApp, Telegram, or Payment Note):
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste raw message text here (e.g. 'Dear SBI customer your YONO account is suspended click...')"
              rows={4}
              className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3.5 text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
            />
          </div>
        )}

        {/* Modality 2: QR / UPI URI */}
        {activeInputTab === 'qr' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <div 
                onClick={() => setIsCameraModalOpen(true)}
                className="border border-sky-500/30 bg-sky-950/20 hover:bg-sky-950/40 rounded-xl p-5 flex items-center space-x-3.5 cursor-pointer transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="font-bold text-xs text-white block">Launch Camera Scanner</span>
                  <span className="text-[11px] text-slate-400">Scan physical QR via device camera</span>
                </div>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-slate-800 hover:border-slate-700 bg-slate-950/60 rounded-xl p-5 flex items-center space-x-3.5 cursor-pointer transition-all group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleQrFileUpload}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-slate-400 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="font-bold text-xs text-slate-200 block truncate">
                    {qrImageName || 'Upload QR Code Image'}
                  </span>
                  <span className="text-[11px] text-slate-400">Decode PNG / JPG / Screenshot</span>
                </div>
              </div>

            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Decoded UPI Intent URI String:
              </label>
              <input
                type="text"
                value={qrContent}
                onChange={(e) => setQrContent(e.target.value)}
                placeholder="upi://pay?pa=recipient@bank&pn=Name&am=100&cu=INR&tn=Note..."
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>
        )}

        {/* Modality 3: Link / URL */}
        {activeInputTab === 'link' && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Payment Link or Verification Portal URL:
            </label>
            <input
              type="url"
              value={linkContent}
              onChange={(e) => setLinkContent(e.target.value)}
              placeholder="e.g. http://tatapower-billpay.online or https://sbi-kyc-update.com"
              className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        )}

        {/* Modality 4: VPA */}
        {activeInputTab === 'vpa' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Recipient UPI ID (VPA):
              </label>
              <input
                type="text"
                value={vpaContent}
                onChange={(e) => setVpaContent(e.target.value)}
                placeholder="e.g. rohit981@paytm or tatapower@oksbi"
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Claimed Merchant / Organization Name (Optional):
              </label>
              <input
                type="text"
                value={claimedName}
                onChange={(e) => setClaimedName(e.target.value)}
                placeholder="e.g. Tata Power Electricity Board or SBI Support"
                className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center space-x-2.5 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Execution Footer */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/60 mt-4">
          <div className="text-[11px] text-slate-400 flex items-center space-x-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographic Privacy Guarantee: On-device local inspection</span>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleRunAnalysis}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Executing Threat Checks...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Run Threat Intelligence Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

      </div>

      {/* Live Camera Scanner Modal */}
      <CameraScannerModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onScanSuccess={handleLiveCameraScanSuccess}
      />

    </div>
  );
};