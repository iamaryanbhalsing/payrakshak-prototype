import { AnalysisResult, CybercrimeReportData, ScenarioItem, BenchmarkReport } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function analyzeInput(input: string, inputType: 'text' | 'qr' | 'link' | 'vpa' | 'comprehensive'): Promise<AnalysisResult> {
  let endpoint = `${API_BASE}/analyze/comprehensive`;
  let body: any = { input, inputType };

  if (inputType === 'text') {
    endpoint = `${API_BASE}/analyze/text`;
    body = { text: input };
  } else if (inputType === 'qr') {
    endpoint = `${API_BASE}/analyze/qr`;
    body = { qrPayload: input };
  } else if (inputType === 'link') {
    endpoint = `${API_BASE}/analyze/link`;
    body = { url: input };
  } else if (inputType === 'vpa') {
    endpoint = `${API_BASE}/analyze/vpa`;
    body = { vpa: input };
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Server responded with ${res.status}`);
  }

  return res.json();
}

export async function generate1930Report(data: {
  incidentType?: string;
  suspectVpa?: string;
  suspectName?: string;
  suspectPhone?: string;
  suspectUrl?: string;
  amountAttempted?: string;
  rawInput?: string;
  evidenceNote?: string;
  detectedRedFlags?: any[];
}): Promise<CybercrimeReportData> {
  const res = await fetch(`${API_BASE}/report/generate-1930`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error('Failed to generate 1930 report');
  }

  return res.json();
}

export async function fetchScenarios(): Promise<ScenarioItem[]> {
  const res = await fetch(`${API_BASE}/benchmark/scenarios`);
  if (!res.ok) {
    throw new Error('Failed to fetch scam scenarios');
  }
  return res.json();
}

export async function runBenchmarkTest(): Promise<BenchmarkReport> {
  const res = await fetch(`${API_BASE}/benchmark/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });

  if (!res.ok) {
    throw new Error('Failed to run benchmark suite');
  }

  return res.json();
}

export async function simulateIvrCall(riskLevel: string, language: string) {
  const res = await fetch(`${API_BASE}/ivr/simulate-call`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ riskLevel, language })
  });
  return res.json();
}

export async function generateSmsAlert(payload: {
  riskLevel: string;
  language: string;
  victimPhone?: string;
  guardianPhone?: string;
  amount?: string;
  payeeVpa?: string;
}) {
  const res = await fetch(`${API_BASE}/ivr/generate-sms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
