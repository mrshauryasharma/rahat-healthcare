// data/clinicalRules.ts — Clinical AI Triage Rules & Knowledge Engine
// Supports deep multi-lingual symptom assessment, red flag warnings, and self-care recommendations

export interface ClinicalTriageResult {
  severity: 'emergency' | 'doctor_visit' | 'self_care';
  title: { en: string; hi: string; bn: string };
  advice: { en: string; hi: string; bn: string };
  redFlags: { en: string[]; hi: string[]; bn: string[] };
  homeRemedies: { en: string[]; hi: string[]; bn: string[] };
}

export const CLINICAL_RULES: Record<string, ClinicalTriageResult> = {
  fever: {
    severity: 'doctor_visit',
    title: {
      en: 'Fever Assessment & Care Guidance',
      hi: 'बुखार मूल्यांकन एवं प्राथमिक देखभाल',
      bn: 'জ্বর মূল্যায়ন ও প্রাথমিক যত্ন'
    },
    advice: {
      en: 'Fever is commonly the body’s natural response to infections. Maintain good hydration, monitor body temperature with a thermometer every 4 hours, and avoid heavy blankets.',
      hi: 'बुखार आमतौर पर संक्रमण के खिलाफ शरीर की प्राकृतिक प्रतिक्रिया है। भरपूर पानी पिएं, हर 4 घंटे में थर्मामीटर से तापमान मापें और अधिक गर्म कपड़े न पहनें।',
      bn: 'জ্বর সাধারণত সংক্রমণের বিরুদ্ধে শরীরের প্রাকৃতিক প্রতিক্রিয়া। প্রচুর জল পান করুন, প্রতি ৪ ঘণ্টা অন্তর থার্মোমিটার দিয়ে তাপমাত্রা পরিমাপ করুন।'
    },
    redFlags: {
      en: ['Temperature > 103°F', 'Persistent vomiting', 'Stiff neck or confusion', 'Difficulty breathing'],
      hi: ['103°F से अधिक तेज बुखार', 'लगातार उल्टियां होना', 'गर्दन में अकड़न या बेहोशी', 'सांस लेने में तकलीफ'],
      bn: ['১০৩°F এর বেশি তীব্র জ্বর', 'ক্রমাগত বমি', 'ঘাড় শক্ত হয়ে যাওয়া', 'শ্বাসকষ্ট']
    },
    homeRemedies: {
      en: ['Rest in a cool, well-ventilated room', 'Apply cool damp cloth on forehead', 'Drink electrolyte fluids or coconut water'],
      hi: ['हवादार कमरे में पर्याप्त आराम करें', 'माथे पर ठंडे पानी की पट्टी रखें', 'ओआरएस (ORS) या नारियल पानी पिएं'],
      bn: ['পর্যাপ্ত বিশ্রাম নিন', 'কপালে ভেজা কাপড়ের পট্টি দিন', 'ওআরএস বা ডাবের জল পান করুন']
    }
  },
  cough: {
    severity: 'self_care',
    title: {
      en: 'Cough & Respiratory Guidance',
      hi: 'खांसी एवं श्वसन परामर्श',
      bn: 'কাশি ও শ্বাসযন্ত্রের পরামর্শ'
    },
    advice: {
      en: 'Dry or productive cough can be caused by viral infections, allergies, or environmental irritants. Warm steam inhalation and throat soothers provide relief.',
      hi: 'खांसी वायरल संक्रमण या एलर्जी के कारण हो सकती है। गुनगुने पानी की भाप लें और गले को आराम दें।',
      bn: 'কাশি ভাইরাল ইনফেকশন বা অ্যালার্জির কারণে হতে পারে। গরম জলের ভাপ নিন এবং তরল খাবার খান।'
    },
    redFlags: {
      en: ['Coughing up blood', 'Shortness of breath or wheezing', 'Chest pain when coughing', 'Cough lasting > 2 weeks'],
      hi: ['खांसी में खून आना', 'सांस फूलना या सीटी की आवाज आना', 'खांसते समय सीने में दर्द', '2 सप्ताह से अधिक समय तक खांसी'],
      bn: ['কাশির সাথে রক্ত আসা', 'শ্বাসকষ্ট বা বুকে ঘড়ঘড় শব্দ', 'কাশির সময় বুকে ব্যথা', '২ সপ্তাহের বেশি কাশি']
    },
    homeRemedies: {
      en: ['Warm water with honey & ginger', 'Steam inhalation twice daily', 'Warm saline gargles for throat irritation'],
      hi: ['शहद और अदरक के साथ गुनगुना पानी', 'दिन में दो बार भाप (Steam) लें', 'गुनगुने नमक के पानी से गरारे करें'],
      bn: ['মধু ও আদা মেশানো হালকা গরম জল', 'দিনে দুবার গরম জলের ভাপ নিন', 'হালকা গরম নুন জল দিয়ে গার্গল করুন']
    }
  },
  chest_pain: {
    severity: 'emergency',
    title: {
      en: 'CRITICAL: Immediate Medical Evaluation Required',
      hi: 'अति महत्वपूर्ण: तुरंत आपातकालीन चिकित्सा सहायता लें',
      bn: 'জরুরী: অবিলম্বে ডাক্তারের পরামর্শ প্রয়োজন'
    },
    advice: {
      en: 'Chest pain, heaviness, or pain radiating to the left arm or jaw can be signs of a cardiovascular emergency. Call emergency medical services (108/112) immediately.',
      hi: 'सीने में भारीपन, दबाव या बाएं हाथ/जबड़े में दर्द हृदय संबंधी आपातकाल का संकेत हो सकता है। तुरंत नजदीकी अस्पताल या एम्बुलेंस (108/112) से संपर्क करें।',
      bn: 'বুকে চাপ, ভারী ভাব বা বাম বাহুতে ব্যথা হার্টের সমস্যার লক্ষণ হতে পারে। অবিলম্বে নিকটস্থ হাসপাতালে যান বা অ্যাম্বুলেন্স (108/112) ডাকুন।'
    },
    redFlags: {
      en: ['Crushing chest pressure', 'Pain spreading to shoulder, arm, or jaw', 'Excessive sweating and dizziness', 'Severe breathlessness'],
      hi: ['सीने में अत्यधिक दबाव या जकड़न', 'दर्द का कंधे, हाथ या जबड़े तक फैलना', 'अचानक ठंडा पसीना और चक्कर आना', 'सांस लेने में अत्यधिक कठिनाई'],
      bn: ['বুকে তীব্র চাপ', 'ব্যথা কাঁধ বা চোয়ালে ছড়িয়ে পড়া', 'প্রচুর ঘাম ও মাথা ঘোরা', 'তীব্র শ্বাসকষ্ট']
    },
    homeRemedies: {
      en: ['Sit down calmly in a comfortable position', 'Do NOT drive yourself to the hospital', 'Call emergency services (108 / 112)'],
      hi: ['शांति से आराम की स्थिति में बैठें', 'स्वयं गाड़ी चलाकर अस्पताल न जाएं', 'तुरंत 108/112 पर कॉल करें'],
      bn: ['শান্ত হয়ে বসুন', 'নিজে গাড়ি চালাবেন না', 'অবিলম্বে ১০৮/১১২ এ যোগাযোগ করুন']
    }
  },
  headache: {
    severity: 'self_care',
    title: {
      en: 'Headache Evaluation & Relief',
      hi: 'सिरदर्द मूल्यांकन एवं प्राथमिक उपचार',
      bn: 'মাথাব্যথা মূল্যায়ন ও উপশম'
    },
    advice: {
      en: 'Tension headaches and migraines often occur due to stress, dehydration, lack of sleep, or prolonged screen time. Rest in a dark, quiet room.',
      hi: 'तनाव, पानी की कमी, नींद पूरी न होना या ज्यादा स्क्रीन देखने से सिरदर्द हो सकता है। शांत और अंधेरे कमरे में आराम करें।',
      bn: 'মানসিক চাপ, জল কম খাওয়া, কম ঘুম বা বেশি স্ক্রিন ব্যবহারের কারণে মাথাব্যথা হতে পারে। শান্ত ও অন্ধকার ঘরে বিশ্রাম নিন।'
    },
    redFlags: {
      en: ['Sudden, explosive "thunderclap" headache', 'Headache with vision changes or slurred speech', 'Headache following head injury', 'Accompanied by stiff neck and fever'],
      hi: ['अचानक अत्यधिक तेज सिरदर्द', 'धुंधला दिखाई देना या बोलने में लड़खड़ाहट', 'सिर पर चोट लगने के बाद दर्द', 'गर्दन में अकड़न और बुखार के साथ सिरदर्द'],
      bn: ['হঠাৎ তীব্র বজ্রপাতের মতো মাথাব্যথা', 'দৃষ্টিশক্তি পরিবর্তন বা কথা বলতে অসুবিধা', 'মাথায় আঘাতের পর ব্যথা', 'ঘাড় শক্ত হওয়া ও জ্বর']
    },
    homeRemedies: {
      en: ['Drink 2-3 glasses of water', 'Apply cold or warm compress to forehead', 'Gentle temple massage and 30 mins quiet rest'],
      hi: ['2-3 गिलास पानी पिएं', 'माथे पर ठंडी या गुनगुनी सिकाई करें', '30 मिनट शांत वातावरण में आराम करें'],
      bn: ['২-৩ গ্লাস জল পান করুন', 'কপালে হালকা সেঁক দিন', '৩০ মিনিট শান্ত পরিবেশে বিশ্রাম নিন']
    }
  }
};
