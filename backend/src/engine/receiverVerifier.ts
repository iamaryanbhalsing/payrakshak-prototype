import { RedFlag } from '../types';
import { OFFICIAL_PSP_HANDLES, KNOWN_SUSPICIOUS_HANDLES } from './threatDb';

export interface ReceiverVerification {
  isValidSyntax: boolean;
  handle?: string;
  handleBank?: string;
  isOfficialPspHandle: boolean;
  isBlacklistedHandle: boolean;
  isNameMismatch: boolean;
  mismatchReason?: string;
  reputationScore: number; // 0 (Safe) to 100 (Suspicious)
  redFlags: RedFlag[];
  checklist: string[];
}

export function verifyReceiverVpa(vpa: string, claimedName?: string): ReceiverVerification {
  const cleanVpa = vpa.trim().toLowerCase();
  const redFlags: RedFlag[] = [];
  const checklist: string[] = [];

  // VPA Syntax Check
  const vpaRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z0-9.\-_]{2,64}$/;
  const isValidSyntax = vpaRegex.test(cleanVpa);

  if (!isValidSyntax) {
    redFlags.push({
      id: 'FLAG_INVALID_VPA_SYNTAX',
      category: 'anomaly',
      severity: 'high',
      title: 'Invalid or Malformed UPI ID Format',
      description: `The UPI ID "${vpa}" does not conform to the standard username@bankhandle format.`,
      ruleTriggered: 'VPA Syntax Standard Validation',
      recommendation: 'Check the UPI address carefully for typos or hidden characters.'
    });
    return {
      isValidSyntax: false,
      isOfficialPspHandle: false,
      isBlacklistedHandle: false,
      isNameMismatch: false,
      reputationScore: 70,
      redFlags,
      checklist: ['Verify the exact spelling of the UPI ID with the intended recipient.']
    };
  }

  const [username, handle] = cleanVpa.split('@');
  const handleBank = OFFICIAL_PSP_HANDLES[handle];
  const isOfficialPspHandle = !!handleBank;
  const isBlacklistedHandle = KNOWN_SUSPICIOUS_HANDLES.some(sus => cleanVpa.includes(sus) || handle.includes(sus));

  let reputationScore = 0;

  if (isBlacklistedHandle) {
    reputationScore = 95;
    redFlags.push({
      id: 'FLAG_BLACKLISTED_VPA',
      category: 'blacklisted',
      severity: 'critical',
      title: 'Blacklisted or Spoofed UPI Handle Pattern',
      description: `The handle "@${handle}" matches known fraud patterns imitating customer care, bank KYC, or utility billing desks.`,
      ruleTriggered: 'Cybercrime Intelligence Blacklist Registry',
      recommendation: 'Do NOT transfer any money to this handle. Report it to 1930 / cybercrime.gov.in.'
    });
  }

  if (!isOfficialPspHandle && !isBlacklistedHandle) {
    reputationScore += 35;
    redFlags.push({
      id: 'FLAG_UNRECOGNIZED_PSP',
      category: 'vpa_spoof',
      severity: 'medium',
      title: 'Uncommon / Unregistered Bank Handle',
      description: `The handle "@${handle}" is not in the standard NPCI major bank list (Google Pay, PhonePe, Paytm, SBI, HDFC, ICICI, etc.).`,
      ruleTriggered: 'NPCI Major PSP Handle Directory',
      recommendation: 'Double check with your bank before proceeding.'
    });
  }

  // Name Mismatch Heuristic
  let isNameMismatch = false;
  let mismatchReason: string | undefined = undefined;

  if (claimedName) {
    const normName = claimedName.toLowerCase();
    const utilityOrCorporateKeywords = [
      'electricity', 'power', 'tatapower', 'bses', 'bescom', 'hescom', 'mahadiscom', 
      'sbi', 'hdfc', 'icici', 'pnb', 'bank', 'police', 'customs', 'army', 'cisf', 
      'airtel', 'jio', 'vi', 'vodafone', 'post office', 'speed post'
    ];

    const claimsToBeOrg = utilityOrCorporateKeywords.some(kw => normName.includes(kw));

    // If claimed name looks like an organization or utility, but the VPA username looks like a private personal name / phone number
    const isPersonalVpa = /^[a-z]+[0-9]*$/i.test(username) && !utilityOrCorporateKeywords.some(kw => username.includes(kw));

    if (claimsToBeOrg && isPersonalVpa) {
      isNameMismatch = true;
      mismatchReason = `Sender claims to be "${claimedName}", but the UPI ID is registered to an individual personal account (${cleanVpa}) rather than an official corporate merchant account.`;
      reputationScore = Math.max(reputationScore, 85);
      
      redFlags.push({
        id: 'FLAG_NAME_MISMATCH_IMPERSONATION',
        category: 'vpa_spoof',
        severity: 'critical',
        title: 'Organization Impersonation & Personal Account Mismatch',
        description: mismatchReason,
        ruleTriggered: 'Merchant/Utility vs Individual VPA Divergence Rule',
        recommendation: 'Legitimate utility boards, banks, and govt agencies NEVER ask you to pay into individual personal UPI accounts.'
      });
    }
  }

  checklist.push(`Verify recipient name on your payment app screen matches the person/business you intended to pay.`);
  checklist.push(`For bills or electricity, pay directly through official utility mobile apps or the BBPS (Bharat BillPay) portal.`);
  checklist.push(`Never send money to personal numbers claiming to represent customer support.`);

  return {
    isValidSyntax: true,
    handle,
    handleBank: handleBank || 'Third-Party / Specialized Handle',
    isOfficialPspHandle,
    isBlacklistedHandle,
    isNameMismatch,
    mismatchReason,
    reputationScore,
    redFlags,
    checklist
  };
}
