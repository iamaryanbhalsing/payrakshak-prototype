import { ParsedUpiDetails } from '../types';
import { OFFICIAL_PSP_HANDLES, MERCHANT_CATEGORY_CODES } from './threatDb';

export function parseUpiUri(rawInput: string): ParsedUpiDetails {
  const trimmed = rawInput.trim();
  let uriStr = trimmed;

  if (!uriStr.startsWith('upi://') && !uriStr.includes('pa=')) {
    if (trimmed.includes('@') && !trimmed.includes(' ')) {
      const parts = trimmed.split('@');
      const handle = parts[1]?.toLowerCase();
      return {
        payeeVpa: trimmed,
        handle,
        handleBank: handle ? (OFFICIAL_PSP_HANDLES[handle] || 'Custom / Unregistered PSP Handle') : undefined,
        detectedIntent: 'PAYMENT_DEBIT'
      };
    }
  }

  const isCollectRequest = uriStr.startsWith('upi://collect');
  const queryIndex = uriStr.indexOf('?');
  const queryStr = queryIndex >= 0 ? uriStr.substring(queryIndex + 1) : uriStr;
  
  const params = new URLSearchParams(queryStr);
  const payeeVpa = params.get('pa') || undefined;
  const payeeName = params.get('pn') || undefined;
  const amount = params.get('am') || undefined;
  const currency = params.get('cu') || 'INR';
  const transactionNote = params.get('tn') || undefined;
  const merchantCode = params.get('mc') || undefined;
  const refUrl = params.get('url') || undefined;
  const transactionId = params.get('tr') || params.get('tid') || undefined;

  let handle: string | undefined = undefined;
  let handleBank: string | undefined = undefined;
  
  if (payeeVpa && payeeVpa.includes('@')) {
    const parts = payeeVpa.split('@');
    handle = parts[1]?.toLowerCase();
    handleBank = handle ? (OFFICIAL_PSP_HANDLES[handle] || 'Custom / Unregistered Bank Handle') : undefined;
  }

  let merchantCategory: string | undefined = undefined;
  let isVerifiedMerchant = false;
  if (merchantCode) {
    merchantCategory = MERCHANT_CATEGORY_CODES[merchantCode] || `Official Merchant Code (${merchantCode})`;
    isVerifiedMerchant = true;
  }

  let detectedIntent: 'PAYMENT_DEBIT' | 'COLLECT_CREDIT_TRAP' | 'UNKNOWN' = 'PAYMENT_DEBIT';
  if (isCollectRequest) {
    detectedIntent = 'COLLECT_CREDIT_TRAP';
  } else if (transactionNote) {
    const lowerNote = transactionNote.toLowerCase();
    if (lowerNote.includes('receive') || lowerNote.includes('refund') || lowerNote.includes('cashback') || lowerNote.includes('credit')) {
      detectedIntent = 'COLLECT_CREDIT_TRAP';
    }
  }

  return {
    rawUri: trimmed,
    payeeVpa,
    payeeName,
    amount,
    currency,
    transactionNote,
    merchantCode,
    merchantCategory,
    refUrl,
    transactionId,
    isCollectRequest,
    handle,
    handleBank,
    isVerifiedMerchant,
    detectedIntent
  };
}
