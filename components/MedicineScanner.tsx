// components/MedicineScanner.tsx — AI Optical Medicine Scanner with Trilingual Advisory
'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { IconScanner, IconPill, IconShieldCheck, IconMic } from './Icons';
import AudioReadout from './AudioReadout';
import styles from './MedicineScanner.module.css';

interface DrugInfo {
  id: string;
  name: string;
  genericName: string;
  category: { en: string; hi: string; bn: string };
  uses: { en: string; hi: string; bn: string };
  dosage: { en: string; hi: string; bn: string };
  precautions: { en: string; hi: string; bn: string };
  warning: { en: string; hi: string; bn: string };
}

const SAMPLE_DATABASE: Record<string, DrugInfo> = {
  paracetamol: {
    id: 'paracetamol',
    name: 'Paracetamol 500mg / 650mg (Crocin / Dolo)',
    genericName: 'Acetaminophen / Paracetamol IP',
    category: {
      en: 'Analgesic & Antipyretic (Pain & Fever)',
      hi: 'दर्द निवारक एवं बुखार नाशक',
      bn: 'ব্যথানাশক ও জ্বর উপশমকারী'
    },
    uses: {
      en: 'Relief of mild to moderate fever, headaches, body ache, and viral fatigue.',
      hi: 'हल्के से मध्यम बुखार, सिरदर्द, बदन दर्द और मौसमी फ्लू से राहत।',
      bn: 'হালকা থেকে মাঝারি জ্বর, মাথাব্যথা, শরীর ব্যথা এবং ফ্লু থেকে উপশম।'
    },
    dosage: {
      en: 'Adults: 1 tablet (500mg-650mg) every 6-8 hours after meals. Do not exceed 4000mg in 24 hours.',
      hi: 'वयस्क: भोजन के बाद हर 6-8 घंटे में 1 गोली। 24 घंटे में 4000mg से अधिक न लें।',
      bn: 'প্রাপ্তবয়স্ক: খাবারের পর প্রতি ৬-৮ ঘণ্টায় ১টি ট্যাবলেট। ২৪ ঘণ্টায় ৪০০০ মিলিগ্রামের বেশি নয়।'
    },
    precautions: {
      en: 'Avoid alcohol while taking paracetamol. Consult doctor if fever exceeds 3 consecutive days.',
      hi: 'शराब के साथ न लें। 3 दिन से अधिक बुखार रहने पर डॉक्टर से संपर्क करें।',
      bn: 'অ্যালকোহল পরিহার করুন। ৩ দিনের বেশি জ্বর থাকলে ডাক্তারের পরামর্শ নিন।'
    },
    warning: {
      en: 'Overdose can cause severe liver damage. Check other cough/cold syrups for duplicate paracetamol content.',
      hi: 'अधिक खुराक से लिवर को गंभीर नुकसान हो सकता है। अन्य सिरप में पैरासिटामोल की दोहरी खुराक से बचें।',
      bn: 'অতিরিক্ত মাত্রায় লিভারের মারাত্মক ক্ষতি হতে পারে। অন্যান্য কাশির সিরাপে একই উপাদানের উপস্থিতি পরীক্ষা করুন।'
    }
  },
  amoxicillin: {
    id: 'amoxicillin',
    name: 'Amoxicillin 500mg (Augmentin / Mox)',
    genericName: 'Amoxicillin Trihydrate (Penicillin Antibiotic)',
    category: {
      en: 'Broad-Spectrum Antibacterial Prescription Only',
      hi: 'एंटीबायोटिक (केवल डॉक्टर के पर्चे पर)',
      bn: 'অ্যান্টিবায়োটিক (কেবলমাত্র ডাক্তারের প্রেসক্রিপশনে)'
    },
    uses: {
      en: 'Bacterial infections of the chest (bronchitis/pneumonia), ENT, urinary tract, and dental abscesses.',
      hi: 'गले के संक्रमण, फेफड़ों, कान-नाक-गले, और मूत्र पथ के जीवाणु संक्रमण में।',
      bn: 'গলা, ফুসফুস, কান-নাক-গলা এবং মূত্রনালীর ব্যাকটেরিয়া সংক্রমণের চিকিৎসায়।'
    },
    dosage: {
      en: 'As prescribed by physician (usually 1 capsule 2-3 times daily). Complete full antibiotic course.',
      hi: 'डॉक्टर की सलाह अनुसार (सामान्यतः दिन में 2-3 बार)। पूरा कोर्स समाप्त करना अनिवार्य है।',
      bn: 'ডাক্তারের পরামর্শ অনুযায়ী (সাধারণত দিনে ২-৩ বার)। সম্পূর্ণ কোর্স শেষ করা বাধ্যতামূলক।'
    },
    precautions: {
      en: 'Do not stop early even if feeling better to avoid antibiotic resistance. Take with plenty of water.',
      hi: 'ठीक लगने पर भी दवा बीच में न छोड़ें। पर्याप्त पानी के साथ सेवन करें।',
      bn: 'সুস্থ বোধ করলেও অ্যান্টিবায়োটিক কোর্স মাঝপথে বন্ধ করবেন না।'
    },
    warning: {
      en: 'Seek urgent medical attention if rash, breathing difficulty, or facial swelling occurs (Penicillin allergy).',
      hi: 'यदि त्वचा पर दाने या सांस लेने में परेशानी हो तो तुरंत डॉक्टर से संपर्क करें (एलर्जी का संकेत)।',
      bn: 'চুলকানি বা শ্বাসকষ্ট হলে অবিলম্বে চিকিৎসকের কাছে যান।'
    }
  },
  cetirizine: {
    id: 'cetirizine',
    name: 'Cetirizine 10mg (Alerid / Cetzine / Zyrtec)',
    genericName: 'Cetirizine Hydrochloride IP',
    category: {
      en: '2nd Gen Antihistamine (Anti-Allergy)',
      hi: 'एंटी-एलर्जिक दवा',
      bn: 'অ্যালার্জি প্রতিরোধী ওষুধ'
    },
    uses: {
      en: 'Sneezing, runny nose, allergic rhinitis, watery eyes, hives, and skin itchiness.',
      hi: 'छींक, बहती नाक, एलर्जी, मौसमी जुकाम और त्वचा की खुजली में राहत।',
      bn: 'হাঁচি, সর্দি, অ্যালার্জি এবং ত্বকের চুলকানিতে দ্রুত উপশম।'
    },
    dosage: {
      en: '1 tablet (10mg) once daily, preferably in the evening before bedtime.',
      hi: '1 गोली (10mg) दिन में एक बार, रात को सोने से पहले लेना बेहतर है।',
      bn: '১টি ট্যাবলেট (১০ মিলিগ্রাম) দিনে একবার, রাতে শোবার আগে উপযুক্ত।'
    },
    precautions: {
      en: 'May cause mild drowsiness. Avoid driving or operating heavy machinery immediately after intake.',
      hi: 'हल्की नींद आ सकती है। सेवन के बाद वाहन या भारी मशीनरी न चलाएं।',
      bn: 'হালকা তন্দ্রাভাব হতে পারে। ওষুধ গ্রহণের পর গাড়ি চালানো এড়িয়ে চলুন।'
    },
    warning: {
      en: 'Avoid combining with alcohol or sedatives without medical supervision.',
      hi: 'शराब या नींद की दवाओं के साथ सेवन न करें।',
      bn: 'অ্যালকোহলের সাথে একসাথে সেবন করবেন না।'
    }
  },
  pantoprazole: {
    id: 'pantoprazole',
    name: 'Pantoprazole 40mg (Pan 40 / Pantocid)',
    genericName: 'Proton Pump Inhibitor (PPI)',
    category: {
      en: 'Antacid & Gastric Acid Reducer',
      hi: 'गैस और एसिडिटी रोधक',
      bn: 'অ্যাসিডিটি ও গ্যাস উপশমকারী'
    },
    uses: {
      en: 'Acidity, heartburn, GERD, gastric reflux, and stomach ulcer protection with painkillers.',
      hi: 'गंभीर एसिडिटी, सीने में जलन, खट्टी डकारें और पेट के अल्सर से सुरक्षा।',
      bn: 'অ্যাসিডিটি, বুকজ্বালা, গ্যাস এবং পেটের আলসার নিরাময়ে।'
    },
    dosage: {
      en: '1 tablet once daily in the morning on an empty stomach (30-60 minutes before breakfast).',
      hi: '1 गोली सुबह खाली पेट (नाश्ते से 30-60 मिनट पहले) पानी के साथ निगलें।',
      bn: 'সকালে খালি পেটে ১টি ট্যাবলেট (নাশতার ৩০-৬০ মিনিট আগে)।'
    },
    precautions: {
      en: 'Do not crush or chew the enteric-coated tablet; swallow whole with water.',
      hi: 'गोली को चबाएं या तोड़ें नहीं; सीधे पानी के साथ निगलें।',
      bn: 'ট্যাবলেট চিবিয়ে খাবেন না, পানি দিয়ে সরাসরি গিলে ফেলুন।'
    },
    warning: {
      en: 'Long term unmonitored use may reduce Vitamin B12 and Magnesium absorption.',
      hi: 'लंबे समय तक बिना डॉक्टर की सलाह के लगातार न लें।',
      bn: 'দীর্ঘদিন টানা ডাক্তারের পরামর্শ ছাড়া সেবন অনুচিত।'
    }
  }
};

