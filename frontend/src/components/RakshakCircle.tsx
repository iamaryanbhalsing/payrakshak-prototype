import React, { useState } from 'react';
import { HeartHandshake, Shield, Bell, Users, Plus, Trash2, CheckCircle2, Send, AlertTriangle, Smartphone, Info } from 'lucide-react';
import { AnalysisResult } from '../types';

interface RakshakCircleProps {
  lastAnalysis?: AnalysisResult;
  seniorMode: boolean;
}

interface GuardianContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  notifyOnCritical: boolean;
}

export const RakshakCircle: React.FC<RakshakCircleProps> = ({
  lastAnalysis,
  seniorMode
}) => {
  const [guardians, setGuardians] = useState<GuardianContact[]>([
    {
      id: 'G1',
      name: 'Priya Sharma (Daughter)',
      relation: 'Daughter',
      phone: '+91 98112 34567',
      notifyOnCritical: true
    },
    {
      id: 'G2',
      name: 'Amit Sharma (Son)',
      relation: 'Son',
      phone: '+91 98223 45678',
      notifyOnCritical: true
    }
  ]);

  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('Son / Daughter');
  const [newPhone, setNewPhone] = useState('');
  const [alertSent, setAlertSent] = useState(false);

  const handleAddGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const newContact: GuardianContact = {
      id: `G_${Date.now()}`,
      name: `${newName} (${newRelation})`,
      relation: newRelation,
      phone: newPhone,
      notifyOnCritical: true
    };

    setGuardians([...guardians, newContact]);
    setNewName('');
    setNewPhone('');
  };

  const handleRemoveGuardian = (id: string) => {
    setGuardians(guardians.filter((g) => g.id !== id));
  };

  const triggerTestGuardianAlert = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 className={`font-bold tracking-tight text-white ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
              Rakshak Circle: Family Protection Network
            </h2>
            <p className="text-xs text-slate-400">
              Automatically alerts trusted family members if a senior citizen scans a critical UPI scam.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Guardians List & Add Guardian */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Guardians List */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-100 text-sm sm:text-base flex items-center space-x-2">
                <Users className="w-4 h-4 text-sky-400" />
                <span>Registered Family Guardians ({guardians.length})</span>
              </h3>
              <button
                onClick={triggerTestGuardianAlert}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Simulate Emergency Push</span>
              </button>
            </div>

            {alertSent && (
              <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs flex items-center space-x-2.5 animate-pulse">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Urgent SMS & WhatsApp Notification successfully sent to all {guardians.length} guardians!</span>
              </div>
            )}

            <div className="space-y-3">
              {guardians.map((g) => (
                <div
                  key={g.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
                      {g.relation.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{g.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">{g.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="hidden sm:inline text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Active Shield Contact
                    </span>
                    <button
                      onClick={() => handleRemoveGuardian(g.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Remove contact"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Guardian Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
            <h3 className="font-bold text-slate-100 text-sm sm:text-base mb-4 flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add New Guardian / Caregiver Contact</span>
            </h3>

            <form onSubmit={handleAddGuardian} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Guardian Full Name"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-sky-500"
                required
              />
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Mobile Number (+91 ...)"
                className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-sky-500"
                required
              />
              <button
                type="submit"
                className="py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Circle</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Col: Guardian Action Guide & Safety Tips */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
            <div className="flex items-center space-x-2 text-amber-400">
              <Shield className="w-5 h-5" />
              <h3 className="font-bold text-slate-100 text-sm">Senior Protection Protocol</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              When an elderly family member receives a scam SMS or WhatsApp QR request, PayRakshak instantly alerts the registered family circle before money is sent.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                👉 <strong>1. Golden Rule:</strong> Remind parents that UPI PIN is <em>never</em> entered to receive money.
              </div>
              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                👉 <strong>2. Utility Bills:</strong> Set up official Auto-Pay via Bharat BillPay (BBPS) to prevent disconnection panic scams.
              </div>
              <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800">
                👉 <strong>3. Remote Screenshare:</strong> Advise never to install AnyDesk or TeamViewer at the request of an unknown caller.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};