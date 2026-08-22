import { Router, Request, Response } from 'express';
import { SCAM_SCENARIOS } from '../data/scamScenarios';
import { calculateComprehensiveRisk } from '../engine/riskCalculator';

export const benchmarkRouter = Router();

// GET all curated scenarios
benchmarkRouter.get('/scenarios', (req: Request, res: Response) => {
  return res.json(SCAM_SCENARIOS);
});

// POST run benchmark test suite
benchmarkRouter.post('/run', (req: Request, res: Response) => {
  const startTime = Date.now();
  const results = [];
  let correctCount = 0;
  let totalLatency = 0;
  let truePositives = 0;
  let trueNegatives = 0;
  let falsePositives = 0;
  let falseNegatives = 0;

  for (const scenario of SCAM_SCENARIOS) {
    const itemStart = Date.now();
    const analysis = calculateComprehensiveRisk(scenario.rawInput, scenario.inputType);
    const itemLatency = Date.now() - itemStart;
    totalLatency += itemLatency;

    const isExpectedThreat = scenario.expectedRisk === 'CRITICAL' || scenario.expectedRisk === 'HIGH' || scenario.expectedRisk === 'MEDIUM';
    const isDetectedThreat = analysis.riskLevel === 'CRITICAL' || analysis.riskLevel === 'HIGH' || analysis.riskLevel === 'MEDIUM';

    // Accuracy match:
    // Safe -> Safe
    // Threat -> Threat
    let isMatch = false;
    if (scenario.expectedRisk === 'SAFE' && analysis.riskLevel === 'SAFE') {
      isMatch = true;
      trueNegatives++;
    } else if (isExpectedThreat && isDetectedThreat) {
      isMatch = true;
      truePositives++;
    } else if (!isExpectedThreat && isDetectedThreat) {
      falsePositives++;
    } else {
      falseNegatives++;
    }

    if (isMatch) {
      correctCount++;
    }

    results.push({
      scenarioId: scenario.id,
      title: scenario.title,
      category: scenario.category,
      persona: scenario.targetPersona,
      inputType: scenario.inputType,
      expectedRisk: scenario.expectedRisk,
      detectedRisk: analysis.riskLevel,
      riskScore: analysis.riskScore,
      verdictAction: analysis.verdictAction,
      latencyMs: itemLatency,
      isMatch,
      redFlagsCount: analysis.redFlags.length,
      redFlags: analysis.redFlags.map(f => f.title)
    });
  }

  const totalScenarios = SCAM_SCENARIOS.length;
  const accuracyPercentage = Math.round((correctCount / totalScenarios) * 100);
  const avgLatencyMs = Math.round(totalLatency / totalScenarios);
  const totalDurationMs = Date.now() - startTime;

  const benchmarkReport = {
    evaluatedAt: new Date().toISOString(),
    totalCases: totalScenarios,
    passedCount: correctCount,
    failedCount: totalScenarios - correctCount,
    accuracy: `${accuracyPercentage}%`,
    targetAccuracy: '> 80%',
    accuracyTargetMet: accuracyPercentage >= 80,
    avgLatencyMs,
    targetLatencyTextMs: 3000,
    targetLatencyQrMs: 5000,
    latencyTargetMet: avgLatencyMs < 3000,
    totalDurationMs,
    metrics: {
      truePositives,
      trueNegatives,
      falsePositives,
      falseNegatives,
      precision: truePositives + falsePositives > 0 ? Math.round((truePositives / (truePositives + falsePositives)) * 100) : 100,
      recall: truePositives + falseNegatives > 0 ? Math.round((truePositives / (truePositives + falseNegatives)) * 100) : 100
    },
    scenarios: results
  };

  return res.json(benchmarkReport);
});
