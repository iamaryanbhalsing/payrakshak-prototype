"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeTextPatterns = analyzeTextPatterns;
const threatDb_1 = require("./threatDb");
function analyzeTextPatterns(text) {
    const normalized = text.toLowerCase();
    const redFlags = [];
    const detectedPatterns = [];
    let urgencyScore = 0;
    let invertedCollectScore = 0;
    let remoteAppScore = 0;
    let advanceFeeScore = 0;
    let phishingScore = 0;
    // Extract URLs
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const extractedUrls = text.match(urlRegex) || [];
    // Check known threat patterns
    for (const threat of threatDb_1.KNOWN_THREAT_PATTERNS) {
        let matched = false;
        // Pattern regex match first (highest fidelity)
        for (const pat of threat.patterns) {
            if (pat.test(text)) {
                matched = true;
                break;
            }
        }
        // Contextual composite keyword match
        if (!matched) {
            if (threat.id === 'ELECTRICITY_DISCONNECTION_SCAM') {
                const hasPower = ['electricity', 'bijli', 'power', 'tatapower', 'bses', 'bescom', 'hescom', 'mahadiscom', 'sbpdcl', 'uppcl', 'dhbvn'].some(k => normalized.includes(k));
                const hasThreat = ['disconnect', '9:30', 'unpaid bill', 'officer', 'call immediately'].some(k => normalized.includes(k));
                if (hasPower && hasThreat)
                    matched = true;
            }
            else if (threat.id === 'BANK_KYC_ACCOUNT_SUSPENSION') {
                const hasBank = ['sbi', 'yono', 'hdfc', 'icici', 'pnb', 'axis', 'bank'].some(k => normalized.includes(k));
                const hasKycSuspension = ['kyc', 'pan', 'aadhaar', 'blocked', 'suspended', 'deactivated', 'expire'].some(k => normalized.includes(k));
                const hasAction = ['click', 'update', 'verify', 'link', 'http'].some(k => normalized.includes(k));
                if (hasBank && hasKycSuspension && (hasAction || extractedUrls.length > 0))
                    matched = true;
            }
            else if (threat.id === 'KBC_LOTTERY_TELEGRAM_JOB') {
                const hasReward = ['kbc', 'lottery', '25 lakh', 'crorepati', 'winner', 'youtube like', 'part time job'].some(k => normalized.includes(k));
                const hasDeposit = ['fee', 'charge', 'deposit', 'tax', 'registration', 'gst'].some(k => normalized.includes(k));
                if (hasReward && hasDeposit)
                    matched = true;
            }
            else if (threat.id === 'REMOTE_ACCESS_SCREENSHARE') {
                const hasRemoteApp = ['anydesk', 'teamviewer', 'rustdesk', 'quicksupport'].some(k => normalized.includes(k));
                if (hasRemoteApp)
                    matched = true;
            }
            else if (threat.id === 'OLX_ARMY_OFFICER_QR_COLLECT') {
                const hasInvertedPrompt = (normalized.includes('scan') || normalized.includes('pin') || normalized.includes('barcode')) &&
                    (normalized.includes('receive') || normalized.includes('get money') || normalized.includes('credit'));
                const hasArmyPretext = (normalized.includes('army') || normalized.includes('cisf') || normalized.includes('defence')) &&
                    (normalized.includes('token') || normalized.includes('advance') || normalized.includes('transfer'));
                if (hasInvertedPrompt || hasArmyPretext)
                    matched = true;
            }
        }
        if (matched) {
            detectedPatterns.push(threat.id);
            if (threat.category === 'urgency') {
                urgencyScore = Math.max(urgencyScore, 85);
            }
            else if (threat.category === 'inverted_collect') {
                invertedCollectScore = Math.max(invertedCollectScore, 95);
            }
            else if (threat.category === 'remote_app') {
                remoteAppScore = Math.max(remoteAppScore, 95);
            }
            else if (threat.category === 'advance_fee') {
                advanceFeeScore = Math.max(advanceFeeScore, 90);
            }
            else if (threat.category === 'phishing_domain') {
                phishingScore = Math.max(phishingScore, 85);
            }
            redFlags.push({
                id: `FLAG_${threat.id}`,
                category: threat.category,
                severity: threat.severity,
                title: threat.title,
                description: threat.description,
                ruleTriggered: `Rule match: ${threat.id}`,
                recommendation: threat.mechanic
            });
        }
    }
    // URL Phishing check
    for (const url of extractedUrls) {
        const lowerUrl = url.toLowerCase();
        let isSuspiciousUrl = false;
        for (const susDomain of threatDb_1.KNOWN_SUSPICIOUS_DOMAINS) {
            if (lowerUrl.includes(susDomain)) {
                isSuspiciousUrl = true;
                break;
            }
        }
        if (isSuspiciousUrl) {
            phishingScore = Math.max(phishingScore, 90);
            redFlags.push({
                id: `FLAG_SUSPICIOUS_URL_${Date.now()}`,
                category: 'phishing_domain',
                severity: 'critical',
                title: 'Dangerous Phishing or Shortened URL Detected',
                description: `The message contains a suspicious link (${url}) which may lead to a cloned banking site, malware download, or credential harvester.`,
                ruleTriggered: 'Suspicious Domain / URL Shortener Rule',
                recommendation: 'Do not click the link or download any file (.apk / .exe) from it.'
            });
        }
    }
    // Specific inverted intent check: "enter pin to receive" or "scan to get cash"
    if ((normalized.includes('enter') || normalized.includes('type') || normalized.includes('input')) &&
        (normalized.includes('pin') || normalized.includes('mpin') || normalized.includes('password')) &&
        (normalized.includes('receive') || normalized.includes('credit') || normalized.includes('refund') || normalized.includes('accept'))) {
        invertedCollectScore = 100;
        redFlags.push({
            id: 'FLAG_INVERTED_PIN_SCAM',
            category: 'inverted_collect',
            severity: 'critical',
            title: 'CRITICAL: Inverted UPI PIN Trap ("Enter PIN to Receive")',
            description: 'You are being instructed to enter your UPI PIN to RECEIVE money. This is impossible in the UPI architecture — entering your PIN will IMMEDIATELY DEBIT money from your bank account.',
            ruleTriggered: 'Inverted PIN Intent Heuristic',
            recommendation: 'NEVER enter your UPI PIN to receive money. Cancel this transaction immediately.'
        });
    }
    return {
        urgencyScore,
        invertedCollectScore,
        remoteAppScore,
        advanceFeeScore,
        phishingScore,
        extractedUrls,
        detectedPatterns,
        redFlags
    };
}
