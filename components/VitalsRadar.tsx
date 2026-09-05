// components/VitalsRadar.tsx — Interactive Vitals Health Radar & BMI Calculator
'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { IconHeartPulse, IconActivity, IconShieldCheck } from './Icons';
import AudioReadout from './AudioReadout';
import styles from './VitalsRadar.module.css';

export default function VitalsRadar() {
  const { language } = useLanguage();

  // State for user health telemetry
  const [height, setHeight] = useState<number>(170); // cm
  const [weight, setWeight] = useState<number>(68); // kg
  const [systolic, setSystolic] = useState<number>(120); // mmHg
  const [heartRate, setHeartRate] = useState<number>(72); // bpm
  const [bloodSugar, setBloodSugar] = useState<number>(95); // mg/dL

  // Computations
  const heightM = height / 100;
  const bmi = heightM > 0 ? Number((weight / (heightM * heightM)).toFixed(1)) : 0;

  const getBmiCategory = () => {
    if (bmi < 18.5) {
      return {
        key: 'underweight',
        color: '#f59e0b',
        en: 'Underweight',
        hi: 'कम वजन (Underweight)',
        bn: 'স্বাভাবিকের চেয়ে কম ওজন'
      };
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return {
        key: 'healthy',
        color: '#10b981',
        en: 'Normal & Healthy',
        hi: 'सामान्य एवं स्वस्थ',
        bn: 'স্বাভাবিক ও সুস্থ'
      };
    } else if (bmi >= 25 && bmi < 29.9) {
      return {
        key: 'overweight',
        color: '#f97316',
        en: 'Overweight',
        hi: 'अधिक वजन (Overweight)',
        bn: 'অতিরিক্ত ওজন'
      };
    } else {
      return {
        key: 'obese',
        color: '#ef4444',
        en: 'High Risk (Obese)',
        hi: 'उच्च जोखिम (मोटापा)',
        bn: 'উচ্চ ঝুঁকি (স্থূলতা)'
      };
    }
  };

  // Calculate Health Index (0-100)
  const calculateWellnessScore = () => {
    let score = 98;
    if (bmi < 18.5 || bmi >= 25) score -= 8;
    if (bmi >= 30) score -= 14;
    if (systolic < 90 || systolic > 130) score -= 10;
    if (systolic > 140) score -= 15;
    if (heartRate < 60 || heartRate > 100) score -= 6;
    if (bloodSugar > 125) score -= 10;
    return Math.max(40, score);
  };

  const wellnessScore = calculateWellnessScore();
  const bmiCat = getBmiCategory();

  const getReadoutText = () => {
    const l = language as 'en' | 'hi' | 'bn';
    if (l === 'hi') {
      return `आपकी समग्र स्वास्थ्य रेटिंग ${wellnessScore} प्रतिशत है। आपका बॉडी मास इंडेक्स ${bmi} है, जो ${bmiCat.hi} श्रेणी में आता है। आपकी हृदय गति ${heartRate} प्रति मिनट और सिस्टोलिक रक्तचाप ${systolic} है।`;
    }
    if (l === 'bn') {
      return `আপনার সামগ্রিক স্বাস্থ্য স্কোর ১০০ এর মধ্যে ${wellnessScore}। আপনার বিএমআই হল ${bmi}, যা ${bmiCat.bn} পর্যায়ে রয়েছে। আপনার হৃদস্পন্দন মিনিটে ${heartRate} বার।`;
    }
    return `Your overall wellness health index is ${wellnessScore} out of 100. Your calculated BMI is ${bmi}, categorized as ${bmiCat.en}. Resting pulse is ${heartRate} beats per minute with blood pressure systolic at ${systolic} millimeters of mercury.`;
  };

  return (
    <div className={styles.radarCard}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.badge}>
            <IconActivity size={16} />
            <span>{language === 'hi' ? 'स्मार्ट वाइटल्स हेल्थ रडार' : language === 'bn' ? 'স্মার্ট ভাইটালস স্বাস্থ্য রাডার' : 'Smart Vitals Health Radar'}</span>
          </div>
          <h3 className={styles.title}>
            {language === 'hi' ? 'स्वास्थ्य मेट्रिक्स और बीएमआई मीटर' : language === 'bn' ? 'স্বাস্থ্য মেট্রিক্স ও বিএমআই মিটার' : 'Live Biomarkers & Wellness Index'}
          </h3>
        </div>

        <AudioReadout textToRead={getReadoutText()} label={language === 'hi' ? 'रिपोर्ट सुनें' : language === 'bn' ? 'রিপোর্ট শুনুন' : 'Voice Summary'} />
      </div>

      <div className={styles.grid}>
        {/* Controls Column */}
        <div className={styles.controlsCol}>
          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <span>📏 {language === 'hi' ? 'ऊंचाई' : language === 'bn' ? 'উচ্চতা' : 'Height'}</span>
              <strong className={styles.valDisplay}>{height} cm</strong>
            </div>
            <input
              type="range"
              min={120}
              max={220}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className={styles.rangeSlider}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <span>⚖️ {language === 'hi' ? 'वजन' : language === 'bn' ? 'ওজন' : 'Weight'}</span>
              <strong className={styles.valDisplay}>{weight} kg</strong>
            </div>
            <input
              type="range"
              min={30}
              max={150}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className={styles.rangeSlider}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <span>💓 {language === 'hi' ? 'रक्तचाप (सिस्टोलिक)' : language === 'bn' ? 'রক্তচাপ (সিস্টোলিক)' : 'Systolic BP'}</span>
              <strong className={styles.valDisplay}>{systolic} mmHg</strong>
            </div>
            <input
              type="range"
              min={80}
              max={180}
              value={systolic}
              onChange={(e) => setSystolic(Number(e.target.value))}
              className={styles.rangeSlider}
            />
          </div>

          <div className={styles.controlGroup}>
            <div className={styles.controlLabelRow}>
              <span>🫀 {language === 'hi' ? 'हृदय गति' : language === 'bn' ? 'হৃদস্পন্দন' : 'Heart Rate'}</span>
              <strong className={styles.valDisplay}>{heartRate} bpm</strong>
            </div>
            <input
              type="range"
              min={50}
              max={130}
              value={heartRate}
              onChange={(e) => setHeartRate(Number(e.target.value))}
              className={styles.rangeSlider}
            />
          </div>
        </div>

        {/* Dynamic Display Meter Column */}
        <div className={styles.metersCol}>
          {/* Wellness Ring */}
          <div className={styles.scoreBox}>
            <div className={styles.circularMeter}>
              <svg viewBox="0 0 36 36" className={styles.circularChart}>
                <path
                  className={styles.circleBg}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={styles.circleFill}
                  strokeDasharray={`${wellnessScore}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className={styles.scoreNumber}>
                <span className={styles.numberBig}>{wellnessScore}</span>
                <span className={styles.numberSub}>/ 100</span>
              </div>
            </div>
            <div className={styles.scoreInfo}>
              <h4 className={styles.scoreTitle}>
                {language === 'hi' ? 'स्वास्थ्य सूचकांक (Wellness Score)' : language === 'bn' ? 'সামগ্রিক স্বাস্থ্য সূচক' : 'Health Wellness Index'}
              </h4>
              <p className={styles.scoreDesc}>
                {wellnessScore >= 85
                  ? (language === 'hi' ? 'उत्कृष्ट स्वास्थ्य स्तर! अपने दैनिक आहार और व्यायाम को बनाए रखें।' : language === 'bn' ? 'চমৎকার স্বাস্থ্য স্তর! স্বাস্থ্যকর রুটিন বজায় রাখুন।' : 'Optimal vitality! Keep maintaining balanced nutrition & physical activity.')
                  : (language === 'hi' ? 'सामान्य से थोड़ा विचलन। नियमित डॉक्टर परामर्श की सलाह दी जाती है।' : language === 'bn' ? 'স্বাভাবিকের থেকে সামান্য কম। ডাক্তারের পরামর্শ নেওয়া ভালো।' : 'Minor variations detected. Lifestyle adjustments & checkups advised.')}
              </p>
            </div>
          </div>

          {/* BMI Card */}
          <div className={styles.bmiCard}>
            <div className={styles.bmiHeader}>
              <span className={styles.bmiLabel}>
                {language === 'hi' ? 'बॉडी मास इंडेक्स (BMI)' : language === 'bn' ? 'বডি মাস ইনডেক্স (BMI)' : 'Calculated BMI'}
              </span>
              <span className={styles.bmiCategory} style={{ backgroundColor: `${bmiCat.color}20`, color: bmiCat.color, borderColor: bmiCat.color }}>
                {bmiCat[language as 'en' | 'hi' | 'bn'] || bmiCat.en}
              </span>
            </div>
            <div className={styles.bmiValueRow}>
              <span className={styles.bmiBigVal}>{bmi}</span>
              <span className={styles.bmiUnit}>kg/m²</span>
            </div>
            
            {/* Visual BMI Scale Bar */}
            <div className={styles.scaleBar}>
              <div className={styles.scaleSegment} style={{ background: '#f59e0b', width: '25%' }} title="Underweight (<18.5)"></div>
              <div className={styles.scaleSegment} style={{ background: '#10b981', width: '35%' }} title="Healthy (18.5 - 24.9)"></div>
              <div className={styles.scaleSegment} style={{ background: '#f97316', width: '25%' }} title="Overweight (25 - 29.9)"></div>
              <div className={styles.scaleSegment} style={{ background: '#ef4444', width: '15%' }} title="Obese (>=30)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
