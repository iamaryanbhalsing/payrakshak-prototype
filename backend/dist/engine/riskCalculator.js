"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateComprehensiveRisk = calculateComprehensiveRisk;
const upiParser_1 = require("./upiParser");
const nlpAnalyzer_1 = require("./nlpAnalyzer");
const receiverVerifier_1 = require("./receiverVerifier");
const translations_1 = require("../data/translations");
function calculateComprehensiveRisk(rawInput, preferredType = 'comprehensive') {
    const startTime = Date.now();
    const trimmed = rawInput.trim();
    const allRedFlags = [];
    const safetyChecklist = [];
    const actionSteps = [];
    // Determine underlying nature
    const isUpiUri = trimmed.startsWith('upi://') || trimmed.includes('pa=');
    const isDirectVpa = trimmed.includes('@') && !trimmed.includes(' ') && !trimmed.startsWith('http');
    const isUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://');
    let parsedUpi = undefined;
    if (isUpiUri || isDirectVpa) {
        parsedUpi = (0, upiParser_1.parseUpiUri)(trimmed);
    }
    // 1. NLP and text pattern analysis
    const textToAnalyze = isUpiUri ? `${trimmed} ${parsedUpi?.transactionNote || ''} ${parsedUpi?.payeeName || ''}` : trimmed;
    const nlpRes = (0, nlpAnalyzer_1.analyzeTextPatterns)(textToAnalyze);
    allRedFlags.push(...nlpRes.redFlags);
    // 2. VPA / Receiver verification
    let vpaScore = 0;
    let targetVpa = parsedUpi?.payeeVpa || (isDirectVpa ? trimmed : undefined);
    let claimedName = parsedUpi?.payeeName;
    if (targetVpa) {
        const vpaRes = (0, receiverVerifier_1.verifyReceiverVpa)(targetVpa, claimedName);
        allRedFlags.push(...vpaRes.redFlags);
        vpaScore = vpaRes.reputationScore;
        safetyChecklist.push(...vpaRes.checklist);
    }
    // 3. QR / UPI Protocol Intent Analysis
    let intentScore = 0;
    if (parsedUpi) {
        if (parsedUpi.isCollectRequest || parsedUpi.detectedIntent === 'COLLECT_CREDIT_TRAP') {
            intentScore = 98;
            allRedFlags.push({
                id: 'FLAG_INVERTED_QR_COLLECT',
                category: 'inverted_collect',
                severity: 'critical',
                title: 'Dangerous Inverted UPI Collect Trap',
                description: 'This QR code / link is a DEBIT payment request disguised as a "Receive / Refund / Cashback" action. Scanning this will request your UPI PIN to DEDUCT money.',
                ruleTriggered: 'UPI Protocol Intent Inversion Rule',
                recommendation: 'Remember: You NEVER scan QR or enter PIN to receive money!'
            });
        }
        if (parsedUpi.isVerifiedMerchant) {
            // Recognized verified MCC code reduces risk for legitimate business
            if (allRedFlags.length === 0) {
                intentScore = Math.max(0, intentScore - 20);
            }
        }
    }
    // 4. Calculate Unified Risk Score (0 - 100)
    let rawRisk = Math.max(nlpRes.invertedCollectScore, nlpRes.remoteAppScore, nlpRes.phishingScore, nlpRes.urgencyScore * 0.85, nlpRes.advanceFeeScore, vpaScore, intentScore);
    // Multiple red flags amplify risk
    if (allRedFlags.length >= 2 && rawRisk < 75) {
        rawRisk = Math.min(100, rawRisk + 20);
    }
    const finalRiskScore = Math.min(100, Math.max(0, Math.round(rawRisk)));
    // Risk Level
    let riskLevel = 'SAFE';
    if (finalRiskScore >= 80) {
        riskLevel = 'CRITICAL';
    }
    else if (finalRiskScore >= 65) {
        riskLevel = 'HIGH';
    }
    else if (finalRiskScore >= 40) {
        riskLevel = 'MEDIUM';
    }
    else if (finalRiskScore >= 20) {
        riskLevel = 'LOW';
    }
    else {
        riskLevel = 'SAFE';
    }
    // Verdict Action
    let verdictAction = 'PROCEED_SAFE';
    if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
        if (nlpRes.phishingScore >= 80 || isUrl) {
            verdictAction = 'DO_NOT_OPEN_LINK';
        }
        else if (nlpRes.invertedCollectScore >= 80 || intentScore >= 80) {
            verdictAction = 'CANCEL_PAYMENT';
        }
        else if (allRedFlags.some(f => f.category === 'blacklisted')) {
            verdictAction = 'REPORT_1930';
        }
        else {
            verdictAction = 'CANCEL_PAYMENT';
        }
    }
    else if (riskLevel === 'MEDIUM') {
        verdictAction = 'VERIFY_RECEIVER';
    }
    else {
        verdictAction = 'PROCEED_SAFE';
    }
    // Action steps and explanations
    let headline = '';
    let summary = '';
    let plainExplanation = '';
    if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
        headline = '🚨 High Risk UPI Scam Detected!';
        summary = 'PayRakshak identified high-confidence fraud patterns. Do NOT enter your UPI PIN or click suspicious links.';
        plainExplanation = allRedFlags.length > 0
            ? allRedFlags.map(f => `• ${f.title}: ${f.description}`).join('\n')
            : 'Suspicious payment request detected with high risk indicators.';
        actionSteps.push('❌ Do NOT enter your UPI PIN (You NEVER enter a PIN to receive money).');
        actionSteps.push('🚫 Do NOT install remote screen-sharing apps (AnyDesk, TeamViewer, QuickSupport).');
        actionSteps.push('📞 If someone is on a phone call with you pressuring you, HANG UP immediately.');
        actionSteps.push('📢 Report this number/UPI ID to the National Cybercrime Portal at 1930 or cybercrime.gov.in.');
    }
    else if (riskLevel === 'MEDIUM' || riskLevel === 'LOW') {
        headline = '⚠️ Caution: Verify Receiver Details First';
        summary = 'No immediate critical scam signatures, but unverified handle or vague transaction details were found.';
        plainExplanation = 'The recipient is not an established corporate merchant, or the payment details lack standard verification markers. Always double check before sending.';
        actionSteps.push('📞 Call the intended recipient on their known saved phone number to confirm the UPI ID.');
        actionSteps.push('🔍 Check the receiver name displayed inside your UPI app before entering your PIN.');
        actionSteps.push('💳 Send a test amount (e.g. ₹1) first if paying an unfamiliar vendor for the first time.');
    }
    else {
        headline = '✅ Payment Request Looks Safe';
        summary = 'No scam keywords, malicious domains, or inverted collect traps detected.';
        plainExplanation = 'The payment parameters match standard legitimate merchant or peer patterns. Standard safety precautions still apply.';
        actionSteps.push('🔍 Verify the receiver name on your UPI app matches your expectations.');
        actionSteps.push('🔐 Ensure nobody is watching your screen when you enter your UPI PIN.');
    }
    // Build Multilingual Alerts
    const templateKey = (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') ? 'critical' : (riskLevel === 'MEDIUM' || riskLevel === 'LOW') ? 'medium' : 'safe';
    const multilingualAlerts = {};
    for (const [langCode, langData] of Object.entries(translations_1.MULTILINGUAL_TEMPLATES)) {
        const tpl = langData.templates[templateKey];
        multilingualAlerts[langCode] = {
            language: langData.name,
            languageCode: langCode,
            headline: tpl.headline,
            explanation: tpl.explanation,
            actionGuidance: tpl.actionGuidance,
            ivrSpeechScript: tpl.ivrSpeechScript,
            smsAlertTemplate: tpl.smsAlertTemplate
        };
    }
    // Senior Citizen Simplified Summary
    const seniorCitizenSummary = {
        simpleWarning: (riskLevel === 'CRITICAL' || riskLevel === 'HIGH')
            ? 'सावधान! यह एक फर्जी संदेश/धोखाधड़ी हो सकती है।'
            : (riskLevel === 'MEDIUM' || riskLevel === 'LOW')
                ? 'ध्यान दें: पैसे भेजने से पहले अपने परिचित या परिवार से पूछ लें।'
                : 'यह भुगतान सुरक्षित प्रतीत होता है।',
        whatToDo: (riskLevel === 'CRITICAL' || riskLevel === 'HIGH')
            ? 'तुरंत कैंसिल करें। किसी को भी फोन पर अपनी स्क्रीन न दिखाएं।'
            : 'स्क्रीन पर दिख रहा नाम चेक करें।',
        whatNotToDo: 'अपना UPI PIN (पासवर्ड) कभी किसी को न बताएं या पैसे पाने के लिए दर्ज न करें।',
        familyAlertNeeded: (riskLevel === 'CRITICAL' || riskLevel === 'HIGH')
    };
    const latencyMs = Math.max(12, Date.now() - startTime);
    return {
        id: `PR_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        timestamp: new Date().toISOString(),
        inputType: preferredType,
        riskScore: finalRiskScore,
        riskLevel,
        verdictAction,
        headline,
        summary,
        plainExplanation,
        confidenceScore: Math.min(99, Math.max(78, 85 + allRedFlags.length * 4)),
        redFlags: allRedFlags,
        safetyChecklist,
        actionSteps,
        parsedUpi,
        detectedUrls: nlpRes.extractedUrls,
        multilingualAlerts,
        latencyMs,
        seniorCitizenSummary
    };
}
