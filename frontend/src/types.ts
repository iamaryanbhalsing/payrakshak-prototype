export type RiskLevel = 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type VerdictAction = 
  | 'PROCEED_SAFE' 
  | 'VERIFY_RECEIVER' 
  | 'DO_NOT_OPEN_LINK' 
  | 'CANCEL_PAYMENT' 
  | 'REPORT_1930';

export interface RedFlag {
  id: string;
  category: 'urgency' | 'phishing_domain' | 'inverted_collect' | 'vpa_spoof' | 'remote_app' | 'advance_fee' | 'blacklisted' | 'anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  ruleTriggered: string;
  recommendation: string;
}

export interface ParsedUpiDetails {
  rawUri?: string;
  payeeVpa?: string;
  payeeName?: string;
  amount?: string;
  currency?: string;
  transactionNote?: string;
  merchantCode?: string;
  merchantCategory?: string;
  refUrl?: string;
  transactionId?: string;
  isCollectRequest?: boolean;
  handle?: string;
  handleBank?: string;
  isVerifiedMerchant?: boolean;
  detectedIntent?: 'PAYMENT_DEBIT' | 'COLLECT_CREDIT_TRAP' | 'UNKNOWN';
}

export interface MultilingualAlert {
  language: string;
  languageCode: string;
  headline: string;
  explanation: string;
  actionGuidance: string;
  ivrSpeechScript: string;
  smsAlertTemplate: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  inputType: 'text' | 'qr' | 'link' | 'vpa' | 'comprehensive';
  riskScore: number;
  riskLevel: RiskLevel;
  verdictAction: VerdictAction;
  headline: string;
  summary: string;
  plainExplanation: string;
  confidenceScore: number;
  redFlags: RedFlag[];
  safetyChecklist: string[];
  actionSteps: string[];
  parsedUpi?: ParsedUpiDetails;
  detectedUrls?: string[];
  multilingualAlerts: Record<string, MultilingualAlert>;
  latencyMs: number;
  seniorCitizenSummary: {
    simpleWarning: string;
    whatToDo: string;
    whatNotToDo: string;
    familyAlertNeeded: boolean;
  };
}

export interface CybercrimeReportData {
  reportId: string;
  timestamp: string;
  incidentType: string;
  suspectVpa?: string;
  suspectName?: string;
  suspectPhone?: string;
  suspectUrl?: string;
  amountAttempted?: string;
  evidenceSummary: string;
  fullNarrative: string;
  reportingGuideSteps: string[];
  officialHelplines: {
    name: string;
    numberOrUrl: string;
    description: string;
  }[];
}

export interface ScenarioItem {
  id: string;
  title: string;
  category: string;
  targetPersona: 'Senior Citizen' | 'Student' | 'Small Business' | 'General Public';
  rawInput: string;
  inputType: 'text' | 'qr' | 'link' | 'vpa';
  expectedRisk: RiskLevel;
  description: string;
  scamMechanic: string;
  tags: string[];
}

export interface BenchmarkReport {
  evaluatedAt: string;
  totalCases: number;
  passedCount: number;
  failedCount: number;
  accuracy: string;
  targetAccuracy: string;
  accuracyTargetMet: boolean;
  avgLatencyMs: number;
  targetLatencyTextMs: number;
  targetLatencyQrMs: number;
  latencyTargetMet: boolean;
  totalDurationMs: number;
  metrics: {
    truePositives: number;
    trueNegatives: number;
    falsePositives: number;
    falseNegatives: number;
    precision: number;
    recall: number;
  };
  scenarios: Array<{
    scenarioId: string;
    title: string;
    category: string;
    persona: string;
    inputType: string;
    expectedRisk: string;
    detectedRisk: string;
    riskScore: number;
    verdictAction: string;
    latencyMs: number;
    isMatch: boolean;
    redFlagsCount: number;
    redFlags: string[];
  }>;
}
