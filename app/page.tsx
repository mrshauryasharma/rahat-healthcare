// app/page.tsx — RAHAT Healthcare Public Home
'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { healthConcerns } from '@/data/healthConcerns';
import styles from './page.module.css';

export default function HomePage() {
  const { t, language } = useLanguage();

  const features = [
    { icon: '🤖', titleKey: 'features.symptomCheck', descKey: 'features.symptomCheckDesc', fallbackTitle: 'AI Symptom Check', fallbackDesc: 'Interactive symptom guided triage in your preferred language.' },
    { icon: '🌐', titleKey: 'features.multilingual', descKey: 'features.multilingualDesc', fallbackTitle: '3 Native Languages', fallbackDesc: 'Available in English, हिन्दी, and বাংলা seamlessly.' },
    { icon: '🔒', titleKey: 'features.privacy', descKey: 'features.privacyDesc', fallbackTitle: 'Client Privacy First', fallbackDesc: 'Encrypted on your device with no pre-filled fake data.' },
    { icon: '📸', titleKey: 'features.imageUpload', descKey: 'features.imageUploadDesc', fallbackTitle: 'Medicine Strip Upload', fallbackDesc: 'Upload prescription photos with confirmation verification.' },
    { icon: '📋', titleKey: 'features.threeVersion', descKey: 'features.threeVersionDesc', fallbackTitle: '3-Version Summaries', fallbackDesc: 'Generates Patient Version, Doctor Clinical Summary, and English report.' },
    { icon: '🖨️', titleKey: 'features.download', descKey: 'features.downloadDesc', fallbackTitle: 'Printable HTML Reports', fallbackDesc: 'Download or print official reports for physical doctor visits.' },
    { icon: '🏥', titleKey: 'features.abdm', descKey: 'features.abdmDesc', fallbackTitle: 'Digital Health ID', fallbackDesc: 'Personal RAHAT-2026-XXXXXX health identifier for lifelong care.' },
    { icon: '👨‍⚕️', titleKey: 'features.doctorPortal', descKey: 'features.doctorPortalDesc', fallbackTitle: 'Clinical Doctor Suite', fallbackDesc: 'Verified medical practitioners review logs & issue digital Rx.' },
    { icon: '⚡', titleKey: 'features.offline', descKey: 'features.offlineDesc', fallbackTitle: 'Fast & Lightweight', fallbackDesc: 'Optimized Next.js architecture with instant response.' },
  ];

  const steps = [
    { titleKey: 'howItWorks.step1', descKey: 'howItWorks.step1Desc', fallbackTitle: 'Select Your Concern', fallbackDesc: 'Choose from 10 common health conditions or describe custom symptoms.' },
    { titleKey: 'howItWorks.step2', descKey: 'howItWorks.step2Desc', fallbackTitle: 'Answer Guided Questions', fallbackDesc: 'Complete simple adaptive multiple-choice questions about duration & severity.' },
    { titleKey: 'howItWorks.step3', descKey: 'howItWorks.step3Desc', fallbackTitle: 'Upload Prescriptions (Optional)', fallbackDesc: 'Add photos of current medicine packages for clinical notes.' },
    { titleKey: 'howItWorks.step4', descKey: 'howItWorks.step4Desc', fallbackTitle: 'Review 3-Version Report', fallbackDesc: 'Inspect patient-friendly summary, clinical triage report, and English report.' },
    { titleKey: 'howItWorks.step5', descKey: 'howItWorks.step5Desc', fallbackTitle: 'Consult Doctor or Save', fallbackDesc: 'Share your Health ID with your physician or book a consultation.' },
  ];

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBackground}></div>
          <div className={styles.heroContent}>
            <div className={styles.logoBadge}>
              <img src="/logo.png" alt="RAHAT Logo" className={styles.heroLogo} />
            </div>

            <h1 className={styles.title}>{t('hero.title') || 'Understand Your Symptoms. Take the Next Step.'}</h1>
            <p className={styles.subtitle}>{t('hero.subtitle') || 'RAHAT helps you describe health concerns, answer guided questions, and prepare reports you can share with your doctor.'}</p>
            
            <div className={styles.ctaGroup}>
              <Link href="/health-check" className={styles.primaryBtn}>
                🩺 {t('hero.startCheck') || 'Start Health Check'}
              </Link>
              <Link href="/chat" className={styles.aiBtn}>
                🤖 {t('nav.aiChat') || 'AI Assistant'}
              </Link>
              <Link href="/login" className={styles.secondaryBtn}>
                👤 {t('hero.login') || 'Patient Login'}
              </Link>
            </div>

            {/* Doctor Portal Banner */}
            <div className={styles.portalRow}>
              <Link href="/doctor/login" className={styles.portalCardDoc}>
                <span className={styles.portalIcon}>👨‍⚕️</span>
                <div>
                  <strong>{language === 'hi' ? 'क्या आप डॉक्टर हैं? क्लिनिकल पोर्टल में प्रवेश करें' : language === 'bn' ? 'আপনি কি ডাক্তার? ক্লিনিক্যাল পোর্টালে প্রবেশ করুন' : 'Are you a Doctor? Enter Clinical Portal'}</strong>
                  <span>{language === 'hi' ? 'रोगी सारांश देखें, लक्षण रिकॉर्ड जांचें और डिजिटल पर्चे जारी करें' : language === 'bn' ? 'রোগীর সারাংশ দেখুন এবং ডিজিটাল প্রেসক্রিপশন প্রদান করুন' : 'Verify patient summaries, review symptom logs & issue digital prescriptions'}</span>
                </div>
                <span className={styles.portalArrow}>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 10 Health Concerns Quick Grid */}
        <section className={styles.concernsSection}>
          <div className={styles.sectionHeaderWrap}>
            <span className={styles.sectionTag}>
              {language === 'hi' ? 'त्वरित जांच' : language === 'bn' ? 'দ্রুত পরীক্ষা' : 'Quick Assessment'}
            </span>
            <h2 className={styles.sectionTitle}>
              {language === 'hi' ? 'सामान्य स्वास्थ्य समस्याएं' : language === 'bn' ? 'সাধারণ স্বাস্থ্য সমস্যা' : 'Common Health Concerns'}
            </h2>
            <p className={styles.sectionSubtitle}>
              {language === 'hi' ? 'तुरंत AI सहायता और संरचित स्वास्थ्य रिपोर्ट पाने के लिए अपनी समस्या चुनें:' : language === 'bn' ? 'তাৎক্ষণিক AI সহায়তা ও রিপোর্টের জন্য আপনার সমস্যা নির্বাচন করুন:' : 'Select your concern to launch an interactive trilingual symptom assessment:'}
            </p>
          </div>

          <div className={styles.concernsGrid}>
            {healthConcerns.map((concern) => (
              <Link 
                key={concern.id} 
                href={`/health-check?concern=${concern.id}`}
                className={styles.concernCard}
              >
                <span className={styles.concernIcon}>{concern.icon}</span>
                <strong className={styles.concernName}>{concern.name[language] || concern.name.en}</strong>
                <span className={styles.concernDesc}>{concern.description[language] || concern.description.en}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* AI Assistant Feature Highlight */}
        <section className={styles.aiHighlightSection}>
          <div className={styles.aiHighlightCard}>
            <div className={styles.aiHighlightText}>
              <span className={styles.aiBadge}>🤖 24/7 AI Health Companion</span>
              <h2>{language === 'hi' ? 'किसी भी भाषा में लक्षण पूछें' : language === 'bn' ? 'যেকোনো ভাষায় লক্ষণ জিজ্ঞাসা করুন' : 'Ask Symptoms in Any Language'}</h2>
              <p>
                {language === 'hi' 
                  ? 'हमारा AI सहायक आपके लक्षणों का विश्लेषण करता है, आपातकालीन संकेतों का पता लगाता है, और आपको सुरक्षित कदम उठाने में मदद करता है।'
                  : language === 'bn'
                  ? 'আমাদের AI সহকারী আপনার লক্ষণ বিশ্লেষণ করে, জরুরী লক্ষণ সনাক্ত করে এবং নিরাপদ পদক্ষেপ নিতে সাহায্য করে।'
                  : 'Our AI assistant performs real-time symptom triage, identifies critical emergency signs, and helps you formulate clear questions for your physician.'}
              </p>
              <Link href="/chat" className={styles.aiHighlightBtn}>
                💬 {language === 'hi' ? 'AI सहायक से अभी बात करें' : language === 'bn' ? 'AI সহকারীর সাথে কথা বলুন' : 'Chat with AI Assistant Now'} →
              </Link>
            </div>
            <div className={styles.aiHighlightGraphic}>
              <div className={styles.chatSnippet}>
                <div className={styles.chatBubbleAi}>
                  {language === 'hi' ? 'नमस्ते! आप कैसा महसूस कर रहे हैं? मुझे अपने लक्षण बताएं।' : language === 'bn' ? 'নমস্কার! আপনি কেমন অনুভব করছেন? আমাকে জানান।' : 'Hello! How are you feeling today? Tell me your symptoms.'}
                </div>
                <div className={styles.chatBubbleUser}>
                  {language === 'hi' ? 'मुझे 2 दिन से बुखार और गले में दर्द है।' : language === 'bn' ? 'আমার ২ দিন ধরে জ্বর ও গলায় ব্যথা।' : 'I have had mild fever and a sore throat for 2 days.'}
                </div>
                <div className={styles.chatBubbleAi}>
                  {language === 'hi' ? '✓ मैं समझ गया। चलिए एक त्वरित 3-मिनट स्वास्थ्य रिपोर्ट तैयार करते हैं।' : language === 'bn' ? '✓ বুঝতে পেরেছি। চলুন ৩ মিনিটের স্বাস্থ্য রিপোর্ট তৈরি করি।' : '✓ Understood. Let’s prepare your 3-version health report for the doctor.'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeaderWrap}>
            <h2 className={styles.sectionTitle}>{t('features.title') || 'How RAHAT Helps You'}</h2>
          </div>
          <div className={styles.grid}>
            {features.map((feature, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardIcon}>{feature.icon}</div>
                <h3 className={styles.cardTitle}>{t(feature.titleKey) || feature.fallbackTitle}</h3>
                <p className={styles.cardDesc}>{t(feature.descKey) || feature.fallbackDesc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.sectionAlt}>
          <div className={styles.sectionHeaderWrap}>
            <h2 className={styles.sectionTitle}>{t('howItWorks.title') || 'How It Works'}</h2>
          </div>
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNumber}>{i + 1}</div>
                <div className={styles.stepContent}>
                  <h3>{t(step.titleKey) || step.fallbackTitle}</h3>
                  <p>{t(step.descKey) || step.fallbackDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Disclaimer */}
        <section className={styles.disclaimerSection}>
          <div className={styles.disclaimerCard}>
            <span className={styles.disclaimerIcon}>🛡️</span>
            <div>
              <h3>{t('common.disclaimer') || 'Medical Safety Disclaimer'}</h3>
              <p>{t('disclaimer.text') || 'RAHAT is an informational, assistive tool and is not a substitute for professional medical advice, clinical diagnosis, or emergency treatment. For severe or life-threatening symptoms, immediately visit the nearest hospital or dial 108/112.'}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
