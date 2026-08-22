import { calculateComprehensiveRisk } from '../engine/riskCalculator';
import { SCAM_SCENARIOS } from '../data/scamScenarios';

for (const s of SCAM_SCENARIOS.filter(s => s.expectedRisk === 'SAFE')) {
  console.log(`=== ${s.id} ===`);
  const res = calculateComprehensiveRisk(s.rawInput, s.inputType);
  console.log('Detected risk:', res.riskLevel, 'Score:', res.riskScore);
  console.log('Red flags:', res.redFlags);
}
