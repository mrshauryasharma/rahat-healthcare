// data/healthConcerns.ts — Common health concerns for RAHAT
// 10 health concerns with translations in English, Hindi, and Bengali

import { HealthConcern } from '@/types/health';

export const healthConcerns: HealthConcern[] = [
  {
    id: 'cold',
    icon: '🤧',
    name: {
      en: 'Cold',
      hi: 'सर्दी-जुकाम',
      bn: 'সর্দি',
    },
    description: {
      en: 'Runny nose, sneezing, congestion',
      hi: 'नाक बहना, छींक आना, बंद नाक',
      bn: 'নাক দিয়ে পানি পড়া, হাঁচি, নাক বন্ধ',
    },
  },
  {
    id: 'fever',
    icon: '🤒',
    name: {
      en: 'Fever',
      hi: 'बुखार',
      bn: 'জ্বর',
    },
    description: {
      en: 'High temperature, chills, body heat',
      hi: 'तेज तापमान, ठंड लगना, शरीर गर्म',
      bn: 'উচ্চ তাপমাত্রা, শীত লাগা, শরীর গরম',
    },
  },
  {
    id: 'headache',
    icon: '🤕',
    name: {
      en: 'Headache',
      hi: 'सिरदर्द',
      bn: 'মাথাব্যথা',
    },
    description: {
      en: 'Head pain, pressure, tension',
      hi: 'सिर में दर्द, दबाव, तनाव',
      bn: 'মাথায় ব্যথা, চাপ, টেনশন',
    },
  },
  {
    id: 'cough',
    icon: '😷',
    name: {
      en: 'Cough',
      hi: 'खांसी',
      bn: 'কাশি',
    },
    description: {
      en: 'Dry or wet cough, throat irritation',
      hi: 'सूखी या गीली खांसी, गले में जलन',
      bn: 'শুকনো বা ভেজা কাশি, গলায় জ্বালা',
    },
  },
  {
    id: 'stomach-pain',
    icon: '🤢',
    name: {
      en: 'Stomach Pain',
      hi: 'पेट दर्द',
      bn: 'পেটে ব্যথা',
    },
    description: {
      en: 'Abdominal discomfort, cramping, bloating',
      hi: 'पेट में तकलीफ, ऐंठन, सूजन',
      bn: 'পেটে অস্বস্তি, খিঁচুনি, ফোলাভাব',
    },
  },
  {
    id: 'sore-throat',
    icon: '🗣️',
    name: {
      en: 'Sore Throat',
      hi: 'गले में खराश',
      bn: 'গলা ব্যথা',
    },
    description: {
      en: 'Throat pain, difficulty swallowing',
      hi: 'गले में दर्द, निगलने में कठिनाई',
      bn: 'গলায় ব্যথা, গিলতে কষ্ট',
    },
  },
  {
    id: 'body-pain',
    icon: '💪',
    name: {
      en: 'Body Pain',
      hi: 'बदन दर्द',
      bn: 'শরীর ব্যথা',
    },
    description: {
      en: 'Muscle aches, joint pain, body soreness',
      hi: 'मांसपेशियों में दर्द, जोड़ों में दर्द',
      bn: 'মাংসপেশীতে ব্যথা, জয়েন্টে ব্যথা',
    },
  },
  {
    id: 'vomiting',
    icon: '🤮',
    name: {
      en: 'Vomiting',
      hi: 'उल्टी',
      bn: 'বমি',
    },
    description: {
      en: 'Nausea, throwing up, stomach upset',
      hi: 'जी मिचलाना, उल्टी आना, पेट खराब',
      bn: 'বমি বমি ভাব, বমি হওয়া, পেট খারাপ',
    },
  },
  {
    id: 'diarrhea',
    icon: '🚽',
    name: {
      en: 'Diarrhea',
      hi: 'दस्त',
      bn: 'ডায়রিয়া',
    },
    description: {
      en: 'Loose stools, frequent bowel movements',
      hi: 'पतले दस्त, बार-बार मल त्याग',
      bn: 'পাতলা পায়খানা, ঘন ঘন মলত্যাগ',
    },
  },
  {
    id: 'skin-problem',
    icon: '🩹',
    name: {
      en: 'Skin Problem',
      hi: 'त्वचा की समस्या',
      bn: 'চর্মরোগ',
    },
    description: {
      en: 'Rash, itching, irritation, skin changes',
      hi: 'चकत्ते, खुजली, जलन, त्वचा में बदलाव',
      bn: 'ফুসকুড়ি, চুলকানি, জ্বালা, ত্বকে পরিবর্তন',
    },
  },
];
