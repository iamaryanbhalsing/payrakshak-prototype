import { MultilingualAlert } from '../types';

export interface LocalizedTemplate {
  safe: {
    headline: string;
    explanation: string;
    actionGuidance: string;
    ivrSpeechScript: string;
    smsAlertTemplate: string;
  };
  medium: {
    headline: string;
    explanation: string;
    actionGuidance: string;
    ivrSpeechScript: string;
    smsAlertTemplate: string;
  };
  critical: {
    headline: string;
    explanation: string;
    actionGuidance: string;
    ivrSpeechScript: string;
    smsAlertTemplate: string;
  };
}

export const MULTILINGUAL_TEMPLATES: Record<string, { name: string; templates: LocalizedTemplate }> = {
  en: {
    name: 'English',
    templates: {
      safe: {
        headline: 'Looks Safe to Proceed',
        explanation: 'No known scam signatures, suspicious URLs, or inverted UPI PIN requests were detected. Payee is recognized.',
        actionGuidance: 'Proceed normally, but always confirm the payee name on your bank screen before entering UPI PIN.',
        ivrSpeechScript: 'PayRakshak alert: This payment request looks safe. Please verify the receiver name on your screen before typing your UPI PIN.',
        smsAlertTemplate: 'PayRakshak: Payment check passed. Looks safe to pay. Always verify receiver name before entering UPI PIN.'
      },
      medium: {
        headline: 'Caution: Verify Receiver First',
        explanation: 'Unusual patterns detected (e.g. newly created handle, unverified merchant code, or vague note).',
        actionGuidance: 'Do not hurry. Double-check with the recipient through a separate trusted phone call.',
        ivrSpeechScript: 'Attention from PayRakshak. This payment request has suspicious details. Do not enter your PIN until you call the receiver to confirm.',
        smsAlertTemplate: 'PayRakshak Warning: Suspicious payment details. Call receiver directly to verify before entering UPI PIN.'
      },
      critical: {
        headline: 'DANGER: High Scam Risk Detected!',
        explanation: 'CRITICAL WARNING: This contains known scam patterns (e.g., fake electricity disconnection, "enter PIN to receive money", or phishing link).',
        actionGuidance: 'DO NOT ENTER YOUR UPI PIN! Cancel this transaction immediately. You will lose money if you approve.',
        ivrSpeechScript: 'Warning! PayRakshak emergency alert! This is a known scam! Do NOT enter your UPI PIN. You never enter your PIN to receive money. Please cancel immediately.',
        smsAlertTemplate: '🚨 PAYRAKSHAK CRITICAL ALERT: SCAM DETECTED! DO NOT ENTER UPI PIN! Cancel immediately. Report to cybercrime helpline 1930.'
      }
    }
  },
  hi: {
    name: 'हिन्दी (Hindi)',
    templates: {
      safe: {
        headline: 'भुगतान सुरक्षित प्रतीत होता है',
        explanation: 'कोई भी धोखाधड़ी, संदिग्ध लिंक या गलत UPI PIN अनुरोध नहीं मिला। प्राप्तकर्ता मान्य है।',
        actionGuidance: 'भुगतान जारी रखें, लेकिन UPI PIN दर्ज करने से पहले स्क्रीन पर नाम अवश्य जांचें।',
        ivrSpeechScript: 'पे-रक्षक सूचना: यह भुगतान सुरक्षित लग रहा है। UPI पिन डालने से पहले स्क्रीन पर नाम जरूर देख लें।',
        smsAlertTemplate: 'पे-रक्षक: भुगतान सुरक्षित लग रहा है। पिन डालने से पहले प्राप्तकर्ता का नाम जरूर जांचें।'
      },
      medium: {
        headline: 'सावधानी: पहले प्राप्तकर्ता की पुष्टि करें',
        explanation: 'कुछ असामान्य संकेत मिले हैं (जैसे अपरिचित UPI हैंडल या अस्पष्ट विवरण)।',
        actionGuidance: 'जल्दबाजी न करें। किसी अन्य नंबर से व्यक्ति को कॉल करके पहले पुष्टि करें।',
        ivrSpeechScript: 'पे-रक्षक चेतावनी: इस भुगतान में कुछ संदिग्ध लग रहा है। जब तक आप कॉल करके पुष्टि न कर लें, पिन न डालें।',
        smsAlertTemplate: 'पे-रक्षक चेतावनी: संदिग्ध भुगतान विवरण। पिन डालने से पहले प्राप्तकर्ता से फोन पर पुष्टि करें।'
      },
      critical: {
        headline: 'खतरा: भारी धोखाधड़ी (Scam) का संकेत!',
        explanation: 'गंभीर चेतावनी: यह जानी-पहचानी ठगी है (जैसे बिजली बिल कटने की धमकी, पैसे पाने के लिए पिन मांगना, या फर्जी लिंक)।',
        actionGuidance: 'अपना UPI PIN कभी दर्ज न करें! तुरंत यह भुगतान रद्द करें। पिन डालने पर आपके खाते से पैसे कट जाएंगे।',
        ivrSpeechScript: 'सावधान! पे-रक्षक इमरजेंसी चेतावनी! यह एक धोखाधड़ी है! अपना UPI पिन बिल्कुल न डालें। पैसे प्राप्त करने के लिए पिन की आवश्यकता कभी नहीं होती। तुरंत रद्द करें!',
        smsAlertTemplate: '🚨 पे-रक्षक गंभीर चेतावनी: धोखाधड़ी पकड़ी गई! अपना UPI पिन न डालें! तुरंत कैंसिल करें और 1930 पर रिपोर्ट करें।'
      }
    }
  },
  bn: {
    name: 'বাংলা (Bengali)',
    templates: {
      safe: {
        headline: 'পেমেন্টটি নিরাপদ বলে মনে হচ্ছে',
        explanation: 'কোনো সন্দেহজনক লিঙ্ক বা প্রতারণার লক্ষণ পাওয়া যায়নি।',
        actionGuidance: 'পেমেন্ট করতে পারেন, তবে UPI PIN দেওয়ার আগে প্রাপকের নাম যাচাই করুন।',
        ivrSpeechScript: 'পে-রক্ষক সতর্কতা: এই পেমেন্টটি নিরাপদ মনে হচ্ছে। পিন দেওয়ার আগে নাম দেখে নিন।',
        smsAlertTemplate: 'পে-রক্ষক: পেমেন্ট নিরাপদ। পিন দেওয়ার আগে প্রাপকের নাম দেখে নিন।'
      },
      medium: {
        headline: 'সতর্কতা: প্রাপককে আগে যাচাই করুন',
        explanation: 'কিছু অস্বাভাবিক প্যাটার্ন পাওয়া গেছে। যাচাই করা প্রয়োজন।',
        actionGuidance: 'তাড়াহুড়ো করবেন না। পরিচিত নম্বরে ফোন করে নিশ্চিত হন।',
        ivrSpeechScript: 'পে-রক্ষক সতর্কতা: এই পেমেন্টে কিছু সন্দেহজনক বিষয় রয়েছে। ফোনে নিশ্চিত না হয়ে পিন দেবেন না।',
        smsAlertTemplate: 'পে-রক্ষক সতর্কতা: সন্দেহজনক পেমেন্ট। পিন দেওয়ার আগে ফোনে যাচাই করুন।'
      },
      critical: {
        headline: 'বিপদ: মারাত্মক প্রতারণার ঝুঁকি!',
        explanation: 'জরুরি সতর্কতা: এটি একটি পরিচিত স্ক্যাম (যেমন বিদ্যুৎ কাটার ভয় বা টাকা পাওয়ার জন্য পিন চাওয়া)।',
        actionGuidance: 'কখনোই আপনার UPI PIN দেবেন না! অবিলম্বে পেমেন্ট বাতিল করুন।',
        ivrSpeechScript: 'সাবধান! পে-রক্ষক জরুরি সতর্কতা! এটি একটি স্ক্যাম! ভুলেও আপনার UPI পিন দেবেন না। টাকা পাওয়ার জন্য পিনের প্রয়োজন হয় না!',
        smsAlertTemplate: '🚨 পে-রক্ষক জরুরি সতর্কতা: প্রতারণা ধরা পড়েছে! UPI PIN দেবেন না! বাতিল করে ১৯৩০ নম্বরে রিপোর্ট করুন।'
      }
    }
  },
  ta: {
    name: 'தமிழ் (Tamil)',
    templates: {
      safe: {
        headline: 'பாதுகாப்பானது என தெரிகிறது',
        explanation: 'எந்தவிதமான மோசடி அல்லது சந்தேகத்திற்கிடமான இணைப்புகளும் கண்டறியப்படவில்லை.',
        actionGuidance: 'தொடரலாம், ஆனால் UPI பின்னை உள்ளிடும் முன் பெயரை சரிபார்க்கவும்.',
        ivrSpeechScript: 'பே-ரக்ஷக் தகவல்: இந்த கட்டணம் பாதுகாப்பானது. பின் போடுவதற்கு முன் பெயரை சரிபார்க்கவும்.',
        smsAlertTemplate: 'பே-ரக்ஷக்: பாதுகாப்பானது. UPI PIN போடுவதற்கு முன் பெயரை சரிபார்க்கவும்.'
      },
      medium: {
        headline: 'எச்சரிக்கை: பெறுநரை சரிபார்க்கவும்',
        explanation: 'தெரியாத UPI முகவரி அல்லது சந்தேகத்திற்கிடமான விவரங்கள் உள்ளன.',
        actionGuidance: 'அவசரப்பட வேண்டாம். பெறுநரை தொலைபேசியில் அழைத்து உறுதிப்படுத்தவும்.',
        ivrSpeechScript: 'பே-ரக்ஷக் எச்சரிக்கை: இதில் சில சந்தேகங்கள் உள்ளன. உறுதிப்படுத்தாமல் பின் போட வேண்டாம்.',
        smsAlertTemplate: 'பே-ரக்ஷக் எச்சரிக்கை: சந்தேகத்திற்கிடமான கட்டணம். சரிபார்த்துவிட்டு செலுத்தவும்.'
      },
      critical: {
        headline: 'ஆபத்து: மோசடி எச்சரிக்கை!',
        explanation: 'மிக முக்கிய எச்சரிக்கை: பணம் பெற பின் தேவையில்லை! இது ஒரு ஏமாற்று வேலை.',
        actionGuidance: 'உங்கள் UPI பின்னை உள்ளிடாதீர்கள்! உடனே ரத்து செய்யவும்.',
        ivrSpeechScript: 'எச்சரிக்கை! பே-ரக்ஷக் அவசர எச்சரிக்கை! இது ஒரு மோசடி! உங்கள் UPI பின்னை உள்ளிடாதீர்கள்! உடனடியாக ரத்து செய்யவும்.',
        smsAlertTemplate: '🚨 பே-ரக்ஷக் அவசர எச்சரிக்கை: மோசடி! UPI PIN போடாதீர்கள்! ரத்து செய்து 1930க்கு புகார் செய்யவும்.'
      }
    }
  },
  te: {
    name: 'తెలుగు (Telugu)',
    templates: {
      safe: {
        headline: 'చెల్లింపు సురక్షితంగా ఉంది',
        explanation: 'ఎలాంటి మోసపూరిత వివరాలు లేదా లింకులు కనుగొనబడలేదు.',
        actionGuidance: 'కొనసాగించవచ్చు, కానీ UPI పిన్ నమోదు చేసే ముందు పేరు తనిఖీ చేయండి.',
        ivrSpeechScript: 'పే-రక్షక్ సమాచారం: ఈ చెల్లింపు సురక్షితంగా ఉంది. పిన్ నమోదు చేసే ముందు పేరు సరిచూసుకోండి.',
        smsAlertTemplate: 'పే-రక్షక్: చెల్లింపు సురక్షితం. పిన్ ఎంటర్ చేసే ముందు పేరు తనిఖీ చేయండి.'
      },
      medium: {
        headline: 'జాగ్రత్త: స్వీకర్తను నిర్ధారించండి',
        explanation: 'అనుమానాస్పద వివరాలు గమనించబడ్డాయి.',
        actionGuidance: 'కంగారుపడవద్దు. ఫోన్ కాల్ చేసి నిర్ధారించుకోండి.',
        ivrSpeechScript: 'పే-రక్షక్ హెచ్చరిక: ఇందులో అనుమానం ఉంది. నిర్ధారించుకోకుండా పిన్ నమోదు చేయవద్దు.',
        smsAlertTemplate: 'పే-రక్షక్ హెచ్చరిక: అనుమానాస్పద చెల్లింపు. ఫోన్ కాల్ చేసి నిర్ధారించుకోండి.'
      },
      critical: {
        headline: 'ప్రమాదం: పెద్ద మోసం జరిగే అవకాశం!',
        explanation: 'తీవ్ర హెచ్చరిక: డబ్బులు స్వీకరించడానికి UPI పిన్ అవసరం లేదు! ఇది ఒక మోసం.',
        actionGuidance: 'మీ UPI పిన్ ఎంటర్ చేయవద్దు! వెంటనే రద్దు చేయండి.',
        ivrSpeechScript: 'జాగ్రత్త! పే-రక్షక్ అత్యవసర హెచ్చరిక! ఇది ఒక మోసం! మీ UPI పిన్ ఎంటర్ చేయవద్దు. వెంటనే రద్దు చేయండి!',
        smsAlertTemplate: '🚨 పే-రక్షక్ తీవ్ర హెచ్చరిక: మోసం! UPI పిన్ ఎంటర్ చేయవద్దు! రద్దు చేసి 1930కు ఫిర్యాదు చేయండి.'
      }
    }
  },
  kn: {
    name: 'ಕನ್ನಡ (Kannada)',
    templates: {
      safe: {
        headline: 'ಪಾವತಿ ಸುರಕ್ಷಿತವಾಗಿದೆ',
        explanation: 'ಯಾವುದೇ ವಂಚನೆ ಅಥವಾ ಅನುಮಾನಾಸ್ಪದ ಅಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
        actionGuidance: 'ಮುಂದುವರಿಯಿರಿ, ಆದರೆ UPI PIN ನಮೂದಿಸುವ ಮುನ್ನ ಹೆಸರನ್ನು ಪರಿಶೀಲಿಸಿ.',
        ivrSpeechScript: 'ಪೇ-ರಕ್ಷಕ್ ಮಾಹಿತಿ: ಈ ಪಾವತಿ ಸುರಕ್ಷಿತವಾಗಿದೆ. ಪಿನ್ ನಮೂದಿಸುವ ಮುನ್ನ ಹೆಸರನ್ನು ಪರಿಶೀಲಿಸಿ.',
        smsAlertTemplate: 'ಪೇ-ರಕ್ಷಕ್: ಪಾವತಿ ಸುರಕ್ಷಿತವಾಗಿದೆ. ಪಿನ್ ಹಾಕುವ ಮುನ್ನ ಹೆಸರನ್ನು ಪರಿಶೀಲಿಸಿ.'
      },
      medium: {
        headline: 'ಎಚ್ಚರಿಕೆ: ಸ್ವೀಕರಿಸುವವರನ್ನು ಪರಿಶೀಲಿಸಿ',
        explanation: 'ಅನುಮಾನಾಸ್ಪದ ಮಾದರಿಗಳು ಪತ್ತೆಯಾಗಿವೆ.',
        actionGuidance: 'ತುರಾತುರಿ ಮಾಡಬೇಡಿ. ಕರೆ ಮಾಡಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
        ivrSpeechScript: 'ಪೇ-ರಕ್ಷಕ್ ಎಚ್ಚರಿಕೆ: ಇದರಲ್ಲಿ ಅನುಮಾನಾಸ್ಪದ ಅಂಶಗಳಿವೆ. ಕರೆ ಮಾಡಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳದೆ ಪಿನ್ ಹಾಕಬೇಡಿ.',
        smsAlertTemplate: 'ಪೇ-ರಕ್ಷಕ್ ಎಚ್ಚರಿಕೆ: ಅನುಮಾನಾಸ್ಪದ ಪಾವತಿ. ಖಚಿತಪಡಿಸಿಕೊಂಡು ಮುಂದುವರಿಯಿರಿ.'
      },
      critical: {
        headline: 'ಅಪಾಯ: ವಂಚನೆಯ ಎಚ್ಚರಿಕೆ!',
        explanation: 'ಗಂಭೀರ ಎಚ್ಚರಿಕೆ: ಹಣ ಸ್ವೀಕರಿಸಲು UPI PIN ಅಗತ್ಯವಿಲ್ಲ! ಇದು ವಂಚನೆ.',
        actionGuidance: 'ನಿಮ್ಮ UPI PIN ನಮೂದಿಸಬೇಡಿ! ತಕ್ಷಣ ರದ್ದುಮಾಡಿ.',
        ivrSpeechScript: 'ಎಚ್ಚರಿಕೆ! ಪೇ-ರಕ್ಷಕ್ ತುರ್ತು ಸಂದೇಶ! ಇದು ವಂಚನೆ! ನಿಮ್ಮ UPI ಪಿನ್ ಹಾಕಬೇಡಿ. ತಕ್ಷಣ ರದ್ದುಗೊಳಿಸಿ!',
        smsAlertTemplate: '🚨 ಪೇ-ರಕ್ಷಕ್ ತುರ್ತು ಎಚ್ಚರಿಕೆ: ವಂಚನೆ! UPI PIN ಹಾಕಬೇಡಿ! ತಕ್ಷಣ ರದ್ದುಗೊಳಿಸಿ 1930 ಗೆ ದೂರು ನೀಡಿ.'
      }
    }
  },
  mr: {
    name: 'मराठी (Marathi)',
    templates: {
      safe: {
        headline: 'पेमेंट सुरक्षित दिसते आहे',
        explanation: 'कोणताही गैरप्रकार किंवा संशयास्पद लिंक आढळली नाही.',
        actionGuidance: 'पेमेंट करू शकता, पण UPI PIN टाकण्यापूर्वी स्क्रीनवरील नाव नक्की तपासा.',
        ivrSpeechScript: 'पे-रक्षक माहिती: हे पेमेंट सुरक्षित वाटत आहे. पिन टाकण्यापूर्वी नाव नक्की तपासा.',
        smsAlertTemplate: 'पे-रक्षक: पेमेंट सुरक्षित आहे. पिन टाकण्यापूर्वी नाव तपासा.'
      },
      medium: {
        headline: 'सावधान: आधी प्राप्तकर्त्याची खात्री करा',
        explanation: 'काही संशयास्पद बाबी आढळल्या आहेत.',
        actionGuidance: 'घाई करू नका. फोन करून आधी खात्री करून घ्या.',
        ivrSpeechScript: 'पे-रक्षक इशारा: यामध्ये काही संशयास्पद वाटत आहे. खात्री केल्याशिवाय पिन टाकू नका.',
        smsAlertTemplate: 'पे-रक्षक इशारा: संशयास्पद तपशील. फोनवर खात्री करून मगच पिन टाका.'
      },
      critical: {
        headline: 'धोका: मोठी फसवणूक (Scam) होण्याची शक्यता!',
        explanation: 'गंभीर इशारा: पैसे मिळवण्यासाठी कधीही UPI PIN लागत नाही! ही फसवणूक आहे.',
        actionGuidance: 'तुमचा UPI PIN टाकू नका! त्वरित हे पेमेंट रद्द करा.',
        ivrSpeechScript: 'सावधान! पे-रक्षक आणीबाणी इशारा! ही एक फसवणूक आहे! आपला UPI पिन टाकू नका. त्वरित रद्द करा!',
        smsAlertTemplate: '🚨 पे-रक्षक गंभीर इशारा: फसवणूक! UPI PIN टाकू नका! त्वरित रद्द करा आणि १९३० वर तक्रार करा.'
      }
    }
  },
  gu: {
    name: 'ગુજરાતી (Gujarati)',
    templates: {
      safe: {
        headline: 'ચુકવણી સુરક્ષિત જણાય છે',
        explanation: 'કોઈ શંકાસ્પદ લિંક કે છેતરપિંડીના સંકેત મળ્યા નથી.',
        actionGuidance: 'ચુકવણી કરી શકો છો, પરંતુ UPI PIN નાખતા પહેલા નામ જરૂર ચકાસો.',
        ivrSpeechScript: 'પે-રક્ષક માહિતી: આ પેમેન્ટ સુરક્ષિત જણાય છે. પિન નાખતા પહેલા નામ ચકાસી લો.',
        smsAlertTemplate: 'પે-રક્ષક: પેમેન્ટ સુરક્ષિત છે. પિન નાખતા પહેલા નામ ચકાસો.'
      },
      medium: {
        headline: 'સાવધાન: પહેલા પ્રાપ્તકર્તાની ચકાસણી કરો',
        explanation: 'અમુક અસામાન્ય વિગતો જોવા મળી છે.',
        actionGuidance: 'ઉતાવળ ન કરો. ફોન કરીને પહેલા ખાતરી કરો.',
        ivrSpeechScript: 'પે-રક્ષક ચેતવણી: આમાં કંઈક શંકાસ્પદ છે. ખાતરી કર્યા વગર પિન નાખશો નહીં.',
        smsAlertTemplate: 'પે-રક્ષક ચેતવણી: શંકાસ્પદ પેમેન્ટ. ફોન પર ખાતરી કરીને જ આગળ વધો.'
      },
      critical: {
        headline: 'જોખમ: મોટી છેતરપિંડીની શક્યતા!',
        explanation: 'ગંભીર ચેતવણી: પૈસા મેળવવા માટે ક્યારેય UPI PIN ની જરૂર પડતી નથી! આ છેતરપિંડી છે.',
        actionGuidance: 'તમારો UPI PIN ક્યારેય નાખશો નહીં! તરત જ રદ કરો.',
        ivrSpeechScript: 'સાવધાન! પે-રક્ષક ઈમરજન્સી ચેતવણી! આ છેતરપિંડી છે! તમારો UPI પિન નાખશો નહીં. તરત રદ કરો!',
        smsAlertTemplate: '🚨 પે-રક્ષક ગંભીર ચેતવણી: ફ્રોડ! UPI PIN નાખશો નહીં! તરત રદ કરો અને 1930 પર ફરિયાદ કરો.'
      }
    }
  }
};
