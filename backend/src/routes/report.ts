import { Router, Request, Response } from 'express';
import { CybercrimeReportData } from '../types';

export const reportRouter = Router();

reportRouter.post('/generate-1930', (req: Request, res: Response) => {
  try {
    const { 
      incidentType, 
      suspectVpa, 
      suspectName, 
      suspectPhone, 
      suspectUrl, 
      amountAttempted, 
      rawInput, 
      evidenceNote,
      detectedRedFlags 
    } = req.body;

    const reportId = `CC1930_${Date.now()}_${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    let narrative = `INCIDENT REPORT FOR NATIONAL CYBER CRIME HELPLINE 1930 / CYBERCRIME.GOV.IN\n`;
    narrative += `Report Ref: ${reportId}\n`;
    narrative += `Date & Time of Incident Detection: ${timestamp} IST\n`;
    narrative += `Incident Category: ${incidentType || 'UPI Financial Cyber Fraud Attempt'}\n\n`;
    
    narrative += `1. SUSPECT DETAILS:\n`;
    if (suspectVpa) narrative += `• Suspect UPI ID / VPA: ${suspectVpa}\n`;
    if (suspectName) narrative += `• Suspect Display / Claimed Name: ${suspectName}\n`;
    if (suspectPhone) narrative += `• Suspect Contact Number: ${suspectPhone}\n`;
    if (suspectUrl) narrative += `• Malicious Phishing URL: ${suspectUrl}\n`;
    if (amountAttempted) narrative += `• Amount Involved / Attempted: ₹${amountAttempted}\n\n`;

    narrative += `2. EVIDENCE & SCAM MECHANIC:\n`;
    narrative += `• Raw Message / Payment Payload: "${rawInput || 'N/A'}"\n`;
    if (detectedRedFlags && Array.isArray(detectedRedFlags)) {
      narrative += `• Detected Fraud Indicators:\n`;
      detectedRedFlags.forEach((f: any, idx: number) => {
        narrative += `   ${idx + 1}. [${f.category.toUpperCase()}] ${f.title} - ${f.description}\n`;
      });
    }
    if (evidenceNote) {
      narrative += `• Additional Victim Note: ${evidenceNote}\n`;
    }

    narrative += `\n3. ACTION REQUESTED:\n`;
    narrative += `• Block and blacklist the suspect UPI VPA / phone number across the NPCI UPI network.\n`;
    narrative += `• Initiate frozen account lien if any funds were transferred.\n`;
    narrative += `• Takedown of malicious phishing domain.\n`;

    const reportingGuideSteps = [
      'Step 1: Dial 1930 immediately (National Cyber Crime Reporting Helpline, available 24/7 across India).',
      'Step 2: Provide the Police Operator with your Bank Name, Account Number, and the Suspect UPI ID listed in this report.',
      'Step 3: If within the "Golden Hour" (first 2-4 hours), police can freeze the recipient wallet before money is withdrawn.',
      'Step 4: Visit https://cybercrime.gov.in, choose "Report Financial Fraud", and paste this pre-filled incident text.',
      'Step 5: Contact your bank branch or call your bank\'s official fraud helpline to block netbanking/cards if credentials were shared.'
    ];

    const officialHelplines = [
      {
        name: 'National Cyber Crime Helpline',
        numberOrUrl: '1930',
        description: 'Toll-free 24x7 emergency helpline for reporting digital financial fraud in India.'
      },
      {
        name: 'National Cyber Crime Portal',
        numberOrUrl: 'https://cybercrime.gov.in',
        description: 'Official Government of India portal for filing cybercrime complaints and FIRs.'
      },
      {
        name: 'Sanchar Saathi (Chakshu Portal)',
        numberOrUrl: 'https://sancharsaathi.gov.in',
        description: 'DoT portal to report suspected fraudulent SMS, WhatsApp calls, and spoofed numbers.'
      },
      {
        name: 'RBI Sachet Portal',
        numberOrUrl: 'https://sachet.rbi.org.in',
        description: 'Reserve Bank of India portal for reporting illegal financial schemes and fraudulent entities.'
      }
    ];

    const reportData: CybercrimeReportData = {
      reportId,
      timestamp,
      incidentType: incidentType || 'UPI Financial Fraud',
      suspectVpa,
      suspectName,
      suspectPhone,
      suspectUrl,
      amountAttempted,
      evidenceSummary: rawInput || 'Suspicious payment/message payload',
      fullNarrative: narrative,
      reportingGuideSteps,
      officialHelplines
    };

    return res.json(reportData);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Report generation failed' });
  }
});
