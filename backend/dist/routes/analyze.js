"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeRouter = void 0;
const express_1 = require("express");
const riskCalculator_1 = require("../engine/riskCalculator");
exports.analyzeRouter = (0, express_1.Router)();
// Text / SMS / WhatsApp Message Analysis
exports.analyzeRouter.post('/text', (req, res) => {
    try {
        const { text } = req.body;
        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'Text content is required for analysis.' });
        }
        const result = (0, riskCalculator_1.calculateComprehensiveRisk)(text, 'text');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'Analysis failed' });
    }
});
// QR Code / UPI Deep Link Analysis
exports.analyzeRouter.post('/qr', (req, res) => {
    try {
        const { qrPayload } = req.body;
        if (!qrPayload || typeof qrPayload !== 'string') {
            return res.status(400).json({ error: 'QR code payload or UPI URI string is required.' });
        }
        const result = (0, riskCalculator_1.calculateComprehensiveRisk)(qrPayload, 'qr');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'QR analysis failed' });
    }
});
// Payment Link / URL Safety Analysis
exports.analyzeRouter.post('/link', (req, res) => {
    try {
        const { url } = req.body;
        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'URL is required for analysis.' });
        }
        const result = (0, riskCalculator_1.calculateComprehensiveRisk)(url, 'link');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'Link analysis failed' });
    }
});
// Receiver VPA / UPI ID Lookup
exports.analyzeRouter.post('/vpa', (req, res) => {
    try {
        const { vpa, claimedName } = req.body;
        if (!vpa || typeof vpa !== 'string') {
            return res.status(400).json({ error: 'UPI ID (VPA) is required.' });
        }
        const payload = claimedName ? `${vpa} (Claimed: ${claimedName})` : vpa;
        const result = (0, riskCalculator_1.calculateComprehensiveRisk)(payload, 'vpa');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'VPA lookup failed' });
    }
});
// Unified Comprehensive endpoint
exports.analyzeRouter.post('/comprehensive', (req, res) => {
    try {
        const { input, inputType } = req.body;
        if (!input || typeof input !== 'string') {
            return res.status(400).json({ error: 'Input is required.' });
        }
        const result = (0, riskCalculator_1.calculateComprehensiveRisk)(input, inputType || 'comprehensive');
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message || 'Comprehensive analysis failed' });
    }
});
