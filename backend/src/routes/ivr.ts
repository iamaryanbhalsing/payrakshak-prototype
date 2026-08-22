import { Router, Request, Response } from 'express';
import { MULTILINGUAL_TEMPLATES } from '../data/translations';

export const ivrRouter = Router();

ivrRouter.post('/simulate-call', (req: Request, res: Response) => {
  try {
    const { riskLevel, language = 'hi', userName = 'Citizen' } = req.body;

    const langData = MULTILINGUAL_TEMPLATES[language] || MULTILINGUAL_TEMPLATES['en'];
    const levelKey = (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') ? 'critical' : (riskLevel === 'MEDIUM' || riskLevel === 'LOW') ? 'medium' : 'safe';
    const template = langData.templates[levelKey];

    const ivrResponse = {
      sessionId: `IVR_${Date.now()}`,
      languageCode: language,
      languageName: langData.name,
      callerId: 'PAYRAKSHAK-SHIELD (1800-RAKSHAK)',
      callStatus: 'CONNECTED',
      audioChime: levelKey === 'critical' ? 'danger_alarm' : levelKey === 'medium' ? 'warning_beep' : 'safe_chime',
      speechScript: template.ivrSpeechScript,
      keypadOptions: [
        { digit: '1', action: 'REPEAT_EXPLANATION', label: 'Repeat risk explanation' },
        { digit: '2', action: 'ALERT_FAMILY_GUARDIAN', label: 'Send urgent SMS alert to Rakshak Circle Family Contact' },
        { digit: '3', action: 'CONNECT_CYBER_HELPLINE_1930', label: 'Call 1930 Cyber Helpline' },
        { digit: '9', action: 'CANCEL_AND_EXIT', label: 'Cancel & Dismiss' }
      ]
    };

    return res.json(ivrResponse);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'IVR simulation failed' });
  }
});

ivrRouter.post('/generate-sms', (req: Request, res: Response) => {
  try {
    const { riskLevel, language = 'en', victimPhone, guardianPhone, amount, payeeVpa } = req.body;

    const langData = MULTILINGUAL_TEMPLATES[language] || MULTILINGUAL_TEMPLATES['en'];
    const levelKey = (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') ? 'critical' : (riskLevel === 'MEDIUM' || riskLevel === 'LOW') ? 'medium' : 'safe';
    const template = langData.templates[levelKey];

    const victimSms = `${template.smsAlertTemplate}${payeeVpa ? ` [Payee: ${payeeVpa}]` : ''}${amount ? ` [Amt: ₹${amount}]` : ''}`;
    
    let guardianSms = '';
    if (levelKey === 'critical' || levelKey === 'medium') {
      guardianSms = `🚨 PAYRAKSHAK GUARDIAN ALERT: Your family member (${victimPhone || 'Senior Citizen'}) encountered a ${riskLevel} RISK UPI SCAM (${payeeVpa || 'Unknown Payee'}). Advisory: Check on them immediately and ensure they DO NOT enter UPI PIN!`;
    }

    return res.json({
      victimSms,
      guardianSms,
      language: langData.name,
      sentAt: new Date().toISOString()
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'SMS generation failed' });
  }
});
