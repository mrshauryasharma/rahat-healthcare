// data/translations.ts — Complete translation system for RAHAT
// Supports English (en), Hindi (hi), and Bengali (bn)
// Uses flat key structure to avoid circular references

import { Language } from '@/types/user';

// Translation record: each key maps to an object with en, hi, bn strings
type TranslationRecord = Record<string, Record<Language, string>>;

export const translations: TranslationRecord = {
  // ===== SITE / BRAND =====
  'site.name': {
    en: 'RAHAT',
    hi: 'राहत',
    bn: 'রাহাত',
  },
  'site.tagline': {
    en: 'AI-Assisted Healthcare Support',
    hi: 'AI-सहायता प्राप्त स्वास्थ्य सहायता',
    bn: 'AI-সহায়তা স্বাস্থ্য সহায়তা',
  },

  // ===== NAVIGATION =====
  'nav.home': {
    en: 'Home',
    hi: 'होम',
    bn: 'হোম',
  },
  'nav.dashboard': {
    en: 'Dashboard',
    hi: 'डैशबोर्ड',
    bn: 'ড্যাশবোর্ড',
  },
  'nav.healthCheck': {
    en: 'Health Check',
    hi: 'स्वास्थ्य जांच',
    bn: 'স্বাস্থ্য পরীক্ষা',
  },
  'nav.history': {
    en: 'History',
    hi: 'इतिहास',
    bn: 'ইতিহাস',
  },
  'nav.profile': {
    en: 'Profile',
    hi: 'प्रोफ़ाइल',
    bn: 'প্রোফাইল',
  },
  'nav.appointments': {
    en: 'Appointments',
    hi: 'अपॉइंटमेंट',
    bn: 'অ্যাপয়েন্টমেন্ট',
  },
  'nav.login': {
    en: 'Login',
    hi: 'लॉगिन',
    bn: 'লগইন',
  },
  'nav.logout': {
    en: 'Logout',
    hi: 'लॉगआउट',
    bn: 'লগআউট',
  },

  // ===== HERO SECTION =====
  'hero.title': {
    en: 'Understand Your Symptoms. Take the Next Step.',
    hi: 'अपने लक्षणों को समझें। अगला कदम उठाएं।',
    bn: 'আপনার লক্ষণগুলি বুঝুন। পরবর্তী পদক্ষেপ নিন।',
  },
  'hero.subtitle': {
    en: 'RAHAT helps you describe health concerns, answer guided questions, and prepare reports you can share with your doctor.',
    hi: 'राहत आपको स्वास्थ्य संबंधी चिंताओं का वर्णन करने, निर्देशित प्रश्नों के उत्तर देने और डॉक्टर के साथ साझा करने योग्य रिपोर्ट तैयार करने में मदद करता है।',
    bn: 'রাহাত আপনাকে স্বাস্থ্য সমস্যা বর্ণনা করতে, গাইডেড প্রশ্নের উত্তর দিতে এবং ডাক্তারের সাথে শেয়ার করার জন্য রিপোর্ট তৈরি করতে সাহায্য করে।',
  },
  'hero.startCheck': {
    en: 'Start Health Check',
    hi: 'स्वास्थ्य जांच शुरू करें',
    bn: 'স্বাস্থ্য পরীক্ষা শুরু করুন',
  },
  'hero.login': {
    en: 'Login',
    hi: 'लॉगिन',
    bn: 'লগইন',
  },

  // ===== FEATURES =====
  'features.title': {
    en: 'How RAHAT Helps You',
    hi: 'राहत आपकी कैसे मदद करता है',
    bn: 'রাহাত কীভাবে আপনাকে সাহায্য করে',
  },
  'features.symptomCheck': {
    en: 'AI Symptom Check',
    hi: 'AI लक्षण जांच',
    bn: 'AI লক্ষণ পরীক্ষা',
  },
  'features.symptomCheckDesc': {
    en: 'Describe your symptoms and get guided through an interactive assessment.',
    hi: 'अपने लक्षणों का वर्णन करें और इंटरैक्टिव मूल्यांकन से गुजरें।',
    bn: 'আপনার লক্ষণ বর্ণনা করুন এবং ইন্টারেক্টিভ মূল্যায়নের মধ্য দিয়ে যান।',
  },
  'features.healthQuestions': {
    en: 'Interactive Health Questions',
    hi: 'इंटरैक्टिव स्वास्थ्य प्रश्न',
    bn: 'ইন্টারেক্টিভ স্বাস্থ্য প্রশ্ন',
  },
  'features.healthQuestionsDesc': {
    en: 'Answer simple MCQ-style questions to help organize your health information.',
    hi: 'अपनी स्वास्थ्य जानकारी व्यवस्थित करने के लिए सरल MCQ-शैली के प्रश्नों के उत्तर दें।',
    bn: 'আপনার স্বাস্থ্য তথ্য সংগঠিত করতে সহজ MCQ-স্টাইল প্রশ্নের উত্তর দিন।',
  },
  'features.imageUpload': {
    en: 'Image-Based Questions',
    hi: 'छवि-आधारित प्रश्न',
    bn: 'ছবি-ভিত্তিক প্রশ্ন',
  },
  'features.imageUploadDesc': {
    en: 'Upload medicine images or prescriptions for AI-assisted information extraction.',
    hi: 'AI-सहायता जानकारी निकालने के लिए दवाई या प्रिस्क्रिप्शन की तस्वीरें अपलोड करें।',
    bn: 'AI-সহায়তা তথ্য নিষ্কাশনের জন্য ওষুধ বা প্রেসক্রিপশনের ছবি আপলোড করুন।',
  },
  'features.healthId': {
    en: 'Personal Health ID',
    hi: 'व्यक्तिगत स्वास्थ्य ID',
    bn: 'ব্যক্তিগত স্বাস্থ্য ID',
  },
  'features.healthIdDesc': {
    en: 'Get a unique RAHAT Health ID to organize and track your health information.',
    hi: 'अपनी स्वास्थ्य जानकारी को व्यवस्थित और ट्रैक करने के लिए एक अद्वितीय राहत स्वास्थ्य ID प्राप्त करें।',
    bn: 'আপনার স্বাস্থ্য তথ্য সংগঠিত ও ট্র্যাক করতে একটি অনন্য রাহাত স্বাস্থ্য ID পান।',
  },
  'features.multilingual': {
    en: 'Multilingual Reports',
    hi: 'बहुभाषी रिपोर्ट',
    bn: 'বহুভাষিক রিপোর্ট',
  },
  'features.multilingualDesc': {
    en: 'Get health summaries in English, Hindi, or Bengali.',
    hi: 'अंग्रेज़ी, हिंदी या बंगाली में स्वास्थ्य सारांश प्राप्त करें।',
    bn: 'ইংরেজি, হিন্দি বা বাংলায় স্বাস্থ্য সারাংশ পান।',
  },
  'features.doctorSummary': {
    en: 'Doctor-Friendly Summary',
    hi: 'डॉक्टर-अनुकूल सारांश',
    bn: 'ডাক্তার-বান্ধব সারাংশ',
  },
  'features.doctorSummaryDesc': {
    en: 'Generate a structured summary you can share with your healthcare provider.',
    hi: 'एक संरचित सारांश बनाएं जिसे आप अपने स्वास्थ्य सेवा प्रदाता के साथ साझा कर सकते हैं।',
    bn: 'একটি কাঠামোগত সারাংশ তৈরি করুন যা আপনি আপনার ডাক্তারের সাথে শেয়ার করতে পারেন।',
  },
  'features.privacy': {
    en: 'Client Privacy First',
    hi: 'गोपनीयता सर्वप्रथम',
    bn: 'গোপনীয়তা সর্বদা অগ্রাধিকার',
  },
  'features.privacyDesc': {
    en: 'Encrypted on your device with no pre-filled fake data.',
    hi: 'आपके डिवाइस पर एन्क्रिप्टेड और बिना किसी फर्जी डेटा के।',
    bn: 'আপনার ডিভাইসে এনক্রিপ্ট করা এবং কোনো নকল ডেটা ছাড়া।',
  },
  'features.threeVersion': {
    en: '3-Version Summaries',
    hi: '3-संस्करण सारांश',
    bn: '৩-সংস্করণ সারাংশ',
  },
  'features.threeVersionDesc': {
    en: 'Generates Patient Version, Doctor Clinical Summary, and English report.',
    hi: 'रोगी संस्करण, डॉक्टर क्लिनिकल सारांश और अंग्रेजी रिपोर्ट तैयार करता है।',
    bn: 'রোগী সংস্করণ, ডাক্তার ক্লিনিক্যাল সারাংশ এবং ইংরেজি রিপোর্ট তৈরি করে।',
  },
  'features.download': {
    en: 'Printable HTML Reports',
    hi: 'प्रिंट करने योग्य HTML रिपोर्ट',
    bn: 'মুদ্রণযোগ্য HTML রিপোর্ট',
  },
  'features.downloadDesc': {
    en: 'Download or print official reports for physical doctor visits.',
    hi: 'शारीरिक डॉक्टर यात्राओं के लिए आधिकारिक रिपोर्ट डाउनलोड या प्रिंट करें।',
    bn: 'ডাক্তারের সাথে দেখা করার জন্য অফিসিয়াল রিপোর্ট ডাউনলোড বা প্রিন্ট করুন।',
  },
  'features.abdm': {
    en: 'Digital Health ID',
    hi: 'डिजिटल स्वास्थ्य आईडी',
    bn: 'ডিজিটাল স্বাস্থ্য আইডি',
  },
  'features.abdmDesc': {
    en: 'Personal RAHAT-2026-XXXXXX health identifier for lifelong care.',
    hi: 'आजीवन देखभाल के लिए व्यक्तिगत राहत स्वास्थ्य पहचानकर्ता।',
    bn: 'আজীবন সেবার জন্য ব্যক্তিগত রাহাত স্বাস্থ্য পরিচয়পত্র।',
  },
  'features.doctorPortal': {
    en: 'Clinical Doctor Suite',
    hi: 'क्लिनिकल डॉक्टर सूट',
    bn: 'ক্লিনিক্যাল ডাক্তার স্যুট',
  },
  'features.doctorPortalDesc': {
    en: 'Verified medical practitioners review logs & issue digital Rx.',
    hi: 'सत्यापित डॉक्टर रिकॉर्ड जांचते हैं और डिजिटल पर्चे जारी करते हैं।',
    bn: 'যাচাইকৃত ডাক্তাররা রেকর্ড পর্যালোচনা করেন এবং ডিজিটাল প্রেসক্রিপশন দেন।',
  },
  'features.offline': {
    en: 'Fast & Lightweight',
    hi: 'तेज एवं हल्का',
    bn: 'দ্রুত ও হালকা',
  },
  'features.offlineDesc': {
    en: 'Optimized Next.js architecture with instant response.',
    hi: 'त्वरित प्रतिक्रिया के साथ अनुकूलित आर्किटेक्चर।',
    bn: 'তাত্ক্ষণিক প্রতিক্রিয়া সহ অপ্টিমাইজড আর্কিটেকচার।',
  },
  'dashboard.welcome': {
    en: 'Welcome back,',
    hi: 'वापसी पर स्वागत है,',
    bn: 'স্বাগতম,',
  },
  'dashboard.profileComplete': {
    en: 'Profile Completion',
    hi: 'प्रोफ़ाइल पूर्णता',
    bn: 'প্রোফাইল সম্পূর্ণতা',
  },
  'history.noHistory': {
    en: 'No Health Checks Yet',
    hi: 'अभी तक कोई स्वास्थ्य जांच नहीं',
    bn: 'এখনও কোনো স্বাস্থ্য পরীক্ষা নেই',
  },
  'history.noHistoryDesc': {
    en: 'Take an assessment to generate your personalized 3-version health report.',
    hi: 'अपनी व्यक्तिगत 3-संस्करण स्वास्थ्य रिपोर्ट बनाने के लिए एक मूल्यांकन लें।',
    bn: 'আপনার ব্যক্তিগতকৃত ৩-সংস্করণ স্বাস্থ্য রিপোর্ট তৈরি করতে একটি মূল্যায়ন নিন।',
  },
  'disclaimer.text': {
    en: 'RAHAT is an informational, assistive tool and is not a substitute for professional medical advice, clinical diagnosis, or emergency treatment. For severe or life-threatening symptoms, immediately visit the nearest hospital or dial 108/112.',
    hi: 'राहत एक सूचनात्मक उपकरण है और पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। गंभीर या आपातकालीन लक्षणों के लिए तुरंत नजदीकी अस्पताल जाएं या 108/112 डायल करें।',
    bn: 'রাহাত একটি তথ্যভিত্তিক সরঞ্জাম এবং পেশাদার চিকিৎসা পরামর্শ বা জরুরী চিকিৎসার বিকল্প নয়। গুরুতর বা জীবন সংশয়ী লক্ষণের জন্য অবিলম্বে নিকটস্থ হাসপাতালে যান বা ১০৮/১১২ ডায়াল করুন।',
  },
  'features.healthHistory': {
    en: 'Health History',
    hi: 'स्वास्थ्य इतिहास',
    bn: 'স্বাস্থ্য ইতিহাস',
  },
  'features.healthHistoryDesc': {
    en: 'Keep track of all your past health checks and reports in one place.',
    hi: 'अपने सभी पिछले स्वास्थ्य जांच और रिपोर्ट एक जगह पर रखें।',
    bn: 'আপনার সমস্ত পূর্ববর্তী স্বাস্থ্য পরীক্ষা এবং রিপোর্ট এক জায়গায় রাখুন।',
  },
  'features.secure': {
    en: 'Secure Information',
    hi: 'सुरक्षित जानकारी',
    bn: 'নিরাপদ তথ্য',
  },
  'features.secureDesc': {
    en: 'Your health information stays private and under your control.',
    hi: 'आपकी स्वास्थ्य जानकारी निजी और आपके नियंत्रण में रहती है।',
    bn: 'আপনার স্বাস্থ্য তথ্য ব্যক্তিগত এবং আপনার নিয়ন্ত্রণে থাকে।',
  },
  'features.downloadable': {
    en: 'Downloadable Reports',
    hi: 'डाउनलोड करने योग्य रिपोर्ट',
    bn: 'ডাউনলোডযোগ্য রিপোর্ট',
  },
  'features.downloadableDesc': {
    en: 'Download and print your health reports anytime.',
    hi: 'कभी भी अपनी स्वास्थ्य रिपोर्ट डाउनलोड और प्रिंट करें।',
    bn: 'যেকোনো সময় আপনার স্বাস্থ্য রিপোর্ট ডাউনলোড এবং প্রিন্ট করুন।',
  },

  // ===== HOW IT WORKS =====
  'howItWorks.title': {
    en: 'How It Works',
    hi: 'यह कैसे काम करता है',
    bn: 'এটি কীভাবে কাজ করে',
  },
  'howItWorks.step1': {
    en: 'Choose a Health Concern',
    hi: 'स्वास्थ्य चिंता चुनें',
    bn: 'একটি স্বাস্থ্য সমস্যা নির্বাচন করুন',
  },
  'howItWorks.step1Desc': {
    en: 'Select from common health issues like fever, cold, headache, and more.',
    hi: 'बुखार, सर्दी, सिरदर्द जैसी सामान्य स्वास्थ्य समस्याओं में से चुनें।',
    bn: 'জ্বর, সর্দি, মাথাব্যথা ইত্যাদি সাধারণ স্বাস্থ্য সমস্যা থেকে নির্বাচন করুন।',
  },
  'howItWorks.step2': {
    en: 'Answer Simple Questions',
    hi: 'सरल प्रश्नों के उत्तर दें',
    bn: 'সহজ প্রশ্নের উত্তর দিন',
  },
  'howItWorks.step2Desc': {
    en: 'Go through easy MCQ-style questions about your symptoms.',
    hi: 'अपने लक्षणों के बारे में आसान MCQ-शैली के प्रश्नों से गुजरें।',
    bn: 'আপনার লক্ষণ সম্পর্কে সহজ MCQ-স্টাইল প্রশ্নের মধ্য দিয়ে যান।',
  },
  'howItWorks.step3': {
    en: 'Provide Additional Information',
    hi: 'अतिरिक्त जानकारी दें',
    bn: 'অতিরিক্ত তথ্য প্রদান করুন',
  },
  'howItWorks.step3Desc': {
    en: 'Optionally upload images of medicines or prescriptions.',
    hi: 'वैकल्पिक रूप से दवाइयों या प्रिस्क्रिप्शन की तस्वीरें अपलोड करें।',
    bn: 'ঐচ্ছিকভাবে ওষুধ বা প্রেসক্রিপশনের ছবি আপলোড করুন।',
  },
  'howItWorks.step4': {
    en: 'Review Your Summary',
    hi: 'अपना सारांश देखें',
    bn: 'আপনার সারাংশ পর্যালোচনা করুন',
  },
  'howItWorks.step4Desc': {
    en: 'Review the AI-generated health summary in your language.',
    hi: 'अपनी भाषा में AI-जनित स्वास्थ्य सारांश देखें।',
    bn: 'আপনার ভাষায় AI-তৈরি স্বাস্থ্য সারাংশ পর্যালোচনা করুন।',
  },
  'howItWorks.step5': {
    en: 'Save, Edit, or Download',
    hi: 'सहेजें, संपादित करें, या डाउनलोड करें',
    bn: 'সংরক্ষণ, সম্পাদনা, বা ডাউনলোড করুন',
  },
  'howItWorks.step5Desc': {
    en: 'Edit your report, save it to your history, or download for your doctor.',
    hi: 'अपनी रिपोर्ट संपादित करें, इतिहास में सहेजें, या डॉक्टर के लिए डाउनलोड करें।',
    bn: 'আপনার রিপোর্ট সম্পাদনা করুন, ইতিহাসে সংরক্ষণ করুন, বা ডাক্তারের জন্য ডাউনলোড করুন।',
  },

  // ===== SAFETY =====
  'safety.title': {
    en: 'Important Safety Information',
    hi: 'महत्वपूर्ण सुरक्षा जानकारी',
    bn: 'গুরুত্বপূর্ণ নিরাপত্তা তথ্য',
  },
  'safety.point1': {
    en: 'RAHAT is an informational and supportive tool. It does not provide medical diagnosis.',
    hi: 'राहत एक सूचनात्मक और सहायक उपकरण है। यह चिकित्सा निदान प्रदान नहीं करता है।',
    bn: 'রাহাত একটি তথ্যমূলক এবং সহায়ক টুল। এটি চিকিৎসা রোগ নির্ণয় প্রদান করে না।',
  },
  'safety.point2': {
    en: 'It is not a replacement for a licensed doctor or healthcare professional.',
    hi: 'यह किसी लाइसेंस प्राप्त डॉक्टर या स्वास्थ्य पेशेवर का विकल्प नहीं है।',
    bn: 'এটি লাইসেন্সপ্রাপ্ত ডাক্তার বা স্বাস্থ্যসেবা পেশাদারের বিকল্প নয়।',
  },
  'safety.point3': {
    en: 'For emergency symptoms, please seek immediate professional medical help.',
    hi: 'आपातकालीन लक्षणों के लिए, कृपया तुरंत पेशेवर चिकित्सा सहायता लें।',
    bn: 'জরুরি লক্ষণের জন্য, অনুগ্রহ করে অবিলম্বে পেশাদার চিকিৎসা সাহায্য নিন।',
  },
  'safety.emergency': {
    en: '🚨 If you are experiencing a medical emergency, call your local emergency number immediately.',
    hi: '🚨 यदि आप चिकित्सा आपातकाल का अनुभव कर रहे हैं, तो तुरंत अपने स्थानीय आपातकालीन नंबर पर कॉल करें।',
    bn: '🚨 আপনি যদি চিকিৎসা জরুরি অবস্থায় থাকেন, অবিলম্বে আপনার স্থানীয় জরুরি নম্বরে কল করুন।',
  },

  // ===== FOOTER =====
  'footer.about': {
    en: 'About',
    hi: 'हमारे बारे में',
    bn: 'আমাদের সম্পর্কে',
  },
  'footer.privacy': {
    en: 'Privacy',
    hi: 'गोपनीयता',
    bn: 'গোপনীয়তা',
  },
  'footer.terms': {
    en: 'Terms',
    hi: 'शर्तें',
    bn: 'শর্তাবলী',
  },
  'footer.help': {
    en: 'Help',
    hi: 'सहायता',
    bn: 'সাহায্য',
  },
  'footer.contact': {
    en: 'Contact',
    hi: 'संपर्क',
    bn: 'যোগাযোগ',
  },
  'footer.disclaimer': {
    en: 'RAHAT is an informational platform and does not replace professional medical advice.',
    hi: 'राहत एक सूचनात्मक मंच है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है।',
    bn: 'রাহাত একটি তথ্যমূলক প্ল্যাটফর্ম এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।',
  },

  // ===== LOGIN =====
  'login.title': {
    en: 'Login to RAHAT',
    hi: 'राहत में लॉगिन करें',
    bn: 'রাহাতে লগইন করুন',
  },
  'login.subtitle': {
    en: 'Enter your mobile number to get started',
    hi: 'शुरू करने के लिए अपना मोबाइल नंबर दर्ज करें',
    bn: 'শুরু করতে আপনার মোবাইল নম্বর দিন',
  },
  'login.phoneLabel': {
    en: 'Mobile Number',
    hi: 'मोबाइल नंबर',
    bn: 'মোবাইল নম্বর',
  },
  'login.phonePlaceholder': {
    en: 'Enter 10-digit mobile number',
    hi: '10 अंकों का मोबाइल नंबर दर्ज करें',
    bn: '১০ সংখ্যার মোবাইল নম্বর দিন',
  },
  'login.sendOtp': {
    en: 'Send OTP',
    hi: 'OTP भेजें',
    bn: 'OTP পাঠান',
  },
  'login.sending': {
    en: 'Sending...',
    hi: 'भेज रहा है...',
    bn: 'পাঠানো হচ্ছে...',
  },
  'login.invalidPhone': {
    en: 'Please enter a valid 10-digit mobile number.',
    hi: 'कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें।',
    bn: 'অনুগ্রহ করে একটি বৈধ ১০ সংখ্যার মোবাইল নম্বর দিন।',
  },
  'login.demoNote': {
    en: 'Demo Mode: Use OTP 123456 for testing.',
    hi: 'डेमो मोड: परीक्षण के लिए OTP 123456 का उपयोग करें।',
    bn: 'ডেমো মোড: পরীক্ষার জন্য OTP 123456 ব্যবহার করুন।',
  },

  // ===== VERIFY OTP =====
  'otp.title': {
    en: 'Verify OTP',
    hi: 'OTP सत्यापित करें',
    bn: 'OTP যাচাই করুন',
  },
  'otp.subtitle': {
    en: 'Enter the 6-digit code sent to your phone',
    hi: 'आपके फोन पर भेजा गया 6 अंकों का कोड दर्ज करें',
    bn: 'আপনার ফোনে পাঠানো ৬ সংখ্যার কোড দিন',
  },
  'otp.label': {
    en: 'OTP Code',
    hi: 'OTP कोड',
    bn: 'OTP কোড',
  },
  'otp.verify': {
    en: 'Verify',
    hi: 'सत्यापित करें',
    bn: 'যাচাই করুন',
  },
  'otp.verifying': {
    en: 'Verifying...',
    hi: 'सत्यापित कर रहा है...',
    bn: 'যাচাই করা হচ্ছে...',
  },
  'otp.resend': {
    en: 'Resend OTP',
    hi: 'OTP पुनः भेजें',
    bn: 'OTP পুনরায় পাঠান',
  },
  'otp.invalidOtp': {
    en: 'Invalid OTP. Please try again.',
    hi: 'अमान्य OTP। कृपया पुनः प्रयास करें।',
    bn: 'অবৈধ OTP। অনুগ্রহ করে আবার চেষ্টা করুন।',
  },

  // ===== ONBOARDING =====
  'onboarding.title': {
    en: 'Complete Your Profile',
    hi: 'अपनी प्रोफ़ाइल पूरी करें',
    bn: 'আপনার প্রোফাইল সম্পূর্ণ করুন',
  },
  'onboarding.subtitle': {
    en: 'This information helps personalize your health experience. All fields are optional.',
    hi: 'यह जानकारी आपके स्वास्थ्य अनुभव को निजीकृत करने में मदद करती है। सभी फ़ील्ड वैकल्पिक हैं।',
    bn: 'এই তথ্য আপনার স্বাস্থ্য অভিজ্ঞতা ব্যক্তিগতকৃত করতে সাহায্য করে। সব ক্ষেত্র ঐচ্ছিক।',
  },
  'onboarding.name': {
    en: 'Full Name',
    hi: 'पूरा नाम',
    bn: 'পুরো নাম',
  },
  'onboarding.age': {
    en: 'Age',
    hi: 'उम्र',
    bn: 'বয়স',
  },
  'onboarding.dob': {
    en: 'Date of Birth',
    hi: 'जन्म तिथि',
    bn: 'জন্ম তারিখ',
  },
  'onboarding.gender': {
    en: 'Gender',
    hi: 'लिंग',
    bn: 'লিঙ্গ',
  },
  'onboarding.male': {
    en: 'Male',
    hi: 'पुरुष',
    bn: 'পুরুষ',
  },
  'onboarding.female': {
    en: 'Female',
    hi: 'महिला',
    bn: 'মহিলা',
  },
  'onboarding.other': {
    en: 'Other',
    hi: 'अन्य',
    bn: 'অন্যান্য',
  },
  'onboarding.preferNotToSay': {
    en: 'Prefer not to say',
    hi: 'बताना नहीं चाहते',
    bn: 'বলতে চাই না',
  },
  'onboarding.bloodGroup': {
    en: 'Blood Group',
    hi: 'रक्त समूह',
    bn: 'রক্তের গ্রুপ',
  },
  'onboarding.height': {
    en: 'Height (cm)',
    hi: 'ऊंचाई (सेमी)',
    bn: 'উচ্চতা (সেমি)',
  },
  'onboarding.weight': {
    en: 'Weight (kg)',
    hi: 'वजन (किलो)',
    bn: 'ওজন (কেজি)',
  },
  'onboarding.allergies': {
    en: 'Allergies (comma separated)',
    hi: 'एलर्जी (अल्पविराम से अलग)',
    bn: 'অ্যালার্জি (কমা দিয়ে আলাদা)',
  },
  'onboarding.conditions': {
    en: 'Existing Medical Conditions',
    hi: 'मौजूदा चिकित्सा स्थिति',
    bn: 'বিদ্যমান চিকিৎসা অবস্থা',
  },
  'onboarding.emergencyName': {
    en: 'Emergency Contact Name',
    hi: 'आपातकालीन संपर्क नाम',
    bn: 'জরুরি যোগাযোগের নাম',
  },
  'onboarding.emergencyRelation': {
    en: 'Relationship',
    hi: 'संबंध',
    bn: 'সম্পর্ক',
  },
  'onboarding.emergencyPhone': {
    en: 'Emergency Contact Phone',
    hi: 'आपातकालीन संपर्क फोन',
    bn: 'জরুরি যোগাযোগের ফোন',
  },
  'onboarding.save': {
    en: 'Save Profile',
    hi: 'प्रोफ़ाइल सहेजें',
    bn: 'প্রোফাইল সংরক্ষণ',
  },
  'onboarding.skip': {
    en: 'Skip for Now',
    hi: 'अभी छोड़ें',
    bn: 'আপাতত এড়িয়ে যান',
  },
  'onboarding.saving': {
    en: 'Saving...',
    hi: 'सहेज रहा है...',
    bn: 'সংরক্ষণ হচ্ছে...',
  },

  // ===== DASHBOARD =====
  'dashboard.greeting': {
    en: 'Welcome back',
    hi: 'वापस स्वागत है',
    bn: 'স্বাগতম',
  },
  'dashboard.healthId': {
    en: 'Your RAHAT Health ID',
    hi: 'आपकी राहत स्वास्थ्य ID',
    bn: 'আপনার রাহাত স্বাস্থ্য ID',
  },
  'dashboard.healthIdNote': {
    en: 'This is your RAHAT platform health identifier. It is not a government-issued ID.',
    hi: 'यह आपकी राहत प्लेटफ़ॉर्म स्वास्थ्य पहचान है। यह सरकार द्वारा जारी ID नहीं है।',
    bn: 'এটি আপনার রাহাত প্ল্যাটফর্ম স্বাস্থ্য পরিচয়। এটি সরকার প্রদত্ত ID নয়।',
  },
  'dashboard.startCheck': {
    en: 'Start New Health Check',
    hi: 'नई स्वास्थ्य जांच शुरू करें',
    bn: 'নতুন স্বাস্থ্য পরীক্ষা শুরু করুন',
  },
  'dashboard.recentChecks': {
    en: 'Recent Health Checks',
    hi: 'हालिया स्वास्थ्य जांच',
    bn: 'সাম্প্রতিক স্বাস্থ্য পরীক্ষা',
  },
  'dashboard.profileCompletion': {
    en: 'Profile Completion',
    hi: 'प्रोफ़ाइल पूर्णता',
    bn: 'প্রোফাইল সম্পূর্ণতা',
  },
  'dashboard.quickActions': {
    en: 'Quick Actions',
    hi: 'त्वरित कार्य',
    bn: 'দ্রুত ক্রিয়া',
  },
  'dashboard.copied': {
    en: 'Copied!',
    hi: 'कॉपी हो गया!',
    bn: 'কপি হয়েছে!',
  },

  // ===== HEALTH CHECK =====
  'healthCheck.title': {
    en: 'Health Check',
    hi: 'स्वास्थ्य जांच',
    bn: 'স্বাস্থ্য পরীক্ষা',
  },
  'healthCheck.selectConcern': {
    en: 'What health concern would you like to check?',
    hi: 'आप किस स्वास्थ्य चिंता की जांच करना चाहेंगे?',
    bn: 'আপনি কোন স্বাস্থ্য সমস্যা পরীক্ষা করতে চান?',
  },
  'healthCheck.selectOne': {
    en: 'Select one concern to begin your assessment.',
    hi: 'अपना मूल्यांकन शुरू करने के लिए एक चिंता चुनें।',
    bn: 'আপনার মূল্যায়ন শুরু করতে একটি সমস্যা নির্বাচন করুন।',
  },
  'healthCheck.questionOf': {
    en: 'Question {current} of {total}',
    hi: 'प्रश्न {current} / {total}',
    bn: 'প্রশ্ন {current} / {total}',
  },
  'healthCheck.back': {
    en: 'Back',
    hi: 'पीछे',
    bn: 'পিছনে',
  },
  'healthCheck.next': {
    en: 'Next',
    hi: 'अगला',
    bn: 'পরবর্তী',
  },
  'healthCheck.skip': {
    en: 'Skip',
    hi: 'छोड़ें',
    bn: 'এড়িয়ে যান',
  },
  'healthCheck.review': {
    en: 'Review Answers',
    hi: 'उत्तरों की समीक्षा करें',
    bn: 'উত্তর পর্যালোচনা করুন',
  },
  'healthCheck.generateReport': {
    en: 'Generate Report',
    hi: 'रिपोर्ट बनाएं',
    bn: 'রিপোর্ট তৈরি করুন',
  },
  'healthCheck.generating': {
    en: 'Generating Report...',
    hi: 'रिपोर्ट बना रही है...',
    bn: 'রিপোর্ট তৈরি হচ্ছে...',
  },
  'healthCheck.uploadImage': {
    en: 'Upload Medicine/Prescription Image',
    hi: 'दवाई/प्रिस्क्रिप्शन की तस्वीर अपलोड करें',
    bn: 'ওষুধ/প্রেসক্রিপশনের ছবি আপলোড করুন',
  },
  'healthCheck.optional': {
    en: '(Optional)',
    hi: '(वैकल्पिक)',
    bn: '(ঐচ্ছিক)',
  },
  'healthCheck.additionalNotes': {
    en: 'Additional Notes',
    hi: 'अतिरिक्त नोट्स',
    bn: 'অতিরিক্ত নোট',
  },
  'healthCheck.notesPlaceholder': {
    en: 'Add any additional information about your symptoms...',
    hi: 'अपने लक्षणों के बारे में कोई अतिरिक्त जानकारी जोड़ें...',
    bn: 'আপনার লক্ষণ সম্পর্কে কোনো অতিরিক্ত তথ্য যোগ করুন...',
  },

  // ===== IMAGE UPLOAD =====
  'image.upload': {
    en: 'Click or drag to upload image',
    hi: 'छवि अपलोड करने के लिए क्लिक या ड्रैग करें',
    bn: 'ছবি আপলোড করতে ক্লিক বা ড্র্যাগ করুন',
  },
  'image.supports': {
    en: 'Supports: JPG, PNG, WebP (Max 5MB)',
    hi: 'समर्थित: JPG, PNG, WebP (अधिकतम 5MB)',
    bn: 'সমর্থিত: JPG, PNG, WebP (সর্বোচ্চ 5MB)',
  },
  'image.remove': {
    en: 'Remove Image',
    hi: 'छवि हटाएं',
    bn: 'ছবি সরান',
  },
  'image.taking': {
    en: 'Are you currently taking this medicine?',
    hi: 'क्या आप वर्तमान में यह दवाई ले रहे हैं?',
    bn: 'আপনি কি বর্তমানে এই ওষুধ খাচ্ছেন?',
  },
  'image.prescribed': {
    en: 'Was this prescribed to you?',
    hi: 'क्या यह आपको लिखी गई थी?',
    bn: 'এটা কি আপনাকে প্রেসক্রাইব করা হয়েছিল?',
  },
  'image.addToSummary': {
    en: 'Add to health summary?',
    hi: 'स्वास्थ्य सारांश में जोड़ें?',
    bn: 'স্বাস্থ্য সারাংশে যোগ করবেন?',
  },
  'image.notes': {
    en: 'Notes about this image',
    hi: 'इस छवि के बारे में नोट्स',
    bn: 'এই ছবি সম্পর্কে নোট',
  },
  'image.tooLarge': {
    en: 'File is too large. Maximum size is 5MB.',
    hi: 'फ़ाइल बहुत बड़ी है। अधिकतम आकार 5MB है।',
    bn: 'ফাইল খুব বড়। সর্বোচ্চ আকার 5MB।',
  },
  'image.invalidType': {
    en: 'Unsupported file type. Please upload JPG, PNG, or WebP.',
    hi: 'असमर्थित फ़ाइल प्रकार। कृपया JPG, PNG, या WebP अपलोड करें।',
    bn: 'অসমর্থিত ফাইল টাইপ। অনুগ্রহ করে JPG, PNG, বা WebP আপলোড করুন।',
  },

  // ===== REPORT / RESULTS =====
  'report.title': {
    en: 'Health Report',
    hi: 'स्वास्थ्य रिपोर्ट',
    bn: 'স্বাস্থ্য রিপোর্ট',
  },
  'report.userVersion': {
    en: 'Your Report',
    hi: 'आपकी रिपोर्ट',
    bn: 'আপনার রিপোর্ট',
  },
  'report.doctorVersion': {
    en: 'Doctor Summary',
    hi: 'डॉक्टर सारांश',
    bn: 'ডাক্তার সারাংশ',
  },
  'report.englishVersion': {
    en: 'English Report',
    hi: 'अंग्रेज़ी रिपोर्ट',
    bn: 'ইংরেজি রিপোর্ট',
  },
  'report.mainConcern': {
    en: 'Main Concern',
    hi: 'मुख्य चिंता',
    bn: 'প্রধান সমস্যা',
  },
  'report.symptoms': {
    en: 'Reported Symptoms',
    hi: 'रिपोर्ट किए गए लक्षण',
    bn: 'রিপোর্ট করা লক্ষণ',
  },
  'report.duration': {
    en: 'Duration',
    hi: 'अवधि',
    bn: 'সময়কাল',
  },
  'report.responses': {
    en: 'Relevant Responses',
    hi: 'प्रासंगिक उत्तर',
    bn: 'প্রাসঙ্গিক উত্তর',
  },
  'report.medicines': {
    en: 'Medicines Mentioned',
    hi: 'उल्लेखित दवाइयाँ',
    bn: 'উল্লিখিত ওষুধ',
  },
  'report.notes': {
    en: 'Important Notes',
    hi: 'महत्वपूर्ण नोट्स',
    bn: 'গুরুত্বপূর্ণ নোট',
  },
  'report.nextSteps': {
    en: 'Next Steps',
    hi: 'अगले कदम',
    bn: 'পরবর্তী পদক্ষেপ',
  },
  'report.edit': {
    en: 'Edit',
    hi: 'संपादित करें',
    bn: 'সম্পাদনা',
  },
  'report.save': {
    en: 'Save',
    hi: 'सहेजें',
    bn: 'সংরক্ষণ',
  },
  'report.download': {
    en: 'Download',
    hi: 'डाउनलोड',
    bn: 'ডাউনলোড',
  },
  'report.print': {
    en: 'Print',
    hi: 'प्रिंट',
    bn: 'প্রিন্ট',
  },
  'report.copy': {
    en: 'Copy Summary',
    hi: 'सारांश कॉपी करें',
    bn: 'সারাংশ কপি করুন',
  },
  'report.share': {
    en: 'Share with Doctor',
    hi: 'डॉक्टर के साथ साझा करें',
    bn: 'ডাক্তারের সাথে শেয়ার করুন',
  },
  'report.disclaimer': {
    en: 'This is an AI-assisted health summary for informational purposes only. It does not replace professional medical advice.',
    hi: 'यह केवल सूचनात्मक उद्देश्यों के लिए AI-सहायता स्वास्थ्य सारांश है। यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है।',
    bn: 'এটি শুধুমাত্র তথ্যমূলক উদ্দেশ্যে AI-সহায়তা স্বাস্থ্য সারাংশ। এটি পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।',
  },

  // ===== HISTORY =====
  'history.title': {
    en: 'Health History',
    hi: 'स्वास्थ्य इतिहास',
    bn: 'স্বাস্থ্য ইতিহাস',
  },
  'history.empty': {
    en: 'You have not completed any health checks yet.',
    hi: 'आपने अभी तक कोई स्वास्थ्य जांच पूरी नहीं की है।',
    bn: 'আপনি এখনো কোনো স্বাস্থ্য পরীক্ষা সম্পূর্ণ করেননি।',
  },
  'history.startFirst': {
    en: 'Start your first health check',
    hi: 'अपनी पहली स्वास्थ्य जांच शुरू करें',
    bn: 'আপনার প্রথম স্বাস্থ্য পরীক্ষা শুরু করুন',
  },
  'history.view': {
    en: 'View',
    hi: 'देखें',
    bn: 'দেখুন',
  },
  'history.delete': {
    en: 'Delete',
    hi: 'हटाएं',
    bn: 'মুছুন',
  },
  'history.confirmDelete': {
    en: 'Are you sure you want to delete this health check?',
    hi: 'क्या आप वाकई इस स्वास्थ्य जांच को हटाना चाहते हैं?',
    bn: 'আপনি কি নিশ্চিত যে আপনি এই স্বাস্থ্য পরীক্ষা মুছতে চান?',
  },

  // ===== PROFILE =====
  'profile.title': {
    en: 'Your Profile',
    hi: 'आपकी प्रोफ़ाइल',
    bn: 'আপনার প্রোফাইল',
  },
  'profile.personal': {
    en: 'Personal Information',
    hi: 'व्यक्तिगत जानकारी',
    bn: 'ব্যক্তিগত তথ্য',
  },
  'profile.health': {
    en: 'Health Information',
    hi: 'स्वास्थ्य जानकारी',
    bn: 'স্বাস্থ্য তথ্য',
  },
  'profile.emergency': {
    en: 'Emergency Contact',
    hi: 'आपातकालीन संपर्क',
    bn: 'জরুরি যোগাযোগ',
  },
  'profile.languagePref': {
    en: 'Language Preference',
    hi: 'भाषा वरीयता',
    bn: 'ভাষা পছন্দ',
  },
  'profile.privacyInfo': {
    en: 'Your information is stored locally on your device and is not shared without your consent.',
    hi: 'आपकी जानकारी आपके डिवाइस पर स्थानीय रूप से संग्रहीत है और आपकी सहमति के बिना साझा नहीं की जाती है।',
    bn: 'আপনার তথ্য আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষিত এবং আপনার সম্মতি ছাড়া শেয়ার করা হয় না।',
  },
  'profile.edit': {
    en: 'Edit Profile',
    hi: 'प्रोफ़ाइल संपादित करें',
    bn: 'প্রোফাইল সম্পাদনা',
  },
  'profile.save': {
    en: 'Save Changes',
    hi: 'परिवर्तन सहेजें',
    bn: 'পরিবর্তন সংরক্ষণ',
  },
  'profile.cancel': {
    en: 'Cancel',
    hi: 'रद्द करें',
    bn: 'বাতিল',
  },

  // ===== APPOINTMENTS =====
  'appointments.title': {
    en: 'Appointments',
    hi: 'अपॉइंटमेंट',
    bn: 'অ্যাপয়েন্টমেন্ট',
  },
  'appointments.empty': {
    en: 'You have no scheduled appointments.',
    hi: 'आपकी कोई निर्धारित अपॉइंटमेंट नहीं है।',
    bn: 'আপনার কোনো নির্ধারিত অ্যাপয়েন্টমেন্ট নেই।',
  },
  'appointments.book': {
    en: 'Book Appointment',
    hi: 'अपॉइंटमेंट बुक करें',
    bn: 'অ্যাপয়েন্টমেন্ট বুক করুন',
  },
  'appointments.specialty': {
    en: 'Select Specialty',
    hi: 'विशेषज्ञता चुनें',
    bn: 'বিশেষজ্ঞতা নির্বাচন',
  },
  'appointments.doctor': {
    en: 'Select Doctor',
    hi: 'डॉक्टर चुनें',
    bn: 'ডাক্তার নির্বাচন',
  },
  'appointments.date': {
    en: 'Select Date',
    hi: 'तारीख चुनें',
    bn: 'তারিখ নির্বাচন',
  },
  'appointments.time': {
    en: 'Select Time',
    hi: 'समय चुनें',
    bn: 'সময় নির্বাচন',
  },
  'appointments.reason': {
    en: 'Reason for Consultation',
    hi: 'परामर्श का कारण',
    bn: 'পরামর্শের কারণ',
  },
  'appointments.comingSoon': {
    en: 'Doctor profiles and online booking will be available soon.',
    hi: 'डॉक्टर प्रोफ़ाइल और ऑनलाइन बुकिंग जल्द उपलब्ध होगी।',
    bn: 'ডাক্তার প্রোফাইল এবং অনলাইন বুকিং শীঘ্রই উপলব্ধ হবে।',
  },

  // ===== INTEGRATION =====
  'integration.title': {
    en: 'Official Integrations',
    hi: 'आधिकारिक एकीकरण',
    bn: 'অফিসিয়াল ইন্টিগ্রেশন',
  },
  'integration.message': {
    en: 'Official health service integrations may be connected after proper authorization and API access.',
    hi: 'उचित प्राधिकरण और API पहुंच के बाद आधिकारिक स्वास्थ्य सेवा एकीकरण जोड़ा जा सकता है।',
    bn: 'যথাযথ অনুমোদন এবং API অ্যাক্সেসের পরে অফিসিয়াল স্বাস্থ্য পরিষেবা ইন্টিগ্রেশন সংযুক্ত করা যেতে পারে।',
  },

  // ===== COMMON / BUTTONS =====
  'common.yes': {
    en: 'Yes',
    hi: 'हां',
    bn: 'হ্যাঁ',
  },
  'common.no': {
    en: 'No',
    hi: 'नहीं',
    bn: 'না',
  },
  'common.save': {
    en: 'Save',
    hi: 'सहेजें',
    bn: 'সংরক্ষণ',
  },
  'common.cancel': {
    en: 'Cancel',
    hi: 'रद्द करें',
    bn: 'বাতিল',
  },
  'common.edit': {
    en: 'Edit',
    hi: 'संपादित करें',
    bn: 'সম্পাদনা',
  },
  'common.delete': {
    en: 'Delete',
    hi: 'हटाएं',
    bn: 'মুছুন',
  },
  'common.loading': {
    en: 'Loading...',
    hi: 'लोड हो रहा है...',
    bn: 'লোড হচ্ছে...',
  },
  'common.error': {
    en: 'Something went wrong. Please try again.',
    hi: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
    bn: 'কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
  },
  'common.confirm': {
    en: 'Confirm',
    hi: 'पुष्टि करें',
    bn: 'নিশ্চিত',
  },
  'common.back': {
    en: 'Back',
    hi: 'पीछे',
    bn: 'পিছনে',
  },
  'common.continue': {
    en: 'Continue',
    hi: 'जारी रखें',
    bn: 'চালিয়ে যান',
  },
  'common.close': {
    en: 'Close',
    hi: 'बंद करें',
    bn: 'বন্ধ',
  },
  'common.disclaimer': {
    en: 'Disclaimer',
    hi: 'अस्वीकरण',
    bn: 'দাবিত্যাগ',
  },
  'common.copy': {
    en: 'Copy',
    hi: 'कॉपी करें',
    bn: 'কপি করুন',
  },
  'footer.allRightsReserved': {
    en: 'All rights reserved.',
    hi: 'सर्वाधिकार सुरक्षित।',
    bn: 'সর্বস্বত্ব সংরক্ষিত।',
  },
  'appointments.success': {
    en: 'Appointment scheduled successfully!',
    hi: 'अपॉइंटमेंट सफलतापूर्वक निर्धारित किया गया!',
    bn: 'অ্যাপয়েন্টমেন্ট সফলভাবে নির্ধারিত হয়েছে!',
  },
  'appointments.newBooking': {
    en: 'New Booking',
    hi: 'नई बुकिंग',
    bn: 'নতুন বুকিং',
  },
  'appointments.submit': {
    en: 'Confirm Booking',
    hi: 'बुकिंग की पुष्टि करें',
    bn: 'বুকিং নিশ্চিত করুন',
  },
  'appointments.doctorPlaceholder': {
    en: 'Any available doctor',
    hi: 'कोई भी उपलब्ध डॉक्टर',
    bn: 'যেকোনো উপলব্ধ ডাক্তার',
  },

  // ===== MULTI-PORTAL NAVIGATION =====
  'nav.doctorPortal': {
    en: 'Doctor Portal',
    hi: 'डॉक्टर पोर्टल',
    bn: 'ডাক্তার পোর্টাল',
  },
  'nav.adminPortal': {
    en: 'Admin Portal',
    hi: 'एडमिन पोर्टल',
    bn: 'অ্যাডমিন পোর্টাল',
  },
  'nav.aiChat': {
    en: 'AI Assistant',
    hi: 'AI सहायक',
    bn: 'AI সহকারী',
  },
  'nav.prescriptions': {
    en: 'Prescriptions',
    hi: 'प्रिस्क्रिप्शन',
    bn: 'প্রেসক্রিপশন',
  },

  // ===== AI CHATBOT =====
  'chat.title': {
    en: 'RAHAT AI Health Assistant',
    hi: 'राहत AI स्वास्थ्य सहायक',
    bn: 'রাহাত AI স্বাস্থ্য সহকারী',
  },
  'chat.subtitle': {
    en: 'Ask any symptom question or describe how you feel in English, Hindi, or Bengali.',
    hi: 'किसी भी लक्षण के बारे में पूछें या बताएं कि आप कैसा महसूस कर रहे हैं।',
    bn: 'যেকোনো লক্ষণ সম্পর্কে জিজ্ঞাসা করুন বা আপনার অনুভূতি বর্ণনা করুন।',
  },
  'chat.placeholder': {
    en: 'Type your symptoms or health question...',
    hi: 'अपने लक्षण या स्वास्थ्य प्रश्न लिखें...',
    bn: 'আপনার লক্ষণ বা স্বাস্থ্য প্রশ্ন লিখুন...',
  },
  'chat.send': {
    en: 'Send',
    hi: 'भेजें',
    bn: 'পাঠান',
  },
  'chat.welcomeMsg': {
    en: 'Hello! I am RAHAT AI Health Assistant. How can I help you understand your symptoms today? You can describe any issue or choose a quick prompt below.',
    hi: 'नमस्ते! मैं राहत AI स्वास्थ्य सहायक हूँ। आज मैं आपके लक्षणों को समझने में आपकी कैसे मदद कर सकता हूँ? आप नीचे दिए गए विकल्पों में से चुन सकते हैं।',
    bn: 'নমস্কার! আমি রাহাত AI স্বাস্থ্য সহকারী। আজ আপনার লক্ষণগুলি বুঝতে আমি কীভাবে সাহায্য করতে পারি?',
  },
  'chat.prompt1': {
    en: 'I have mild fever and sore throat since yesterday',
    hi: 'मुझे कल से हल्का बुखार और गले में खराश है',
    bn: 'গতকাল থেকে আমার হালকা জ্বর ও গলা ব্যথা',
  },
  'chat.prompt2': {
    en: 'What should I do for severe stomach pain?',
    hi: 'पेट में तेज दर्द के लिए क्या करना चाहिए?',
    bn: 'তীব্র পেট ব্যথার জন্য কী করা উচিত?',
  },
  'chat.prompt3': {
    en: 'How to relieve a continuous dry cough?',
    hi: 'लगातार सूखी खांसी से कैसे राहत पाएं?',
    bn: 'একটানা শুকনো কাশি কীভাবে কমাবেন?',
  },
  'chat.convertReport': {
    en: '📋 Start Full Health Assessment',
    hi: '📋 पूरा स्वास्थ्य परीक्षण शुरू करें',
    bn: '📋 সম্পূর্ণ স্বাস্থ্য মূল্যায়ন শুরু করুন',
  },

  // ===== DOCTOR PORTAL =====
  'doctor.loginTitle': {
    en: 'Doctor Portal Login',
    hi: 'डॉक्टर पोर्टल लॉगिन',
    bn: 'ডাক্তার পোর্টাল লগইন',
  },
  'doctor.loginSubtitle': {
    en: 'Access clinical consultations, patient health summaries, and digital prescriptions.',
    hi: 'क्लिनिकल परामर्श, रोगी स्वास्थ्य सारांश और डिजिटल प्रिस्क्रिप्शन तक पहुँचें।',
    bn: 'ক্লিনিকাল পরামর্শ, রোগীর স্বাস্থ্য সারাংশ এবং ডিজিটাল প্রেসক্রিপশন অ্যাক্সেস করুন।',
  },
  'doctor.regNumber': {
    en: 'Medical Registration Number',
    hi: 'मेडिकल पंजीकरण संख्या',
    bn: 'মেডিকেল রেজিস্ট্রেশন নম্বর',
  },
  'doctor.regPlaceholder': {
    en: 'e.g. MCI-2018-84729',
    hi: 'उदा. MCI-2018-84729',
    bn: 'যেমন MCI-2018-84729',
  },
  'doctor.specialty': {
    en: 'Medical Specialty',
    hi: 'चिकित्सा विशेषता',
    bn: 'চিকিৎসা বিশেষজ্ঞতা',
  },
  'doctor.demoBtn': {
    en: 'Quick Demo Doctor Login (Dr. Rajesh Sharma)',
    hi: 'त्वरित डेमो डॉक्टर लॉगिन (डॉ. राजेश शर्मा)',
    bn: 'দ্রুত ডেমো ডাক্তার লগইন (ডাঃ রাজেশ শর্মা)',
  },
  'doctor.dashboard': {
    en: 'Doctor Clinical Dashboard',
    hi: 'डॉक्टर क्लिनिकल डैशबोर्ड',
    bn: 'ডাক্তার ক্লিনিকাল ড্যাশবোর্ড',
  },
  'doctor.patientLookup': {
    en: 'Patient Health ID Lookup',
    hi: 'रोगी स्वास्थ्य आईडी खोज',
    bn: 'রোগীর স্বাস্থ্য আইডি অনুসন্ধান',
  },
  'doctor.lookupPlaceholder': {
    en: 'Enter RAHAT Health ID (e.g. RAHAT-2026-ABC123)',
    hi: 'राहत स्वास्थ्य आईडी दर्ज करें',
    bn: 'রাহাত স্বাস্থ্য আইডি লিখুন',
  },
  'doctor.search': {
    en: 'Search Patient',
    hi: 'रोगी खोजें',
    bn: 'রোগী খুঁজুন',
  },
  'doctor.writeRx': {
    en: 'Write Digital Prescription',
    hi: 'डिजिटल प्रिस्क्रिप्शन लिखें',
    bn: 'ডিজিটাল প্রেসক্রিপশন লিখুন',
  },
  'doctor.activeQueue': {
    en: 'Today\'s Appointment Queue',
    hi: 'आज की अपॉइंटमेंट कतार',
    bn: 'আজকের অ্যাপয়েন্টমেন্ট সারি',
  },
  'doctor.rxTitle': {
    en: 'Digital Prescription Generator (Rx)',
    hi: 'डिजिटल प्रिस्क्रिप्शन जनरेटर (Rx)',
    bn: 'ডিজিটাল প্রেসক্রিপশন জেনারেটর (Rx)',
  },
  'doctor.diagnosis': {
    en: 'Clinical Diagnosis / Observations',
    hi: 'नैदानिक निदान / टिप्पणियाँ',
    bn: 'ক্লিনিকাল রোগ নির্ণয় / পর্যবেক্ষণ',
  },
  'doctor.addMedicine': {
    en: '+ Add Medication',
    hi: '+ दवाई जोड़ें',
    bn: '+ ওষুধ যোগ করুন',
  },
  'doctor.issueRx': {
    en: 'Sign & Issue Prescription',
    hi: 'हस्ताक्षर करें और प्रिस्क्रिप्शन जारी करें',
    bn: 'স্বাক্ষর ও প্রেসক্রিপশন প্রদান করুন',
  },

  // ===== ADMIN PORTAL =====
  'admin.loginTitle': {
    en: 'RAHAT Platform Administration',
    hi: 'राहत प्लेटफॉर्म प्रशासन',
    bn: 'রাহাত প্ল্যাটফর্ম প্রশাসন',
  },
  'admin.loginSubtitle': {
    en: 'System management, doctor verifications, and platform health telemetry.',
    hi: 'सिस्टम प्रबंधन, डॉक्टर सत्यापन और प्लेटफॉर्म टेलीमेट्री।',
    bn: 'সিস্টেম ব্যবস্থাপনা, ডাক্তার যাচাইকরণ এবং প্ল্যাটফর্ম টেলিমেট্রি।',
  },
  'admin.dashboard': {
    en: 'Platform Overview & Telemetry',
    hi: 'प्लेटफॉर्म अवलोकन और टेलीमेट्री',
    bn: 'প্ল্যাটফর্ম পরিদর্শন ও টেলিমেট্রি',
  },
  'admin.totalPatients': {
    en: 'Total Registered Patients',
    hi: 'कुल पंजीकृत रोगी',
    bn: 'মোট নিবন্ধিত রোগী',
  },
  'admin.activeDoctors': {
    en: 'Verified Active Doctors',
    hi: 'सत्यापित सक्रिय डॉक्टर',
    bn: 'যাচাইকৃত সক্রিয় ডাক্তার',
  },
  'admin.assessmentsDone': {
    en: 'AI Health Checks Completed',
    hi: 'पूर्ण किए गए AI स्वास्थ्य परीक्षण',
    bn: 'সম্পন্ন AI স্বাস্থ্য পরীক্ষা',
  },
  'admin.prescriptionsIssued': {
    en: 'Digital Prescriptions Issued',
    hi: 'जारी किए गए डिजिटल प्रिस्क्रिप्शन',
    bn: 'প্রদত্ত ডিজিটাল প্রেসক্রিপশন',
  },
  'admin.doctorManagement': {
    en: 'Doctor Verification Queue',
    hi: 'डॉक्टर सत्यापन कतार',
    bn: 'ডাক্তার যাচাইকরণ সারি',
  },
  'admin.userDirectory': {
    en: 'Patient Directory & Health IDs',
    hi: 'रोगी निर्देशिका और स्वास्थ्य आईडी',
    bn: 'রোগী ডিরেক্টরি এবং স্বাস্থ্য আইডি',
  },
  'admin.integrations': {
    en: 'Official Integrations & Compliance',
    hi: 'आधिकारिक एकीकरण और अनुपालन',
    bn: 'অফিসিয়াল ইন্টিগ্রেশন ও সম্মতি',
  },
  'admin.telemetryTitle': {
    en: 'System Control & Platform Telemetry',
    hi: 'सिस्टम नियंत्रण एवं प्लेटफ़ॉर्म टेलीमेट्री',
    bn: 'সিস্টেম নিয়ন্ত্রণ ও প্ল্যাটফর্ম টেলিমেট্রি',
  },
  'admin.liveDiagnostics': {
    en: 'System Diagnostics & Health Integrity',
    hi: 'सिस्टम डायग्नोस्टिक्स एवं स्वास्थ्य अखंडता',
    bn: 'সিস্টেম ডায়াগনস্টিকস ও স্বাস্থ্য সততা',
  },
  'admin.activeRegistry': {
    en: 'Live Medical & Patient Registry',
    hi: 'सक्रिय चिकित्सा एवं रोगी रजिस्ट्री',
    bn: 'সক্রিয় চিকিৎসা ও রোগী রেজিস্ট্রি',
  },

  // ===== ENHANCED DOCTOR DASHBOARD =====
  'doctor.clinicalDashboard': {
    en: 'Clinical Practitioner Suite',
    hi: 'क्लिनिकल प्रैक्टिशनर सूट',
    bn: 'ক্লিনিক্যাল প্র্যাকটিশনার স্যুট',
  },
  'doctor.lookupHeading': {
    en: 'Patient Health ID Triage Lookup',
    hi: 'रोगी स्वास्थ्य आईडी ट्राइएज खोज',
    bn: 'রোগী স্বাস্থ্য আইডি ট্রায়াজ অনুসন্ধান',
  },
  'doctor.lookupHelper': {
    en: 'Enter a RAHAT Health ID to inspect patient symptom history, duration, and AI assessment summaries.',
    hi: 'रोगी के लक्षण इतिहास, अवधि और AI मूल्यांकन सारांश देखने के लिए राहत स्वास्थ्य आईडी दर्ज करें।',
    bn: 'রোগীর লক্ষণ ইতিহাস, সময়কাল এবং AI মূল্যায়ন সারাংশ দেখতে রাহাত স্বাস্থ্য আইডি লিখুন।',
  },
  'doctor.queueHeading': {
    en: 'Today’s Patient Queue & Consultations',
    hi: 'आज के रोगियों की कतार और परामर्श',
    bn: 'আজকের রোগীর সারি ও পরামর্শ',
  },
  'doctor.issueNewRx': {
    en: 'Issue Official Digital Rx',
    hi: 'आधिकारिक डिजिटल प्रिस्क्रिप्शन जारी करें',
    bn: 'অফিসিয়াল ডিজিটাল প্রেসক্রিপশন প্রদান করুন',
  },

  // ===== ENHANCED PATIENT DASHBOARD =====
  'dashboard.healthCardTitle': {
    en: 'RAHAT Digital Health Card',
    hi: 'राहत डिजिटल स्वास्थ्य कार्ड',
    bn: 'রাহাত ডিজিটাল স্বাস্থ্য কার্ড',
  },
  'dashboard.healthCardDesc': {
    en: 'Your unique trilingual digital health identity. Share this ID with doctors during consultations.',
    hi: 'आपकी विशिष्ट त्रिभाषी डिजिटल स्वास्थ्य पहचान। परामर्श के दौरान डॉक्टरों के साथ यह आईडी साझा करें।',
    bn: 'আপনার অনন্য ত্রিভাষিক ডিজিটাল স্বাস্থ্য পরিচয়। পরামর্শের সময় ডাক্তারদের সাথে এই আইডি শেয়ার করুন।',
  },
  'dashboard.quickCheckTitle': {
    en: 'Start AI Health Assessment',
    hi: 'AI स्वास्थ्य परीक्षण शुरू करें',
    bn: 'AI স্বাস্থ্য মূল্যায়ন শুরু করুন',
  },
  'dashboard.quickCheckDesc': {
    en: 'Answer guided questions about your symptoms and generate a 3-version doctor-ready report.',
    hi: 'अपने लक्षणों के बारे में निर्देशित प्रश्नों के उत्तर दें और 3-संस्करण डॉक्टर-तैयार रिपोर्ट बनाएं।',
    bn: 'আপনার লক্ষণ সম্পর্কে গাইডেড প্রশ্নের উত্তর দিন এবং ৩-সংস্করণ ডাক্তার-প্রস্তুত রিপোর্ট তৈরি করুন।',
  },
  'dashboard.chatWidgetTitle': {
    en: 'Instant AI Health Assistant',
    hi: 'त्वरित AI स्वास्थ्य सहायक',
    bn: 'তাৎক্ষণিক AI স্বাস্থ্য সহকারী',
  },
  'dashboard.chatWidgetDesc': {
    en: 'Chat with our AI in English, Hindi, or Bengali for immediate symptom guidance and triage.',
    hi: 'त्वरित लक्षण मार्गदर्शन और ट्राइएज के लिए अंग्रेजी, हिंदी या बंगाली में हमारे AI से चैट करें।',
    bn: 'তাৎক্ষণিক লক্ষণ নির্দেশিকা ও ট্রায়াজের জন্য ইংরেজি, হিন্দি বা বাংলায় আমাদের AI এর সাথে চ্যাট করুন।',
  },
  'dashboard.myAppointments': {
    en: 'My Doctor Appointments',
    hi: 'मेरे डॉक्टर अपॉइंटमेंट्स',
    bn: 'আমার ডাক্তার অ্যাপয়েন্টমেন্ট',
  },
  'dashboard.recentAssessments': {
    en: 'Recent Health Assessment Reports',
    hi: 'हालिया स्वास्थ्य मूल्यांकन रिपोर्ट',
    bn: 'সাম্প্রতিক স্বাস্থ্য মূল্যায়ন রিপোর্ট',
  },

  // ===== LANGUAGE NAMES =====
  'lang.en': {
    en: 'English',
    hi: 'English',
    bn: 'English',
  },
  'lang.hi': {
    en: 'हिन्दी',
    hi: 'हिन्दी',
    bn: 'হিন্দি',
  },
  'lang.bn': {
    en: 'বাংলা',
    hi: 'बंगाली',
    bn: 'বাংলা',
  },
};

/**
 * Get a translation by key for the given language.
 * Falls back to English if the key or language is missing.
 */
export function getTranslation(key: string, language: Language): string {
  const entry = translations[key];
  if (!entry) {
    console.warn(`[i18n] Missing translation key: "${key}"`);
    return key; // Return the key itself as fallback
  }
  return entry[language] || entry.en || key;
}
