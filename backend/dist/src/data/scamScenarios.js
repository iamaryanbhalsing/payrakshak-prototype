"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCAM_SCENARIOS = void 0;
exports.SCAM_SCENARIOS = [
    {
        id: 'SCENARIO_1_ELECTRICITY',
        title: 'Electricity Power Disconnection Tonight at 9:30 PM',
        category: 'Urgency & Phishing Panic',
        targetPersona: 'Senior Citizen',
        inputType: 'text',
        expectedRisk: 'CRITICAL',
        rawInput: 'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 9876543210 or update bill at http://tatapower-billpay.online',
        description: 'Scammers target panic around electricity disconnection to force immediate call or phishing link click.',
        scamMechanic: 'The victim is tricked into clicking a phishing portal or downloading a remote support APK where banking OTPs are stolen.',
        tags: ['Urgency', 'Utility Impersonation', 'Phishing Link']
    },
    {
        id: 'SCENARIO_2_OLX_QR_RECEIVE',
        title: 'OLX Buyer "Scan this QR Code to Receive ₹15,000"',
        category: 'Inverted UPI PIN Trap',
        targetPersona: 'Student',
        inputType: 'qr',
        expectedRisk: 'CRITICAL',
        rawInput: 'upi://pay?pa=scammer.cisf.army@okhdfcbank&pn=Army Officer Transfer&am=15000&cu=INR&tn=Receive advance token for sofa',
        description: 'Scammer poses as an army officer transferred to your city buying items on OLX and sends a QR code claiming it will credit your bank account.',
        scamMechanic: 'UPI QR codes can ONLY debit money. Scanning and typing UPI PIN transfers ₹15,000 out of your account instead of receiving it.',
        tags: ['Inverted Intent', 'OLX/Marketplace', 'Army Impersonation', 'Fake Advance']
    },
    {
        id: 'SCENARIO_3_SBI_KYC_BLOCKED',
        title: 'SBI Yono KYC Expired & Account Frozen Alert',
        category: 'Bank KYC Phishing',
        targetPersona: 'Senior Citizen',
        inputType: 'text',
        expectedRisk: 'CRITICAL',
        rawInput: 'Dear SBI Customer, your YONO Netbanking account will be blocked today due to pending PAN/KYC update. Click immediately to verify: https://sbi-kyc-update.com/login',
        description: 'Fake bank warning creating fear of account suspension to steal credentials.',
        scamMechanic: 'Cloned SBI YONO website asks for username, password, UPI MPIN, and SMS OTP.',
        tags: ['Bank Phishing', 'KYC Panic', 'Credential Harvester']
    },
    {
        id: 'SCENARIO_4_KBC_LOTTERY_JOB',
        title: 'KBC ₹25 Lakh Winner WhatsApp / Telegram Task Deposit',
        category: 'Advance Fee Fraud',
        targetPersona: 'Student',
        inputType: 'text',
        expectedRisk: 'CRITICAL',
        rawInput: 'Congratulations! Your mobile number won ₹25,00,000 in KBC Lottery Lucky Draw. To claim your prize money in your bank account, deposit ₹2,500 government registration fee to UPI ID: lottery-tax@okhdfcbank within 2 hours.',
        description: 'Promises impossible sums in exchange for small upfront fees.',
        scamMechanic: 'Once the ₹2,500 registration fee is paid, the scammer asks for GST fee, processing fee, and never delivers any money.',
        tags: ['Lottery Scam', 'Advance Fee', 'Unrealistic Reward']
    },
    {
        id: 'SCENARIO_5_CUSTOMER_CARE_ANYDESK',
        title: 'Customer Care Toll-Free Refund & AnyDesk App Trap',
        category: 'Remote Screen-Share',
        targetPersona: 'Senior Citizen',
        inputType: 'text',
        expectedRisk: 'CRITICAL',
        rawInput: 'Dear Customer, your pending refund of ₹3,499 from Paytm has been approved. To credit your amount directly, please install AnyDesk / QuickSupport from Play Store and contact helpline 9123456789 to share the 9-digit code.',
        description: 'Scammers trick users into granting screen share access under the guise of processing a refund.',
        scamMechanic: 'AnyDesk lets the attacker view the user phone screen, read SMS OTPs, and observe UPI PIN entry in real-time.',
        tags: ['Remote Access', 'Screen Share', 'Fake Customer Care']
    },
    {
        id: 'SCENARIO_6_INDIA_POST_PARCEL',
        title: 'India Post / Speed Post Address Failure Phishing',
        category: 'Postal Delivery Phishing',
        targetPersona: 'General Public',
        inputType: 'link',
        expectedRisk: 'HIGH',
        rawInput: 'https://indiapost-tracking-help.site/address-update?fee=5',
        description: 'Fake notification claiming your package has incorrect address and needs a ₹5 rescheduling fee.',
        scamMechanic: 'The payment gateway captures credit card numbers and UPI MPINs.',
        tags: ['Phishing Domain', 'Micro-Fee Trap', 'Courier Impersonation']
    },
    {
        id: 'SCENARIO_7_INVERTED_COLLECT_REQUEST',
        title: 'Inverted UPI Collect Deep Link (upi://collect)',
        category: 'Protocol Anomaly',
        targetPersona: 'Small Business',
        inputType: 'qr',
        expectedRisk: 'CRITICAL',
        rawInput: 'upi://collect?pa=fraud_desk@ybl-support&pn=Cashback Department&am=4999&cu=INR&tn=Approve cashback refund of 4999',
        description: 'Direct UPI collect intent attempting to trigger instant auto-debit request.',
        scamMechanic: 'Uses protocol collect intent masquerading as a refund to fool busy users into pressing "Accept".',
        tags: ['UPI Collect Intent', 'Spoofed Handle', 'Fake Cashback']
    },
    {
        id: 'SCENARIO_8_MALL_STORE_BHARATQR',
        title: 'Mother Dairy / Supermarket BharatQR Merchant Payment',
        category: 'Legitimate Payment',
        targetPersona: 'General Public',
        inputType: 'qr',
        expectedRisk: 'SAFE',
        rawInput: 'upi://pay?pa=motherdairy.store128@okaxis&pn=Mother Dairy Fruit and Veg&am=185.00&cu=INR&mc=5411&tn=Store Purchase',
        description: 'Standard merchant QR with official MCC code 5411 (Grocery) and recognized bank handle.',
        scamMechanic: 'None. Legitimate grocery merchant transaction.',
        tags: ['Legitimate Merchant', 'Safe QR', 'Verified MCC']
    },
    {
        id: 'SCENARIO_9_FRIEND_SPLIT',
        title: 'Friend GPay Dinner Bill Split (Personal VPA)',
        category: 'Legitimate Peer Transfer',
        targetPersona: 'Student',
        inputType: 'vpa',
        expectedRisk: 'SAFE',
        rawInput: 'rohit.verma@oksbi',
        description: 'Direct personal UPI ID of a known individual on an official SBI Google Pay handle.',
        scamMechanic: 'None. Normal peer-to-peer UPI transfer.',
        tags: ['Peer Transfer', 'Safe VPA', 'Official Handle']
    },
    {
        id: 'SCENARIO_10_ZOMATO_FOOD_ORDER',
        title: 'Zomato Online Food Delivery Payment Intent',
        category: 'Legitimate Payment',
        targetPersona: 'General Public',
        inputType: 'qr',
        expectedRisk: 'SAFE',
        rawInput: 'upi://pay?pa=zomato.order@icici&pn=Zomato Limited&am=420.00&cu=INR&mc=5812&tn=Order 9821482',
        description: 'Official Zomato restaurant merchant intent with MCC 5812 (Restaurant) and ICICI handle.',
        scamMechanic: 'None. Legitimate food delivery order.',
        tags: ['Legitimate Merchant', 'Verified Brand', 'Safe']
    },
    {
        id: 'SCENARIO_11_UNVERIFIED_SUPPLIER_VPA',
        title: 'New Vendor Invoice with Unrecognized Bank Handle',
        category: 'Vendor Verification',
        targetPersona: 'Small Business',
        inputType: 'vpa',
        expectedRisk: 'MEDIUM',
        rawInput: 'raw_materials_supplier@unregisteredhandle',
        description: 'Vendor payment request using an unusual or unverified bank handle suffix.',
        scamMechanic: 'Potential spoof or typosquatting. Requires calling the supplier to verify bank details before paying.',
        tags: ['Unverified Handle', 'Invoice Verification', 'Caution']
    },
    {
        id: 'SCENARIO_12_NAME_MISMATCH_UTILITY',
        title: 'Mismatched Name: "Tata Power" but Personal VPA "rohit981@paytm"',
        category: 'Impersonation Mismatch',
        targetPersona: 'Senior Citizen',
        inputType: 'qr',
        expectedRisk: 'CRITICAL',
        rawInput: 'upi://pay?pa=rohit981@paytm&pn=Tata Power Electricity Board&am=2100&cu=INR&tn=Electricity Bill Payment',
        description: 'Payee name claims to be official electricity utility, but recipient VPA is a private personal account.',
        scamMechanic: 'Impersonates an official utility bill to divert bill payments to a scammer personal wallet.',
        tags: ['Name Mismatch', 'Impersonation', 'Fake Utility']
    }
];
