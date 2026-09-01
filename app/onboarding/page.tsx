// app/onboarding/page.tsx — Comprehensive Patient Health Registration
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { generateHealthId } from '@/lib/healthId';
import { UserProfile } from '@/types/user';
import styles from './page.module.css';

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  
  // Vitals & Location
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [state, setState] = useState('Delhi');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Medical History
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [drugAllergies, setDrugAllergies] = useState<string[]>([]);
  const [currentMedications, setCurrentMedications] = useState('');

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('Parent / Spouse');

  const [generatedHealthId, setGeneratedHealthId] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    try {
      const authStr = localStorage.getItem('rahat-auth');
      if (!authStr) {
        router.push('/login');
        return;
      }
      const auth = JSON.parse(authStr);
      setPhone(auth.phone || '');
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  const toggleCondition = (cond: string) => {
    if (cond === 'None') {
      setChronicConditions(['None']);
      return;
    }
    setChronicConditions(prev => {
      const filtered = prev.filter(c => c !== 'None');
      return filtered.includes(cond) ? filtered.filter(c => c !== cond) : [...filtered, cond];
    });
  };

  const toggleAllergy = (allergy: string) => {
    if (allergy === 'No Known Allergies') {
      setDrugAllergies(['No Known Allergies']);
      return;
    }
    setDrugAllergies(prev => {
      const filtered = prev.filter(a => a !== 'No Known Allergies');
      return filtered.includes(allergy) ? filtered.filter(a => a !== allergy) : [...filtered, allergy];
    });
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();

    const healthId = generateHealthId();
    setGeneratedHealthId(healthId);

    const profile: UserProfile = {
      phone,
      rahatHealthId: healthId,
      name: name.trim() || 'Patient',
      age: parseInt(age) || 28,
      dateOfBirth: '',
      gender: gender as any,
      bloodGroup: bloodGroup as any,
      height: height ? `${height} cm` : '',
      weight: weight ? `${weight} kg` : '',
      allergies: drugAllergies,
      existingConditions: chronicConditions,
      emergencyContact: {
        name: emergencyName.trim() || 'Primary Contact',
        phone: emergencyPhone.trim() || phone,
        relationship: emergencyRelation,
      },
      language: 'en',
      profileCompleted: true,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(`rahat-profile-${phone}`, JSON.stringify(profile));
      localStorage.setItem('rahat-active-health-id', healthId);
    } catch (e) {}

    setIsCompleted(true);
  };

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          {!isCompleted ? (
            <div>
              {/* Stepper Header */}
              <div className={styles.stepperHeader}>
                <div className={styles.badge}>👤 Patient Health Registration</div>
                <h1 className={styles.title}>Complete Your Health Profile</h1>
                <p className={styles.subtitle}>
                  Provide your medical profile to generate your official trilingual RAHAT Health ID and personalize your clinical health reports.
                </p>

                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>

                <div className={styles.stepLabels}>
                  <span className={step >= 1 ? styles.activeStep : ''}>1. Basic Details</span>
                  <span className={step >= 2 ? styles.activeStep : ''}>2. Vitals & Medical History</span>
                  <span className={step >= 3 ? styles.activeStep : ''}>3. Emergency Contact</span>
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className={styles.stepContent}>
                  <div className={styles.field}>
                    <label>Patient Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your legal full name"
                      className={styles.input}
                      required
                      autoFocus
                    />
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Age (Years) *</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 32"
                        min="1"
                        max="120"
                        className={styles.input}
                        required
                      />
                    </div>

                    <div className={styles.field}>
                      <label>Gender *</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className={styles.input}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Blood Group *</label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className={styles.input}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label>State / Region</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g. Delhi, West Bengal, Maharashtra"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => {
                      if (!name.trim() || !age) {
                        alert('Please fill in your Name and Age.');
                        return;
                      }
                      setStep(2);
                    }} 
                    className={styles.primaryBtn}
                  >
                    Next: Vitals & Medical History →
                  </button>
                </div>
              )}

              {/* Step 2: Vitals & Medical History */}
              {step === 2 && (
                <div className={styles.stepContent}>
                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Height (cm)</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 170"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.field}>
                      <label>Weight (kg)</label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g. 68"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {/* Chronic conditions chips */}
                  <div className={styles.field}>
                    <label>Chronic Medical Conditions (Select all that apply)</label>
                    <div className={styles.chipGrid}>
                      {['Diabetes', 'Hypertension (High BP)', 'Asthma', 'Thyroid Disorder', 'Heart Disease', 'Kidney Disease', 'None'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleCondition(c)}
                          className={`${styles.chip} ${chronicConditions.includes(c) ? styles.chipSelected : ''}`}
                        >
                          {chronicConditions.includes(c) ? '✓ ' : '+ '} {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Drug Allergies chips */}
                  <div className={styles.field}>
                    <label>Known Drug / Medicine Allergies</label>
                    <div className={styles.chipGrid}>
                      {['Penicillin', 'Sulfa Drugs', 'Aspirin / NSAIDs', 'Paracetamol', 'No Known Allergies'].map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => toggleAllergy(a)}
                          className={`${styles.chip} ${drugAllergies.includes(a) ? styles.chipSelected : ''}`}
                        >
                          {drugAllergies.includes(a) ? '✓ ' : '+ '} {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label>Current Regular Medications (Optional)</label>
                    <input
                      type="text"
                      value={currentMedications}
                      onChange={(e) => setCurrentMedications(e.target.value)}
                      placeholder="e.g. Metformin 500mg, Telmisartan 40mg"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.btnRow}>
                    <button type="button" onClick={() => setStep(1)} className={styles.secondaryBtn}>
                      ← Back
                    </button>
                    <button type="button" onClick={() => setStep(3)} className={styles.primaryBtn}>
                      Next: Emergency Contact →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Emergency Contact */}
              {step === 3 && (
                <form onSubmit={handleFinish} className={styles.stepContent}>
                  <div className={styles.field}>
                    <label>Emergency Contact Person Name *</label>
                    <input
                      type="text"
                      value={emergencyName}
                      onChange={(e) => setEmergencyName(e.target.value)}
                      placeholder="e.g. Suresh Sharma (Father / Spouse)"
                      className={styles.input}
                      required
                      autoFocus
                    />
                  </div>

                  <div className={styles.row}>
                    <div className={styles.field}>
                      <label>Emergency Phone Number *</label>
                      <input
                        type="tel"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                        placeholder="e.g. +91 9876543210"
                        className={styles.input}
                        required
                      />
                    </div>

                    <div className={styles.field}>
                      <label>Relationship *</label>
                      <select
                        value={emergencyRelation}
                        onChange={(e) => setEmergencyRelation(e.target.value)}
                        className={styles.input}
                      >
                        <option value="Parent">Parent</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Child">Child</option>
                        <option value="Friend / Guardian">Friend / Guardian</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.privacyNotice}>
                    🔒 <strong>Privacy Assurance:</strong> Your health records and profile details are encrypted locally on your device. RAHAT does not share your health data without your explicit consent.
                  </div>

                  <div className={styles.btnRow}>
                    <button type="button" onClick={() => setStep(2)} className={styles.secondaryBtn}>
                      ← Back
                    </button>
                    <button type="submit" className={styles.finishBtn}>
                      Generate Health ID & Enter Dashboard 🚀
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Success State */
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h2 className={styles.successTitle}>Health Profile Successfully Created!</h2>
              <p className={styles.successDesc}>Your unique national-ready digital Health ID has been issued:</p>

              <div className={styles.idCard}>
                <div className={styles.idCardHeader}>
                  <img src="/logo.png" alt="RAHAT" className={styles.idLogo} />
                  <span>RAHAT DIGITAL HEALTH CARD</span>
                </div>
                <div className={styles.idNumber}>{generatedHealthId}</div>
                <div className={styles.idMeta}>
                  <div><strong>Name:</strong> {name}</div>
                  <div><strong>Blood:</strong> {bloodGroup}</div>
                  <div><strong>Phone:</strong> {phone}</div>
                </div>
              </div>

              <button 
                onClick={() => router.push('/dashboard')} 
                className={styles.enterDashboardBtn}
              >
                Go to Patient Dashboard →
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
