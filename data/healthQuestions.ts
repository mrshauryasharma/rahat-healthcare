// data/healthQuestions.ts — Structured health assessment questions for RAHAT
// Each concern has base questions and conditional follow-up questions
// Questions adapt based on previous answers

import { HealthQuestion } from '@/types/health';

// All questions organized by concern
const allQuestions: HealthQuestion[] = [
  // ===== COLD =====
  {
    id: 'cold-duration',
    concernId: 'cold',
    text: { en: 'How long have you had the cold?', hi: 'आपको सर्दी-जुकाम कब से है?', bn: 'আপনার সর্দি কতদিন ধরে?' },
    options: [
      { id: 'cold-dur-1', text: { en: 'Just started today', hi: 'आज ही शुरू हुआ', bn: 'আজই শুরু হয়েছে' } },
      { id: 'cold-dur-2', text: { en: '1-3 days', hi: '1-3 दिन', bn: '১-৩ দিন' } },
      { id: 'cold-dur-3', text: { en: '4-7 days', hi: '4-7 दिन', bn: '৪-৭ দিন' } },
      { id: 'cold-dur-4', text: { en: 'More than a week', hi: 'एक हफ्ते से ज्यादा', bn: 'এক সপ্তাহের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'cold-severity',
    concernId: 'cold',
    text: { en: 'How severe is your cold?', hi: 'आपकी सर्दी कितनी तेज है?', bn: 'আপনার সর্দি কতটা তীব্র?' },
    options: [
      { id: 'cold-sev-1', text: { en: 'Mild — slight runny nose', hi: 'हल्की — थोड़ी नाक बहना', bn: 'হালকা — সামান্য নাক দিয়ে পানি পড়া' } },
      { id: 'cold-sev-2', text: { en: 'Moderate — congestion and sneezing', hi: 'मध्यम — बंद नाक और छींक', bn: 'মাঝারি — নাক বন্ধ এবং হাঁচি' } },
      { id: 'cold-sev-3', text: { en: 'Severe — very blocked, hard to breathe', hi: 'तेज — बहुत बंद, सांस लेना मुश्किल', bn: 'তীব্র — খুব বন্ধ, শ্বাস নিতে কষ্ট' }, isWarning: true },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'cold-fever',
    concernId: 'cold',
    text: { en: 'Do you also have a fever?', hi: 'क्या आपको बुखार भी है?', bn: 'আপনার কি জ্বরও আছে?' },
    options: [
      { id: 'cold-fev-1', text: { en: 'No fever', hi: 'बुखार नहीं', bn: 'জ্বর নেই' } },
      { id: 'cold-fev-2', text: { en: 'Mild fever', hi: 'हल्का बुखार', bn: 'হালকা জ্বর' } },
      { id: 'cold-fev-3', text: { en: 'High fever', hi: 'तेज बुखार', bn: 'উচ্চ জ্বর' }, isWarning: true },
    ],
    isRequired: false,
    order: 3,
  },
  {
    id: 'cold-throat',
    concernId: 'cold',
    text: { en: 'Do you have a sore throat?', hi: 'क्या आपके गले में खराश है?', bn: 'আপনার কি গলা ব্যথা আছে?' },
    options: [
      { id: 'cold-thr-1', text: { en: 'No', hi: 'नहीं', bn: 'না' } },
      { id: 'cold-thr-2', text: { en: 'Mild soreness', hi: 'हल्की खराश', bn: 'হালকা ব্যথা' } },
      { id: 'cold-thr-3', text: { en: 'Painful to swallow', hi: 'निगलने में दर्द', bn: 'গিলতে ব্যথা' } },
    ],
    isRequired: false,
    order: 4,
  },
  {
    id: 'cold-medication',
    concernId: 'cold',
    text: { en: 'Have you taken any medicine?', hi: 'क्या आपने कोई दवाई ली है?', bn: 'আপনি কি কোনো ওষুধ খেয়েছেন?' },
    options: [
      { id: 'cold-med-1', text: { en: 'No medicine taken', hi: 'कोई दवाई नहीं', bn: 'কোনো ওষুধ খাইনি' } },
      { id: 'cold-med-2', text: { en: 'Over-the-counter cold medicine', hi: 'सामान्य सर्दी की दवाई', bn: 'সাধারণ সর্দির ওষুধ' } },
      { id: 'cold-med-3', text: { en: 'Prescribed medicine', hi: 'डॉक्टर की लिखी दवाई', bn: 'ডাক্তারের দেওয়া ওষুধ' } },
    ],
    isRequired: false,
    order: 5,
  },

  // ===== FEVER =====
  {
    id: 'fever-duration',
    concernId: 'fever',
    text: { en: 'How long have you had the fever?', hi: 'आपको बुखार कब से है?', bn: 'আপনার জ্বর কতদিন ধরে?' },
    options: [
      { id: 'fever-dur-1', text: { en: 'Just started today', hi: 'आज ही शुरू हुआ', bn: 'আজই শুরু হয়েছে' } },
      { id: 'fever-dur-2', text: { en: '1-2 days', hi: '1-2 दिन', bn: '১-২ দিন' } },
      { id: 'fever-dur-3', text: { en: '3-5 days', hi: '3-5 दिन', bn: '৩-৫ দিন' } },
      { id: 'fever-dur-4', text: { en: 'More than 5 days', hi: '5 दिन से ज्यादा', bn: '৫ দিনের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'fever-level',
    concernId: 'fever',
    text: { en: 'How high is the fever?', hi: 'बुखार कितना तेज है?', bn: 'জ্বর কতটা বেশি?' },
    options: [
      { id: 'fever-lev-1', text: { en: 'Mild (up to 100°F / 38°C)', hi: 'हल्का (100°F / 38°C तक)', bn: 'হালকা (১০০°F / ৩৮°C পর্যন্ত)' } },
      { id: 'fever-lev-2', text: { en: 'Moderate (100-102°F / 38-39°C)', hi: 'मध्यम (100-102°F / 38-39°C)', bn: 'মাঝারি (১০০-১০২°F / ৩৮-৩৯°C)' } },
      { id: 'fever-lev-3', text: { en: 'High (above 102°F / 39°C)', hi: 'तेज (102°F / 39°C से ऊपर)', bn: 'উচ্চ (১০২°F / ৩৯°C এর উপরে)' }, isWarning: true },
      { id: 'fever-lev-4', text: { en: 'Not sure / No thermometer', hi: 'पता नहीं / थर्मामीटर नहीं है', bn: 'জানি না / থার্মোমিটার নেই' } },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'fever-bodyache',
    concernId: 'fever',
    text: { en: 'Are you experiencing body pain?', hi: 'क्या आपको बदन दर्द हो रहा है?', bn: 'আপনার কি শরীরে ব্যথা হচ্ছে?' },
    options: [
      { id: 'fever-ba-1', text: { en: 'No body pain', hi: 'बदन दर्द नहीं', bn: 'শরীরে ব্যথা নেই' } },
      { id: 'fever-ba-2', text: { en: 'Mild body ache', hi: 'हल्का बदन दर्द', bn: 'হালকা শরীর ব্যথা' } },
      { id: 'fever-ba-3', text: { en: 'Severe body pain', hi: 'तेज बदन दर्द', bn: 'তীব্র শরীর ব্যথা' } },
    ],
    isRequired: true,
    order: 3,
  },
  {
    id: 'fever-other',
    concernId: 'fever',
    text: { en: 'Do you have any other symptoms?', hi: 'क्या और कोई लक्षण हैं?', bn: 'অন্য কোনো লক্ষণ আছে?' },
    options: [
      { id: 'fever-oth-1', text: { en: 'Headache', hi: 'सिरदर्द', bn: 'মাথাব্যথা' } },
      { id: 'fever-oth-2', text: { en: 'Cold and cough', hi: 'सर्दी और खांसी', bn: 'সর্দি এবং কাশি' } },
      { id: 'fever-oth-3', text: { en: 'Vomiting or nausea', hi: 'उल्टी या जी मिचलाना', bn: 'বমি বা বমি ভাব' } },
      { id: 'fever-oth-4', text: { en: 'Rash or skin changes', hi: 'चकत्ते या त्वचा में बदलाव', bn: 'ফুসকুড়ি বা ত্বকে পরিবর্তন' }, isWarning: true },
      { id: 'fever-oth-5', text: { en: 'No other symptoms', hi: 'और कोई लक्षण नहीं', bn: 'অন্য কোনো লক্ষণ নেই' } },
    ],
    isRequired: false,
    order: 4,
  },
  {
    id: 'fever-medication',
    concernId: 'fever',
    text: { en: 'Have you taken any medicine for the fever?', hi: 'क्या बुखार के लिए कोई दवाई ली है?', bn: 'জ্বরের জন্য কোনো ওষুধ খেয়েছেন?' },
    options: [
      { id: 'fever-med-1', text: { en: 'No medicine taken', hi: 'कोई दवाई नहीं ली', bn: 'কোনো ওষুধ খাইনি' } },
      { id: 'fever-med-2', text: { en: 'Paracetamol / Acetaminophen', hi: 'पैरासिटामोल', bn: 'প্যারাসিটামল' } },
      { id: 'fever-med-3', text: { en: 'Other medicine', hi: 'कोई और दवाई', bn: 'অন্য ওষুধ' } },
    ],
    isRequired: false,
    order: 5,
  },

  // ===== HEADACHE =====
  {
    id: 'head-duration',
    concernId: 'headache',
    text: { en: 'How long have you had the headache?', hi: 'आपको सिरदर्द कब से है?', bn: 'আপনার মাথাব্যথা কতদিন ধরে?' },
    options: [
      { id: 'head-dur-1', text: { en: 'A few hours', hi: 'कुछ घंटे', bn: 'কয়েক ঘণ্টা' } },
      { id: 'head-dur-2', text: { en: '1-2 days', hi: '1-2 दिन', bn: '১-২ দিন' } },
      { id: 'head-dur-3', text: { en: '3+ days', hi: '3 दिन से ज्यादा', bn: '৩ দিনের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'head-type',
    concernId: 'headache',
    text: { en: 'What type of headache is it?', hi: 'किस तरह का सिरदर्द है?', bn: 'কোন ধরনের মাথাব্যথা?' },
    options: [
      { id: 'head-typ-1', text: { en: 'Dull pressure on both sides', hi: 'दोनों तरफ हल्का दबाव', bn: 'দুই দিকে চাপ অনুভব' } },
      { id: 'head-typ-2', text: { en: 'Throbbing on one side', hi: 'एक तरफ धड़कता हुआ दर्द', bn: 'একদিকে ধুকপুক ব্যথা' } },
      { id: 'head-typ-3', text: { en: 'Behind the eyes', hi: 'आंखों के पीछे', bn: 'চোখের পিছনে' } },
      { id: 'head-typ-4', text: { en: 'Sudden and severe', hi: 'अचानक और तेज', bn: 'হঠাৎ এবং তীব্র' }, isWarning: true },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'head-vision',
    concernId: 'headache',
    text: { en: 'Any vision problems?', hi: 'क्या आंखों की कोई समस्या है?', bn: 'দৃষ্টিতে কোনো সমস্যা?' },
    options: [
      { id: 'head-vis-1', text: { en: 'No', hi: 'नहीं', bn: 'না' } },
      { id: 'head-vis-2', text: { en: 'Blurry vision', hi: 'धुंधला दिखना', bn: 'ঝাপসা দেখা' } },
      { id: 'head-vis-3', text: { en: 'Sensitivity to light', hi: 'रोशनी से तकलीफ', bn: 'আলোতে অসুবিধা' } },
    ],
    isRequired: false,
    order: 3,
  },
  {
    id: 'head-medication',
    concernId: 'headache',
    text: { en: 'Have you taken any pain relief?', hi: 'क्या कोई दर्द की दवाई ली?', bn: 'কোনো ব্যথার ওষুধ খেয়েছেন?' },
    options: [
      { id: 'head-med-1', text: { en: 'No', hi: 'नहीं', bn: 'না' } },
      { id: 'head-med-2', text: { en: 'Yes, it helped', hi: 'हां, आराम मिला', bn: 'হ্যাঁ, কাজ করেছে' } },
      { id: 'head-med-3', text: { en: 'Yes, but no relief', hi: 'हां, पर आराम नहीं मिला', bn: 'হ্যাঁ, কিন্তু কাজ হয়নি' } },
    ],
    isRequired: false,
    order: 4,
  },

  // ===== COUGH =====
  {
    id: 'cough-duration',
    concernId: 'cough',
    text: { en: 'How long have you had the cough?', hi: 'आपको खांसी कब से है?', bn: 'আপনার কাশি কতদিন ধরে?' },
    options: [
      { id: 'cough-dur-1', text: { en: '1-3 days', hi: '1-3 दिन', bn: '১-৩ দিন' } },
      { id: 'cough-dur-2', text: { en: '4-7 days', hi: '4-7 दिन', bn: '৪-৭ দিন' } },
      { id: 'cough-dur-3', text: { en: 'More than a week', hi: 'एक हफ्ते से ज्यादा', bn: 'এক সপ্তাহের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'cough-type',
    concernId: 'cough',
    text: { en: 'What type of cough?', hi: 'किस तरह की खांसी है?', bn: 'কোন ধরনের কাশি?' },
    options: [
      { id: 'cough-typ-1', text: { en: 'Dry cough', hi: 'सूखी खांसी', bn: 'শুকনো কাশি' } },
      { id: 'cough-typ-2', text: { en: 'Wet cough (with mucus)', hi: 'बलगम वाली खांसी', bn: 'কফযুক্ত কাশি' } },
      { id: 'cough-typ-3', text: { en: 'Cough with chest discomfort', hi: 'छाती में तकलीफ के साथ खांसी', bn: 'বুকে অস্বস্তির সাথে কাশি' }, isWarning: true },
      { id: 'cough-typ-4', text: { en: 'Cough with breathing difficulty', hi: 'सांस लेने में कठिनाई के साथ खांसी', bn: 'শ্বাসকষ্টের সাথে কাশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'cough-blood',
    concernId: 'cough',
    text: { en: 'Any blood in the cough?', hi: 'क्या खांसी में खून आता है?', bn: 'কাশিতে কি রক্ত আসে?' },
    options: [
      { id: 'cough-bld-1', text: { en: 'No', hi: 'नहीं', bn: 'না' } },
      { id: 'cough-bld-2', text: { en: 'Yes', hi: 'हां', bn: 'হ্যাঁ' }, isWarning: true },
    ],
    isRequired: true,
    order: 3,
  },
  {
    id: 'cough-fever',
    concernId: 'cough',
    text: { en: 'Do you have a fever with the cough?', hi: 'क्या खांसी के साथ बुखार भी है?', bn: 'কাশির সাথে জ্বর আছে?' },
    options: [
      { id: 'cough-fev-1', text: { en: 'No fever', hi: 'बुखार नहीं', bn: 'জ্বর নেই' } },
      { id: 'cough-fev-2', text: { en: 'Mild fever', hi: 'हल्का बुखार', bn: 'হালকা জ্বর' } },
      { id: 'cough-fev-3', text: { en: 'High fever', hi: 'तेज बुखार', bn: 'উচ্চ জ্বর' }, isWarning: true },
    ],
    isRequired: false,
    order: 4,
  },

  // ===== STOMACH PAIN =====
  {
    id: 'stomach-duration',
    concernId: 'stomach-pain',
    text: { en: 'How long have you had stomach pain?', hi: 'पेट दर्द कब से है?', bn: 'পেটে ব্যথা কতদিন ধরে?' },
    options: [
      { id: 'stom-dur-1', text: { en: 'A few hours', hi: 'कुछ घंटे', bn: 'কয়েক ঘণ্টা' } },
      { id: 'stom-dur-2', text: { en: '1-2 days', hi: '1-2 दिन', bn: '১-২ দিন' } },
      { id: 'stom-dur-3', text: { en: 'More than 3 days', hi: '3 दिन से ज्यादा', bn: '৩ দিনের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'stomach-location',
    concernId: 'stomach-pain',
    text: { en: 'Where is the pain?', hi: 'दर्द कहां हो रहा है?', bn: 'ব্যথা কোথায়?' },
    options: [
      { id: 'stom-loc-1', text: { en: 'Upper stomach', hi: 'ऊपरी पेट', bn: 'পেটের উপরের দিকে' } },
      { id: 'stom-loc-2', text: { en: 'Lower stomach', hi: 'निचला पेट', bn: 'পেটের নিচের দিকে' } },
      { id: 'stom-loc-3', text: { en: 'Around the navel', hi: 'नाभि के आसपास', bn: 'নাভির চারপাশে' } },
      { id: 'stom-loc-4', text: { en: 'All over', hi: 'पूरे पेट में', bn: 'সারা পেটে' } },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'stomach-type',
    concernId: 'stomach-pain',
    text: { en: 'What type of pain?', hi: 'कैसा दर्द है?', bn: 'কেমন ধরনের ব্যথা?' },
    options: [
      { id: 'stom-typ-1', text: { en: 'Cramping', hi: 'ऐंठन', bn: 'খিঁচুনি' } },
      { id: 'stom-typ-2', text: { en: 'Burning', hi: 'जलन', bn: 'জ্বালা' } },
      { id: 'stom-typ-3', text: { en: 'Sharp or stabbing', hi: 'तेज चुभने वाला', bn: 'তীক্ষ্ণ বা ছুরিকাঘাতের মতো' }, isWarning: true },
      { id: 'stom-typ-4', text: { en: 'Dull and constant', hi: 'हल्का लगातार दर्द', bn: 'মৃদু এবং ক্রমাগত' } },
    ],
    isRequired: true,
    order: 3,
  },
  {
    id: 'stomach-other',
    concernId: 'stomach-pain',
    text: { en: 'Other symptoms with stomach pain?', hi: 'पेट दर्द के साथ और लक्षण?', bn: 'পেটে ব্যথার সাথে অন্য লক্ষণ?' },
    options: [
      { id: 'stom-oth-1', text: { en: 'Nausea or vomiting', hi: 'जी मिचलाना या उल्टी', bn: 'বমি ভাব বা বমি' } },
      { id: 'stom-oth-2', text: { en: 'Diarrhea', hi: 'दस्त', bn: 'ডায়রিয়া' } },
      { id: 'stom-oth-3', text: { en: 'Bloating or gas', hi: 'पेट फूलना या गैस', bn: 'পেট ফোলা বা গ্যাস' } },
      { id: 'stom-oth-4', text: { en: 'No other symptoms', hi: 'कोई और लक्षण नहीं', bn: 'অন্য কোনো লক্ষণ নেই' } },
    ],
    isRequired: false,
    order: 4,
  },

  // ===== SORE THROAT =====
  {
    id: 'throat-duration',
    concernId: 'sore-throat',
    text: { en: 'How long has your throat been sore?', hi: 'गले में खराश कब से है?', bn: 'গলা ব্যথা কতদিন ধরে?' },
    options: [
      { id: 'thr-dur-1', text: { en: '1-2 days', hi: '1-2 दिन', bn: '১-২ দিন' } },
      { id: 'thr-dur-2', text: { en: '3-5 days', hi: '3-5 दिन', bn: '৩-৫ দিন' } },
      { id: 'thr-dur-3', text: { en: 'More than 5 days', hi: '5 दिन से ज्यादा', bn: '৫ দিনের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'throat-swallow',
    concernId: 'sore-throat',
    text: { en: 'Is it painful to swallow?', hi: 'क्या निगलने में दर्द है?', bn: 'গিলতে কি ব্যথা হয়?' },
    options: [
      { id: 'thr-swl-1', text: { en: 'No', hi: 'नहीं', bn: 'না' } },
      { id: 'thr-swl-2', text: { en: 'Slightly painful', hi: 'थोड़ा दर्द', bn: 'সামান্য ব্যথা' } },
      { id: 'thr-swl-3', text: { en: 'Very painful', hi: 'बहुत दर्द', bn: 'খুব ব্যথা' } },
      { id: 'thr-swl-4', text: { en: 'Cannot swallow at all', hi: 'निगल ही नहीं पा रहे', bn: 'একেবারেই গিলতে পারছি না' }, isWarning: true },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'throat-voice',
    concernId: 'sore-throat',
    text: { en: 'Any changes in your voice?', hi: 'क्या आवाज़ में बदलाव है?', bn: 'গলার স্বরে কোনো পরিবর্তন?' },
    options: [
      { id: 'thr-voi-1', text: { en: 'Normal voice', hi: 'सामान्य आवाज़', bn: 'স্বাভাবিক গলা' } },
      { id: 'thr-voi-2', text: { en: 'Hoarse or raspy', hi: 'भारी या कर्कश', bn: 'ভাঙা বা কর্কশ' } },
      { id: 'thr-voi-3', text: { en: 'Lost voice', hi: 'आवाज़ चली गई', bn: 'গলা বসে গেছে' } },
    ],
    isRequired: false,
    order: 3,
  },

  // ===== BODY PAIN =====
  {
    id: 'body-duration',
    concernId: 'body-pain',
    text: { en: 'How long have you had body pain?', hi: 'बदन दर्द कब से है?', bn: 'শরীর ব্যথা কতদিন ধরে?' },
    options: [
      { id: 'body-dur-1', text: { en: '1-2 days', hi: '1-2 दिन', bn: '১-২ দিন' } },
      { id: 'body-dur-2', text: { en: '3-7 days', hi: '3-7 दिन', bn: '৩-৭ দিন' } },
      { id: 'body-dur-3', text: { en: 'More than a week', hi: 'एक हफ्ते से ज्यादा', bn: 'এক সপ্তাহের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'body-location',
    concernId: 'body-pain',
    text: { en: 'Where does it hurt?', hi: 'कहां दर्द हो रहा है?', bn: 'কোথায় ব্যথা?' },
    options: [
      { id: 'body-loc-1', text: { en: 'Muscles all over', hi: 'पूरे शरीर की मांसपेशियां', bn: 'সারা শরীরের মাংসপেশী' } },
      { id: 'body-loc-2', text: { en: 'Joints', hi: 'जोड़ों में', bn: 'জয়েন্টে' } },
      { id: 'body-loc-3', text: { en: 'Back', hi: 'कमर/पीठ', bn: 'পিঠ/কোমর' } },
      { id: 'body-loc-4', text: { en: 'Legs or arms', hi: 'हाथ या पैर', bn: 'হাত বা পা' } },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'body-activity',
    concernId: 'body-pain',
    text: { en: 'Does it affect your daily activities?', hi: 'क्या इससे रोज़ के काम में दिक्कत होती है?', bn: 'এটা কি দৈনন্দিন কাজে বাধা দেয়?' },
    options: [
      { id: 'body-act-1', text: { en: 'No, I can manage', hi: 'नहीं, संभाल लेता/लेती हूं', bn: 'না, সামলাতে পারি' } },
      { id: 'body-act-2', text: { en: 'Somewhat difficult', hi: 'कुछ कठिनाई', bn: 'কিছুটা কঠিন' } },
      { id: 'body-act-3', text: { en: 'Very difficult, need rest', hi: 'बहुत कठिन, आराम चाहिए', bn: 'খুব কঠিন, বিশ্রাম দরকার' } },
    ],
    isRequired: false,
    order: 3,
  },

  // ===== VOMITING =====
  {
    id: 'vomit-duration',
    concernId: 'vomiting',
    text: { en: 'When did the vomiting start?', hi: 'उल्टी कब से हो रही है?', bn: 'বমি কখন থেকে হচ্ছে?' },
    options: [
      { id: 'vom-dur-1', text: { en: 'A few hours ago', hi: 'कुछ घंटे पहले', bn: 'কয়েক ঘণ্টা আগে' } },
      { id: 'vom-dur-2', text: { en: 'Since yesterday', hi: 'कल से', bn: 'গতকাল থেকে' } },
      { id: 'vom-dur-3', text: { en: '2+ days', hi: '2 दिन से ज्यादा', bn: '২ দিনের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'vomit-frequency',
    concernId: 'vomiting',
    text: { en: 'How often are you vomiting?', hi: 'कितनी बार उल्टी हो रही है?', bn: 'কতবার বমি হচ্ছে?' },
    options: [
      { id: 'vom-frq-1', text: { en: 'Once or twice', hi: 'एक या दो बार', bn: 'একবার বা দুইবার' } },
      { id: 'vom-frq-2', text: { en: 'Several times a day', hi: 'दिन में कई बार', bn: 'দিনে কয়েকবার' } },
      { id: 'vom-frq-3', text: { en: 'Cannot keep anything down', hi: 'कुछ भी नहीं रुक रहा', bn: 'কিছুই পেটে থাকছে না' }, isWarning: true },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'vomit-water',
    concernId: 'vomiting',
    text: { en: 'Can you drink water?', hi: 'क्या आप पानी पी पा रहे हैं?', bn: 'আপনি কি পানি খেতে পারছেন?' },
    options: [
      { id: 'vom-wat-1', text: { en: 'Yes, I can drink normally', hi: 'हां, सामान्य रूप से', bn: 'হ্যাঁ, স্বাভাবিকভাবে' } },
      { id: 'vom-wat-2', text: { en: 'Small sips only', hi: 'बस थोड़ा-थोड़ा', bn: 'অল্প অল্প করে' } },
      { id: 'vom-wat-3', text: { en: 'No, even water comes back up', hi: 'नहीं, पानी भी वापस आ जाता है', bn: 'না, পানিও উঠে আসে' }, isWarning: true },
    ],
    isRequired: true,
    order: 3,
  },

  // ===== DIARRHEA =====
  {
    id: 'diarrhea-duration',
    concernId: 'diarrhea',
    text: { en: 'How long have you had diarrhea?', hi: 'दस्त कब से हो रहे हैं?', bn: 'ডায়রিয়া কতদিন ধরে?' },
    options: [
      { id: 'dia-dur-1', text: { en: 'Just started today', hi: 'आज ही शुरू हुआ', bn: 'আজই শুরু হয়েছে' } },
      { id: 'dia-dur-2', text: { en: '1-2 days', hi: '1-2 दिन', bn: '১-২ দিন' } },
      { id: 'dia-dur-3', text: { en: 'More than 3 days', hi: '3 दिन से ज्यादा', bn: '৩ দিনের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'diarrhea-frequency',
    concernId: 'diarrhea',
    text: { en: 'How frequent are the stools?', hi: 'कितनी बार मल त्याग हो रहा है?', bn: 'কতবার মলত্যাগ হচ্ছে?' },
    options: [
      { id: 'dia-frq-1', text: { en: '2-3 times a day', hi: 'दिन में 2-3 बार', bn: 'দিনে ২-৩ বার' } },
      { id: 'dia-frq-2', text: { en: '4-6 times a day', hi: 'दिन में 4-6 बार', bn: 'দিনে ৪-৬ বার' } },
      { id: 'dia-frq-3', text: { en: 'More than 6 times', hi: '6 बार से ज्यादा', bn: '৬ বারের বেশি' }, isWarning: true },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'diarrhea-blood',
    concernId: 'diarrhea',
    text: { en: 'Is there blood in the stool?', hi: 'क्या मल में खून आता है?', bn: 'মলে কি রক্ত আছে?' },
    options: [
      { id: 'dia-bld-1', text: { en: 'No', hi: 'नहीं', bn: 'না' } },
      { id: 'dia-bld-2', text: { en: 'Yes', hi: 'हां', bn: 'হ্যাঁ' }, isWarning: true },
    ],
    isRequired: true,
    order: 3,
  },
  {
    id: 'diarrhea-hydration',
    concernId: 'diarrhea',
    text: { en: 'Are you able to stay hydrated?', hi: 'क्या आप पर्याप्त पानी पी पा रहे हैं?', bn: 'আপনি কি যথেষ্ট পানি পান করতে পারছেন?' },
    options: [
      { id: 'dia-hyd-1', text: { en: 'Yes, drinking enough fluids', hi: 'हां, पर्याप्त तरल ले रहा/रही हूं', bn: 'হ্যাঁ, যথেষ্ট তরল খাচ্ছি' } },
      { id: 'dia-hyd-2', text: { en: 'Trying but difficult', hi: 'कोशिश कर रहा/रही हूं पर मुश्किल है', bn: 'চেষ্টা করছি কিন্তু কঠিন' } },
      { id: 'dia-hyd-3', text: { en: 'Feeling dehydrated', hi: 'शरीर में पानी की कमी महसूस हो रही है', bn: 'পানিশূন্যতা অনুভব হচ্ছে' }, isWarning: true },
    ],
    isRequired: false,
    order: 4,
  },

  // ===== SKIN PROBLEM =====
  {
    id: 'skin-duration',
    concernId: 'skin-problem',
    text: { en: 'When did the skin problem start?', hi: 'त्वचा की समस्या कब से है?', bn: 'চর্মরোগ কখন থেকে?' },
    options: [
      { id: 'skin-dur-1', text: { en: 'Today', hi: 'आज', bn: 'আজ' } },
      { id: 'skin-dur-2', text: { en: 'A few days ago', hi: 'कुछ दिन पहले', bn: 'কয়েকদিন আগে' } },
      { id: 'skin-dur-3', text: { en: 'More than a week', hi: 'एक हफ्ते से ज्यादा', bn: 'এক সপ্তাহের বেশি' } },
      { id: 'skin-dur-4', text: { en: 'Recurring/chronic', hi: 'बार-बार होता है', bn: 'বারবার হয়' } },
    ],
    isRequired: true,
    order: 1,
  },
  {
    id: 'skin-type',
    concernId: 'skin-problem',
    text: { en: 'What does it look/feel like?', hi: 'यह कैसा दिखता/महसूस होता है?', bn: 'এটা দেখতে/অনুভব করতে কেমন?' },
    options: [
      { id: 'skin-typ-1', text: { en: 'Red rash', hi: 'लाल चकत्ते', bn: 'লাল ফুসকুড়ি' } },
      { id: 'skin-typ-2', text: { en: 'Itching', hi: 'खुजली', bn: 'চুলকানি' } },
      { id: 'skin-typ-3', text: { en: 'Bumps or blisters', hi: 'दाने या फफोले', bn: 'গুটি বা ফোসকা' } },
      { id: 'skin-typ-4', text: { en: 'Dry or flaky skin', hi: 'रूखी या पपड़ीदार त्वचा', bn: 'শুষ্ক বা খসখসে ত্বক' } },
      { id: 'skin-typ-5', text: { en: 'Swelling or pus', hi: 'सूजन या मवाद', bn: 'ফোলা বা পুঁজ' }, isWarning: true },
    ],
    isRequired: true,
    order: 2,
  },
  {
    id: 'skin-area',
    concernId: 'skin-problem',
    text: { en: 'Where on your body?', hi: 'शरीर में कहां?', bn: 'শরীরের কোথায়?' },
    options: [
      { id: 'skin-area-1', text: { en: 'Face', hi: 'चेहरा', bn: 'মুখ' } },
      { id: 'skin-area-2', text: { en: 'Arms or legs', hi: 'हाथ या पैर', bn: 'হাত বা পা' } },
      { id: 'skin-area-3', text: { en: 'Chest or back', hi: 'छाती या पीठ', bn: 'বুক বা পিঠ' } },
      { id: 'skin-area-4', text: { en: 'All over the body', hi: 'पूरे शरीर में', bn: 'সারা শরীরে' }, isWarning: true },
    ],
    isRequired: false,
    order: 3,
  },
  {
    id: 'skin-spread',
    concernId: 'skin-problem',
    text: { en: 'Is it spreading?', hi: 'क्या यह फैल रहा है?', bn: 'এটা কি ছড়াচ্ছে?' },
    options: [
      { id: 'skin-spr-1', text: { en: 'No, staying the same', hi: 'नहीं, वैसा ही है', bn: 'না, একই রকম আছে' } },
      { id: 'skin-spr-2', text: { en: 'Yes, slowly', hi: 'हां, धीरे-धीरे', bn: 'হ্যাঁ, ধীরে ধীরে' } },
      { id: 'skin-spr-3', text: { en: 'Yes, quickly', hi: 'हां, तेजी से', bn: 'হ্যাঁ, দ্রুত' }, isWarning: true },
    ],
    isRequired: false,
    order: 4,
  },
];

/**
 * Get all questions for a specific health concern.
 * Returns them sorted by order.
 */
export function getQuestionsForConcern(concernId: string): HealthQuestion[] {
  return allQuestions
    .filter((q) => q.concernId === concernId)
    .sort((a, b) => a.order - b.order);
}

/**
 * Get a specific question by ID.
 */
export function getQuestionById(questionId: string): HealthQuestion | undefined {
  return allQuestions.find((q) => q.id === questionId);
}

/**
 * Check if a follow-up question should be shown based on previous answers.
 * If a question has no follow-up conditions, it's always shown.
 */
export function shouldShowQuestion(
  question: HealthQuestion,
  previousAnswers: { questionId: string; answerId: string }[]
): boolean {
  // If no follow-up conditions, always show the question
  if (!question.followUpConditions || question.followUpConditions.length === 0) {
    return true;
  }

  // Show if ANY follow-up condition is met
  return question.followUpConditions.some((condition) =>
    previousAnswers.some(
      (answer) =>
        answer.questionId === condition.questionId &&
        answer.answerId === condition.answerId
    )
  );
}
