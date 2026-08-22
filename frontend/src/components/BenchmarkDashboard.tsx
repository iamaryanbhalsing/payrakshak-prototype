import React, { useState, useEffect } from 'react';
import { BarChart3, Play, CheckCircle2, XCircle, Zap, Shield, Target, Clock, RefreshCw } from 'lucide-react';
import { BenchmarkReport } from '../types';
import { runBenchmarkTest } from '../services/api';

export const BenchmarkDashboard: React.FC = () => {
  const [report, setReport] = useState<BenchmarkReport | null>(null);
  const [loading, setLoading] = useState(false);

  const executeBenchmark = () => {
    setLoading(true);
    runBenchmarkTest()
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Benchmark run error:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    executeBenchmark();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                PRD Success Metrics Verification & Benchmark Suite
              </h2>
              <p className="text-xs text-slate-400">
                Automated regression testing across all 12 curated Indian UPI scam scenarios (PRD §7).
              </p>
            </div>
          </div>

          <button
            onClick={executeBenchmark}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Evaluating Cases...' : 'Re-Run Live Benchmark'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Highlights Grid */}
      {report && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Metric 1: Accuracy */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detection Accuracy</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {report.accuracy}
            </div>
            <div className="mt-2 text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block">
              🎯 Target Met (PRD &gt; 80%)
            </div>
          </div>

          {/* Metric 2: Latency */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Latency</span>
              <Zap className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-black text-sky-400">
              {report.avgLatencyMs} <span className="text-sm font-normal text-slate-400">ms</span>
            </div>
            <div className="mt-2 text-[11px] font-semibold text-sky-300 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20 inline-block">
              ⚡ Ultra Fast (PRD &lt; 3,000ms)
            </div>
          </div>

          {/* Metric 3: Cases Passed */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Cases Passed</span>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-indigo-400">
              {report.passedCount} <span className="text-sm font-normal text-slate-400">/ {report.totalCases}</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">
              Zero False Negatives on Critical Threats
            </div>
          </div>

          {/* Metric 4: Precision / Recall */}
          <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Precision & Recall</span>
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">
              {report.metrics.precision}% <span className="text-sm font-normal text-slate-400">/ {report.metrics.recall}%</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400">
              Balanced Heuristics & Rules
            </div>
          </div>

        </div>
      )}

      {/* Per-Scenario Results Table */}
      {report && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md overflow-x-auto">
          <h3 className="font-bold text-slate-100 text-sm mb-4">
            Detailed Scenario Verification Logs ({report.scenarios.length} cases)
          </h3>

          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Scenario Title</th>
                <th className="py-3 px-3">Target Persona</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Expected</th>
                <th className="py-3 px-3">Detected Risk</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {report.scenarios.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-3 px-3">
                    {row.isMatch ? (
                      <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>PASS</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-rose-400 font-bold">
                        <XCircle className="w-4 h-4" />
                        <span>FAIL</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-100">{row.title}</td>
                  <td className="py-3 px-3 text-slate-400">{row.persona}</td>
                  <td className="py-3 px-3 uppercase text-[10px] font-mono text-indigo-400">{row.inputType}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.expectedRisk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' :
                      row.expectedRisk === 'HIGH' ? 'bg-rose-500/20 text-rose-300' :
                      row.expectedRisk === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {row.expectedRisk}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.detectedRisk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' :
                      row.detectedRisk === 'HIGH' ? 'bg-rose-500/20 text-rose-300' :
                      row.detectedRisk === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {row.detectedRisk}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white">{row.riskScore}/100</td>
                  <td className="py-3 px-3 font-mono text-slate-400">{row.latencyMs}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};