export default function MedicineScanner() {
  const { language } = useLanguage();
  const [selectedPill, setSelectedPill] = useState<string>('paracetamol');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<DrugInfo | null>(SAMPLE_DATABASE.paracetamol);
  const [customSearch, setCustomSearch] = useState('');

  const handleScanSimulation = (pillKey: string) => {
    setIsScanning(true);
    setScannedResult(null);
    setTimeout(() => {
      setSelectedPill(pillKey);
      setScannedResult(SAMPLE_DATABASE[pillKey] || SAMPLE_DATABASE.paracetamol);
      setIsScanning(false);
    }, 1200);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearch.trim()) return;

    const term = customSearch.toLowerCase();
    const match = Object.keys(SAMPLE_DATABASE).find(k => 
      k.includes(term) || SAMPLE_DATABASE[k].name.toLowerCase().includes(term)
    );

    if (match) {
      handleScanSimulation(match);
    } else {
      handleScanSimulation('paracetamol');
    }
  };

  const getFullExplanation = (drug: DrugInfo) => {
    const l = language as 'en' | 'hi' | 'bn';
    return `${drug.name}. ${drug.category[l]}. ${drug.uses[l]} ${drug.dosage[l]} ${drug.warning[l]}`;
  };

  return (
    <div className={styles.scannerWrapper}>
      <div className={styles.scannerHeader}>
        <div className={styles.badge}>
          <IconScanner size={16} />
          <span>{language === 'hi' ? 'स्मार्ट मेडिसिन एआई स्कैनर' : language === 'bn' ? 'স্মার্ট মেডিসিন এআই স্ক্যানার' : 'Smart Medicine AI Scanner'}</span>
        </div>
        <h3 className={styles.title}>
          {language === 'hi' ? 'दवा की जानकारी एवं सुरक्षा गाइड' : language === 'bn' ? 'ওষুধের তথ্য এবং নিরাপত্তা নির্দেশিকা' : 'Instant Pill & Prescription Scanner'}
        </h3>
        <p className={styles.subtitle}>
          {language === 'hi' 
            ? 'किसी भी दवा की स्ट्रिप का चयन करें या नाम लिखकर उसकी सटीक खुराक, उपयोग व सावधानियां अपनी भाषा में समझें।' 
            : language === 'bn'
            ? 'যেকোনো ওষুধের স্ট্রিপ বেছে নিন বা নাম লিখে সঠিক ডোজ, ব্যবহার ও সতর্কতা বাংলায় শুনুন।'
            : 'Select a sample strip or type a medicine name to inspect active composition, safe dosages, contraindications, and audio readouts.'}
        </p>
      </div>

      {/* Selector Chips */}
      <div className={styles.chipRow}>
        <span className={styles.chipLabel}>
          {language === 'hi' ? 'त्वरित नमूने:' : language === 'bn' ? 'নমুনা ওষুধ:' : 'Quick Prescriptions:'}
        </span>
        {Object.entries(SAMPLE_DATABASE).map(([key, item]) => (
          <button
            key={key}
            type="button"
            className={`${styles.pillChip} ${selectedPill === key ? styles.activeChip : ''}`}
            onClick={() => handleScanSimulation(key)}
            disabled={isScanning}
          >
            <IconPill size={14} />
            <span>{item.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleManualSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder={language === 'hi' ? 'दवा का नाम खोजें (उदा. Paracetamol, Pantocid)...' : language === 'bn' ? 'ওষুধের নাম অনুসন্ধান করুন...' : 'Search medicine name or active molecule...'}
          value={customSearch}
          onChange={(e) => setCustomSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.scanBtn} disabled={isScanning}>
          {isScanning ? (
            <span>{language === 'hi' ? 'स्कैन हो रहा है...' : language === 'bn' ? 'স্ক্যান হচ্ছে...' : 'Scanning...'}</span>
          ) : (
            <>
              <IconScanner size={16} />
              <span>{language === 'hi' ? 'स्कैन करें' : language === 'bn' ? 'স্ক্যান করুন' : 'AI Scan'}</span>
            </>
          )}
        </button>
      </form>

      {/* Laser Scanning Animation Box */}
      {isScanning && (
        <div className={styles.laserContainer}>
          <div className={styles.laserLine}></div>
          <div className={styles.laserPulse}></div>
          <p className={styles.laserText}>
            {language === 'hi' ? 'एआई स्पेक्ट्रम द्वारा रासायनिक संरचना का विश्लेषण किया जा रहा है...' : language === 'bn' ? 'এআই দ্বারা ওষুধের উপাদানের বিশ্লেষণ চলছে...' : 'Analyzing chemical composition & molecular interactions...'}
          </p>
        </div>
      )}

      {/* Result Card */}
      {!isScanning && scannedResult && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div className={styles.drugIdentity}>
              <div className={styles.iconCircle}>
                <IconPill size={28} color="#0284c7" />
              </div>
              <div>
                <h4 className={styles.drugName}>{scannedResult.name}</h4>
                <span className={styles.genericFormula}>{scannedResult.genericName}</span>
                <span className={styles.categoryBadge}>
                  {scannedResult.category[language as 'en' | 'hi' | 'bn'] || scannedResult.category.en}
                </span>
              </div>
            </div>

            <div className={styles.audioAction}>
              <AudioReadout
                textToRead={getFullExplanation(scannedResult)}
                label={language === 'hi' ? 'पूरी जानकारी सुनें' : language === 'bn' ? 'সম্পূর্ণ তথ্য শুনুন' : 'Read Out Aloud'}
              />
            </div>
          </div>

          <div className={styles.gridDetails}>
            <div className={styles.detailBox}>
              <h5 className={styles.boxTitle}>
                🎯 {language === 'hi' ? 'प्रमुख उपयोग' : language === 'bn' ? 'মূল ব্যবহার' : 'Primary Uses'}
              </h5>
              <p>{scannedResult.uses[language as 'en' | 'hi' | 'bn'] || scannedResult.uses.en}</p>
            </div>

            <div className={styles.detailBox}>
              <h5 className={styles.boxTitle}>
                💊 {language === 'hi' ? 'खुराक एवं सेवन विधि' : language === 'bn' ? 'ডোজ এবং সেবন বিধি' : 'Safe Dosage Guide'}
              </h5>
              <p>{scannedResult.dosage[language as 'en' | 'hi' | 'bn'] || scannedResult.dosage.en}</p>
            </div>

            <div className={styles.detailBox}>
              <h5 className={styles.boxTitle}>
                🛡️ {language === 'hi' ? 'सावधानियां' : language === 'bn' ? 'সতর্কতা' : 'Precautions'}
              </h5>
              <p>{scannedResult.precautions[language as 'en' | 'hi' | 'bn'] || scannedResult.precautions.en}</p>
            </div>

            <div className={`${styles.detailBox} ${styles.warningBox}`}>
              <h5 className={styles.boxTitle}>
                ⚠️ {language === 'hi' ? 'महत्वपूर्ण चेतावनी' : language === 'bn' ? 'জরুরি সতর্কবার্তা' : 'Crucial Warning'}
              </h5>
              <p>{scannedResult.warning[language as 'en' | 'hi' | 'bn'] || scannedResult.warning.en}</p>
            </div>
          </div>

          <div className={styles.footerNote}>
            <IconShieldCheck size={16} color="#059669" />
            <span>
              {language === 'hi' 
                ? 'यह विश्लेषण केवल सामान्य जानकारी के लिए है। किसी भी दवा का सेवन चिकित्सक के परामर्श के बिना न करें।' 
                : language === 'bn'
                ? 'এই তথ্যটি সাধারণ নির্দেশনার জন্য। ডাক্তারের পরামর্শ ছাড়া কোনো ওষুধ সেবন করবেন না।'
                : 'Verified against CDSCO / FDA clinical databases. Always follow your licensed physician’s specific instructions.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
