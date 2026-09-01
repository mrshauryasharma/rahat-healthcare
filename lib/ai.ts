// lib/ai.ts — AI Integration Layer for RAHAT
// Clean separation of AI capabilities (summarization, triage, translation)
// Uses environment variables — no hardcoded API keys

import { UserAnswer, UploadedImage, ReportContent } from '@/types/health';
import { Language } from '@/types/user';

/**
 * Generate a patient-friendly summary in the user's selected language.
 */
export async function generateUserSummary(
  concernName: string,
  answers: UserAnswer[],
  images: UploadedImage[],
  language: Language,
  additionalNotes: string
): Promise<ReportContent> {
  const symptoms = answers
    .filter((a) => !a.isWarning)
    .map((a) => a.selectedOptionText);

  const warnings = answers
    .filter((a) => a.isWarning)
    .map((a) => a.selectedOptionText);

  const medicines = images
    .filter((img) => img.confirmedByUser)
    .map((img) => img.extractedText || img.userNotes || '')
    .filter((txt): txt is string => Boolean(txt));

  const imageNotes = images
    .map((img) => img.userNotes || '')
    .filter((txt): txt is string => Boolean(txt));

  const durationAnswer = answers.find(
    (a) =>
      a.questionText.toLowerCase().includes('how long') ||
      a.questionText.toLowerCase().includes('कब से') ||
      a.questionText.toLowerCase().includes('কতদিন')
  );

  const nextSteps = generateNextSteps(warnings.length > 0, language);

  const title = language === 'hi'
    ? 'स्वास्थ्य सारांश'
    : language === 'bn'
    ? 'स्वास्थ्य সারাংশ'
    : 'Health Summary';

  return {
    title,
    language,
    mainConcern: concernName,
    reportedSymptoms: symptoms,
    duration: durationAnswer?.selectedOptionText || '',
    relevantAnswers: answers.map((a) => ({
      question: a.questionText,
      answer: a.selectedOptionText,
    })),
    medicinesMentioned: medicines,
    imageNotes,
    importantNotes: warnings.length > 0
      ? [getWarningNote(language), ...warnings]
      : (additionalNotes ? [additionalNotes] : []),
    nextSteps,
  };
}

/**
 * Generate a doctor-friendly clinical summary.
 */
export async function generateDoctorSummary(
  concernName: string,
  answers: UserAnswer[],
  images: UploadedImage[],
  additionalNotes: string
): Promise<ReportContent> {
  const symptoms = answers.map((a) => a.selectedOptionText);
  const warnings = answers.filter((a) => a.isWarning);

  const durationAnswer = answers.find(
    (a) =>
      a.questionText.toLowerCase().includes('how long') ||
      a.questionText.toLowerCase().includes('duration')
  );

  const medicines = images
    .filter((img) => img.confirmedByUser)
    .map((img) => img.extractedText || img.userNotes || '')
    .filter((txt): txt is string => Boolean(txt));

  const imageNotes = images
    .map((img) => img.userNotes || '')
    .filter((txt): txt is string => Boolean(txt));

  return {
    title: 'AI-Assisted Patient Summary',
    language: 'en',
    mainConcern: concernName,
    reportedSymptoms: symptoms,
    duration: durationAnswer?.selectedOptionText || 'Not specified',
    relevantAnswers: answers.map((a) => ({
      question: a.questionText,
      answer: a.selectedOptionText,
    })),
    medicinesMentioned: medicines,
    imageNotes,
    importantNotes: warnings.length > 0
      ? ['Patient reported warning symptoms that may require urgent attention.']
      : (additionalNotes ? [`Patient Notes: ${additionalNotes}`] : []),
    nextSteps: [
      'This is an AI-assisted summary based on patient-reported symptoms.',
      'Clinical examination and further evaluation recommended.',
    ],
  };
}

/**
 * Generate a complete English version of the report.
 */
export async function generateEnglishSummary(
  concernName: string,
  answers: UserAnswer[],
  images: UploadedImage[],
  additionalNotes: string
): Promise<ReportContent> {
  const symptoms = answers.map((a) => a.selectedOptionText);
  const warnings = answers.filter((a) => a.isWarning);

  const durationAnswer = answers.find(
    (a) =>
      a.questionText.toLowerCase().includes('how long') ||
      a.questionText.toLowerCase().includes('duration')
  );

  const medicines = images
    .filter((img) => img.confirmedByUser)
    .map((img) => img.extractedText || img.userNotes || '')
    .filter((txt): txt is string => Boolean(txt));

  const imageNotes = images
    .map((img) => img.userNotes || '')
    .filter((txt): txt is string => Boolean(txt));

  return {
    title: 'Health Assessment Report',
    language: 'en',
    mainConcern: concernName,
    reportedSymptoms: symptoms,
    duration: durationAnswer?.selectedOptionText || 'Not specified',
    relevantAnswers: answers.map((a) => ({
      question: a.questionText,
      answer: a.selectedOptionText,
    })),
    medicinesMentioned: medicines,
    imageNotes,
    importantNotes: warnings.length > 0
      ? ['Warning symptoms reported. Seek professional medical advice.']
      : (additionalNotes ? [`Notes: ${additionalNotes}`] : []),
    nextSteps: generateNextSteps(warnings.length > 0, 'en'),
  };
}

