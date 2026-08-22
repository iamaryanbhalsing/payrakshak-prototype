import { calculateComprehensiveRisk } from '../engine/riskCalculator';
import { SCAM_SCENARIOS } from '../data/scamScenarios';

let correct = 0;
let total = SCAM_SCENARIOS.length;

console.log('--------------------------------------------------------------------------------');
console.log('PAYRAKSHAK RISK ANALYSIS ENGINE - AUTOMATED BENCHMARK EVALUATION');
console.log('--------------------------------------------------------------------------------');

for (const s of SCAM_SCENARIOS) {
  const t0 = Date.now();
  const res = calculateComprehensiveRisk(s.rawInput, s.inputType);
  const latency = Date.now() - t0;
  
  const isThreatExpected = s.expectedRisk !== 'SAFE';
  const isThreatDetected = res.riskLevel !== 'SAFE';
  const passed = (s.expectedRisk === 'SAFE' && res.riskLevel === 'SAFE') || (isThreatExpected && isThreatDetected);
  
  if (passed) correct++;
  
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} | [${s.targetPersona.padEnd(14)}] | Expected: ${s.expectedRisk.padEnd(8)} | Got: ${res.riskLevel.padEnd(8)} (${String(res.riskScore).padStart(3)}/100) | ${latency}ms | ${s.title}`);
}

const accuracy = Math.round((correct / total) * 100);
console.log('--------------------------------------------------------------------------------');
console.log(`TOTAL SCENARIOS EVALUATED: ${total}`);
console.log(`PASSED: ${correct} / ${total}`);
console.log(`BENCHMARK ACCURACY: ${accuracy}% (PRD Target: >80%) -> ${accuracy >= 80 ? '🎯 PASSED' : 'FAILED'}`);
console.log('--------------------------------------------------------------------------------');
