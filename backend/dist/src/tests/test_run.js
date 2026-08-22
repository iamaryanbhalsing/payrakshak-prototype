"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const riskCalculator_1 = require("../engine/riskCalculator");
const scamScenarios_1 = require("../data/scamScenarios");
for (const s of scamScenarios_1.SCAM_SCENARIOS.filter(s => s.expectedRisk === 'SAFE')) {
    console.log(`=== ${s.id} ===`);
    const res = (0, riskCalculator_1.calculateComprehensiveRisk)(s.rawInput, s.inputType);
    console.log('Detected risk:', res.riskLevel, 'Score:', res.riskScore);
    console.log('Red flags:', res.redFlags);
}
