// Indian UPI & Cyber Threat Intelligence Database

export interface KnownThreatPattern {
  id: string;
  category: 'urgency' | 'phishing_domain' | 'inverted_collect' | 'vpa_spoof' | 'remote_app' | 'advance_fee' | 'blacklisted' | 'anomaly';
  keywords: string[];
  patterns: RegExp[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  mechanic: string;
}

export const KNOWN_THREAT_PATTERNS: KnownThreatPattern[] = [
  {
    id: 'ELECTRICITY_DISCONNECTION_SCAM',
    category: 'urgency',
    keywords: [
      'electricity', 'disconnected', 'power will be disconnected', '9:30 pm', 'electricity bill', 
      'bijli', 'power supply', 'disconnection', 'electricity officer', 'bill update', 'mahadiscom',
      'tatapower', 'bses', 'hescom', 'bescom', 'wesco', 'tneb', 'uppcl', 'dhbvn', 'sbpdcl'
    ],
    patterns: [
      /(electricity|power).*?(disconnect|bill|tonight|9[:.]30)/i,
      /(dear customer).*?(electricity).*?(disconnected)/i,
      /(bill).*?(unpaid|update).*?(officer|call).*?(contact|\d{10})/i
    ],
    severity: 'critical',
    title: 'Electricity Bill Disconnection Panic Scam',
    description: 'Scammers create artificial panic claiming power will be cut tonight at 9:30 PM unless you call an unauthorized number or pay via an unverified link/APK.',
    mechanic: 'Victims panic and call a scammer posing as an electricity officer who sends a phishing APK or asks for remote access to steal money.'
  },
  {
    id: 'OLX_ARMY_OFFICER_QR_COLLECT',
    category: 'inverted_collect',
    keywords: [
      'olx', 'quikr', 'army officer', 'cisf', 'defence', 'transfer order', 'advance token', 
      'scan qr to receive', 'enter upi pin to receive', 'bar code scan', 'receive advance'
    ],
    patterns: [
      /(scan|open).*?(qr|barcode).*?(receive|get|credit)/i,
      /(enter|type).*?(pin|upi pin).*?(receive|accept|credit)/i,
      /(army|cisf|defence).*?(transfer|deposit|advance|token)/i
    ],
    severity: 'critical',
    title: 'Inverted UPI QR / Collect Trap ("Scan to Receive")',
    description: 'The golden rule of UPI: You NEVER scan a QR code or enter your UPI PIN to RECEIVE money. Entering your PIN always DEBITS money from your account.',
    mechanic: 'Scammer poses as a buyer or army officer, sends a QR code or collect request saying "Scan this to receive advance payment", which actually drains the victim account.'
  },
  {
    id: 'BANK_KYC_ACCOUNT_SUSPENSION',
    category: 'phishing_domain',
    keywords: [
      'sbi', 'hdfc', 'icici', 'pnb', 'axis', 'bank', 'kyc', 'pan card', 'aadhaar', 'account blocked', 
      'yono', 'suspended', 'deactivated', 'update immediately', 'netbanking', 'unblock'
    ],
    patterns: [
      /(dear customer|sbi|hdfc|icici|pnb).*?(kyc|pan).*?(block|suspend|expire|deactivate)/i,
      /(update|link).*?(pan|aadhaar|kyc).*?(click|link|http)/i
    ],
    severity: 'critical',
    title: 'Fake Bank KYC / Account Suspension Phishing',
    description: 'Fraudulent SMS posing as SBI Yono, HDFC, or ICICI warning your bank account will be blocked unless you click a link or update PAN/Aadhaar.',
    mechanic: 'The link opens a fake phishing portal that steals Netbanking login, UPI MPIN, or debit card OTP.'
  },
  {
    id: 'KBC_LOTTERY_TELEGRAM_JOB',
    category: 'advance_fee',
    keywords: [
      'kbc', 'lottery', '25 lakh', 'kaun banega crorepati', 'telegram', 'task', 'youtube like', 
      'part time job', 'daily earn', 'registration fee', 'processing fee', 'winner', 'amitabh'
    ],
    patterns: [
      /(won|winner|lottery|kbc).*?(\d+\s*(lakh|crore|thousand)|prize)/i,
      /(part.?time|daily earn|like youtube).*?(salary|task|vip|deposit)/i,
      /(registration|security|processing|tax)\s*(fee|deposit|charge)/i
    ],
    severity: 'critical',
    title: 'Fake Lottery / Telegram Task Advance-Fee Fraud',
    description: 'Promises large lottery prizes (KBC 25 Lakh) or easy online job earnings in exchange for an upfront "processing/registration/GST fee".',
    mechanic: 'Once the initial fee is transferred via UPI, the scammer disappears or demands more fees under new pretexts.'
  },
  {
    id: 'REMOTE_ACCESS_SCREENSHARE',
    category: 'remote_app',
    keywords: [
      'anydesk', 'teamviewer', 'rustdesk', 'quicksupport', 'screen share', 'apk', 'download app', 
      'customer care', 'toll free', 'support desk', 'helpline'
    ],
    patterns: [
      /(install|download).*?(anydesk|teamviewer|rustdesk|quicksupport|apk)/i,
      /(customer care|helpline|support).*?(install|grant|allow|code)/i
    ],
    severity: 'critical',
    title: 'Remote Screen-Share (AnyDesk / TeamViewer) Trap',
    description: 'Scammers posing as customer care trick you into installing remote desktop apps like AnyDesk, TeamViewer, or malicious APKs to view your screen.',
    mechanic: 'Once installed, scammers watch you type your UPI PIN or intercept banking OTPs in real-time, stealing your entire account balance.'
  },
  {
    id: 'PARCEL_COURIER_CUSTOMS_PHISHING',
    category: 'phishing_domain',
    keywords: [
      'india post', 'speed post', 'courier', 'bluedart', 'delhivery', 'parcel stuck', 
      'address incomplete', 'customs fee', 'pay rs 5', 'pay rs 10', 'reschedule delivery'
    ],
    patterns: [
      /(parcel|package|courier|india post|bluedart).*?(stuck|address|pending|fail)/i,
      /(update address|reschedule).*?(pay|charge|http|\d+)/i
    ],
    severity: 'high',
    title: 'Postal / Courier Delivery Phishing Scam',
    description: 'Fake SMS alleging your package cannot be delivered due to wrong address. Asks you to pay a nominal ₹5 or ₹10 fee on a phishing website.',
    mechanic: 'The ₹5 payment gateway is a fake cloned page that captures all entered card/UPI credentials.'
  }
];

export const KNOWN_SUSPICIOUS_DOMAINS = [
  'sbi-kyc-update', 'yono-sbi-portal', 'hdfc-kyc-verify', 'icici-rewards-claim',
  'paytm-refund-desk', 'tatapower-billpay', 'bescom-online-bill', 'electricity-officer',
  'indiapost-tracking-help', 'kbc-lottery-winner', 'telegram-vip-tasks', 'apk-downloader-free',
  'tinyurl.com', 'bit.ly', 'is.gd', 'cutt.ly', 'rb.gy', 't.ly', 'shorturl.at'
];

export const KNOWN_SUSPICIOUS_HANDLES = [
  'ok1cici', 'ybl-support', 'oksbi-kyc', 'paytm-refund', 'phonepe-helpdesk',
  'airtel-officer', 'bses-billing', 'lottery-tax', 'tatapower-pay'
];

export const OFFICIAL_PSP_HANDLES: Record<string, string> = {
  'okaxis': 'Axis Bank (Google Pay)',
  'okhdfcbank': 'HDFC Bank (Google Pay)',
  'okicici': 'ICICI Bank (Google Pay)',
  'oksbi': 'State Bank of India (Google Pay)',
  'ybl': 'YES Bank (PhonePe)',
  'ibl': 'IndusInd Bank (PhonePe)',
  'axl': 'Axis Bank (PhonePe)',
  'paytm': 'Paytm Payments Bank',
  'kotak': 'Kotak Mahindra Bank',
  'postbank': 'India Post Payments Bank',
  'barodampay': 'Bank of Baroda',
  'upi': 'NPCI Official UPI',
  'federal': 'Federal Bank',
  'pnb': 'Punjab National Bank',
  'icici': 'ICICI Bank iMobile',
  'sbi': 'State Bank of India YONO'
};

export const MERCHANT_CATEGORY_CODES: Record<string, string> = {
  '5411': 'Grocery Stores / Supermarkets',
  '5812': 'Eating Places / Restaurants',
  '4900': 'Utilities - Electric, Gas, Water',
  '5912': 'Drug Stores and Pharmacies',
  '5311': 'Department Stores',
  '5541': 'Service Stations / Petrol Pumps',
  '4814': 'Telecommunication Services',
  '6011': 'Financial Institutions - Automated Cash',
  '6012': 'Financial Institutions - Merchandise and Services',
  '8999': 'Professional Services (Not Elsewhere Classified)'
};
