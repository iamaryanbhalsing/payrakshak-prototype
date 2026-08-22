import { Router, Request, Response } from 'express';
import { calculateComprehensiveRisk } from '../engine/riskCalculator';

export const analyzeRouter = Router();

// Text / SMS / WhatsApp Message Analysis
analyzeRouter.post('/text', (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content is required for analysis.' });
    }
    const result = calculateComprehensiveRisk(text, 'text');
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Analysis failed' });
  }
});

// QR Code / UPI Deep Link Analysis
analyzeRouter.post('/qr', (req: Request, res: Response) => {
  try {
    const { qrPayload } = req.body;
    if (!qrPayload || typeof qrPayload !== 'string') {
      return res.status(400).json({ error: 'QR code payload or UPI URI string is required.' });
    }
    const result = calculateComprehensiveRisk(qrPayload, 'qr');
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'QR analysis failed' });
  }
});

// Payment Link / URL Safety Analysis
analyzeRouter.post('/link', (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required for analysis.' });
    }
    const result = calculateComprehensiveRisk(url, 'link');
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Link analysis failed' });
  }
});

// Receiver VPA / UPI ID Lookup
analyzeRouter.post('/vpa', (req: Request, res: Response) => {
  try {
    const { vpa, claimedName } = req.body;
    if (!vpa || typeof vpa !== 'string') {
      return res.status(400).json({ error: 'UPI ID (VPA) is required.' });
    }
    const payload = claimedName ? `${vpa} (Claimed: ${claimedName})` : vpa;
    const result = calculateComprehensiveRisk(payload, 'vpa');
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'VPA lookup failed' });
  }
});

// Unified Comprehensive endpoint
analyzeRouter.post('/comprehensive', (req: Request, res: Response) => {
  try {
    const { input, inputType } = req.body;
    if (!input || typeof input !== 'string') {
      return res.status(400).json({ error: 'Input is required.' });
    }
    const result = calculateComprehensiveRisk(input, inputType || 'comprehensive');
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Comprehensive analysis failed' });
  }
});