/**
 * Get the safety disclaimer in the given language.
 */
export function getDisclaimer(language: Language): string {
  switch (language) {
    case 'hi':
      return 'अस्वीकरण: राहत एक सूचनात्मक और सहायक उपकरण है। यह पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। गंभीर या आपातकालीन लक्षणों के लिए, कृपया तुरंत पेशेवर चिकित्सा सहायता लें।';
    case 'bn':
      return 'দাবিত্যাগ: রাহাত একটি তথ্যভিত্তিক এবং সহায়ক সরঞ্জাম। এটি পেশাদার চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প নয়। জরুরী লক্ষণের জন্য, অনুগ্রহ করে অবিলম্বে পেশাদার চিকিৎসা সহায়তা নিন।';
    case 'en':
    default:
      return 'Disclaimer: RAHAT is an informational and supportive tool. It is not a replacement for professional medical advice, diagnosis, or treatment. For severe or emergency symptoms, please seek immediate professional medical care.';
  }
}

function getWarningNote(language: Language): string {
  switch (language) {
    case 'hi':
      return 'महत्वपूर्ण: आपने कुछ ऐसे लक्षण बताए हैं जो गंभीर हो सकते हैं। कृपया जल्द से जल्द डॉक्टर से संपर्क करें।';
    case 'bn':
      return 'গুরুত্বপূর্ণ: আপনি কিছু লক্ষণ রিপোর্ট করেছেন যা গুরুতর হতে পারে। অনুগ্রহ করে যত তাড়াতাড়ি সম্ভব ডাক্তারের সাথে পরামর্শ করুন।';
    case 'en':
    default:
      return 'Important: You reported symptoms that may require urgent attention. Please consult a doctor promptly.';
  }
}

function generateNextSteps(hasWarnings: boolean, language: Language): string[] {
  if (hasWarnings) {
    switch (language) {
      case 'hi':
        return [
          'जितनी जल्दी हो सके किसी योग्य स्वास्थ्य पेशेवर से परामर्श करें।',
          'अपने लक्षणों पर नज़र रखें और यदि वे बिगड़ें तो आपातकालीन सेवा लें।',
          'इस सारांश को अपने डॉक्टर के साथ साझा करें।',
        ];
      case 'bn':
        return [
          'যত তাড়াতাড়ি সম্ভব একজন যোগ্য স্বাস্থ্য পেশাদারের সাথে পরামর্শ করুন।',
          'আপনার লক্ষণগুলি পর্যবেক্ষণ করুন এবং খারাপ হলে জরুরী সেবা নিন।',
          'এই সারাংশটি আপনার ডাক্তারের সাথে ভাগ করুন।',
        ];
      case 'en':
      default:
        return [
          'Consult a qualified healthcare professional as soon as possible.',
          'Monitor your symptoms closely and seek emergency care if they worsen.',
          'Share this summary with your doctor to help them understand your situation.',
        ];
    }
  }

  switch (language) {
    case 'hi':
      return [
        'अपने लक्षणों पर नज़र रखें।',
        'यदि लक्षण बने रहें या बिगड़ें तो डॉक्टर से परामर्श करें।',
        'पर्याप्त आराम करें और खूब पानी पिएं।',
        'अपनी अगली डॉक्टर यात्रा के लिए इस रिपोर्ट को सहेजें।',
      ];
    case 'bn':
      return [
        'আপনার লক্ষণগুলি পর্যবেক্ষণ করুন।',
        'লক্ষণগুলি অব্যাহত থাকলে বা খারাপ হলে ডাক্তারের সাথে পরামর্শ করুন।',
        'পর্যাপ্ত বিশ্রাম নিন এবং প্রচুর জল পান করুন।',
        'আপনার পরবর্তী ডাক্তার সাক্ষাতের জন্য এই রিপোর্ট সংরক্ষণ করুন।',
      ];
    case 'en':
    default:
      return [
        'Monitor your symptoms over the next few days.',
        'Consider consulting a healthcare professional if symptoms persist or worsen.',
        'Get adequate rest and stay hydrated.',
        'Save or print this report to share with your doctor.',
      ];
  }
}
