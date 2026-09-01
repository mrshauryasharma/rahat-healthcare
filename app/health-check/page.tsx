// app/health-check/page.tsx — Interactive health assessment flow
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PatientHeader from '@/components/PatientHeader';
import Footer from '@/components/Footer';
import HealthConcernCard from '@/components/HealthConcernCard';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import ImageUploader from '@/components/ImageUploader';
import { useLanguage } from '@/components/LanguageProvider';
import { healthConcerns } from '@/data/healthConcerns';
import { getQuestionsForConcern } from '@/data/healthQuestions';
import { HealthConcern, HealthQuestion, UploadedImage, UserAnswer } from '@/types/health';
import { generateHealthId } from '@/lib/healthId';
import styles from './page.module.css';

export default function HealthCheck() {
  const router = useRouter();
  const { language, t } = useLanguage();
  
  const [profile, setProfile] = useState<any>(null);
  const [step, setStep] = useState(1); // 1=concern, 2=questions, 3=image+notes, 4=review
  const [selectedConcern, setSelectedConcern] = useState<HealthConcern | null>(null);
  const [questions, setQuestions] = useState<HealthQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [notes, setNotes] = useState('');

  // Auth check
  useEffect(() => {
    const authStr = localStorage.getItem('rahat-auth');
    if (!authStr) {
      router.push('/login');
      return;
    }
    try {
      const auth = JSON.parse(authStr);
      const profileStr = localStorage.getItem(`rahat-profile-${auth.phone}`);
      if (profileStr) {
        setProfile(JSON.parse(profileStr));
      } else {
        setProfile({
          phone: auth.phone,
          rahatHealthId: auth.userId || generateHealthId(),
          name: '',
          language
        });
      }
    } catch (e) {
      // Safe fallback
    }
  }, [router, language]);

  // Handle concern selection
  const handleSelectConcern = (concern: HealthConcern) => {
    setSelectedConcern(concern);
    const qs = getQuestionsForConcern(concern.id);
    setQuestions(qs);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setStep(2);
  };

  // Handle answer selection
  const handleSelectOption = (optionId: string) => {
    if (!questions[currentQuestionIndex]) return;
    const q = questions[currentQuestionIndex];
    const option = q.options.find(o => o.id === optionId);
    if (!option) return;

    const newAnswer: UserAnswer = {
      questionId: q.id,
      questionText: q.text[language] || q.text.en,
      selectedOptionId: optionId,
      selectedOptionText: option.text[language] || option.text.en,
      isWarning: option.isWarning || false,
    };

    const newAnswers = [...answers];
    const existingIdx = newAnswers.findIndex(a => a.questionId === q.id);
    if (existingIdx >= 0) {
      newAnswers[existingIdx] = newAnswer;
    } else {
      newAnswers.push(newAnswer);
    }
    setAnswers(newAnswers);
  };

  const getCurrentAnswer = () => {
    if (!questions[currentQuestionIndex]) return undefined;
    return answers.find(a => a.questionId === questions[currentQuestionIndex].id)?.selectedOptionId;
  };

  // Navigation between questions
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep(3); // Move to image upload + notes
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setStep(1);
      setAnswers([]);
      setCurrentQuestionIndex(0);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setStep(2);
  };

  // Handle image upload
  const handleImageUpload = (image: UploadedImage) => {
    setUploadedImages(prev => [...prev.filter(i => i.id !== image.id), image]);
  };

  // Generate report and save
  const generateReport = () => {
    if (!selectedConcern) return;

    const userHealthId = profile?.rahatHealthId || profile?.healthId || generateHealthId();
    const id = Date.now().toString();

    const assessment = {
      id,
      rahatHealthId: userHealthId,
      concernId: selectedConcern.id,
      concernName: selectedConcern.name[language] || selectedConcern.name.en,
      answers,
      images: uploadedImages,
      duration: answers.find(a => 
        a.questionText.toLowerCase().includes('how long') ||
        a.questionText.toLowerCase().includes('कब से') ||
        a.questionText.toLowerCase().includes('কতদিন')
      )?.selectedOptionText || '',
      additionalNotes: notes,
      createdAt: new Date().toISOString(),
      language,
      reportGenerated: true,
    };

    // Save to localStorage
    const storageKey = `rahat-assessments-${userHealthId}`;
    try {
      const existingStr = localStorage.getItem(storageKey);
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem(storageKey, JSON.stringify([...existing, assessment]));
    } catch (e) {
      // Storage save
    }
    
    sessionStorage.setItem('rahat-current-assessment', id);
    router.push(`/health-check/results?id=${id}`);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.container}>
      <PatientHeader />
      <main className={styles.main}>
        {/* Step 1: Select health concern */}
        {step === 1 && (
          <section className={styles.stepSection}>
            <h1 className={styles.title}>{t('healthCheck.selectConcern') || 'What health concern would you like to check?'}</h1>
            <p className={styles.subtitle}>{t('healthCheck.selectOne') || 'Select one concern to begin your assessment.'}</p>
            <div className={styles.concernGrid}>
              {healthConcerns.map((c) => (
                <HealthConcernCard
                  key={c.id}
                  concern={c}
                  isSelected={selectedConcern?.id === c.id}
                  onClick={() => handleSelectConcern(c)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Step 2: Answer questions */}
        {step === 2 && currentQuestion && (
          <section className={styles.stepSection}>
            <ProgressBar
              current={currentQuestionIndex + 1}
              total={questions.length}
              label={t('healthCheck.questionOf')
                .replace('{current}', String(currentQuestionIndex + 1))
                .replace('{total}', String(questions.length))}
            />
            <QuestionCard
              questionText={currentQuestion.text[language] || currentQuestion.text.en}
              options={currentQuestion.options.map(o => ({
                id: o.id,
                text: o.text[language] || o.text.en,
                isWarning: o.isWarning,
              }))}
              selectedOptionId={getCurrentAnswer()}
              onSelect={handleSelectOption}
            />
            <div className={styles.navButtons}>
              <button onClick={prevQuestion} className={styles.btnSecondary}>
                ← {t('healthCheck.back') || 'Back'}
              </button>
              {!currentQuestion.isRequired && (
                <button onClick={nextQuestion} className={styles.btnSkip}>
                  {t('healthCheck.skip') || 'Skip'}
                </button>
              )}
              <button
                onClick={nextQuestion}
                className={styles.btnPrimary}
                disabled={currentQuestion.isRequired && !getCurrentAnswer()}
              >
                {currentQuestionIndex < questions.length - 1 ? (t('healthCheck.next') || 'Next') : (t('healthCheck.review') || 'Review')} →
              </button>
            </div>
          </section>
        )}

        {/* Step 3: Image upload and notes */}
        {step === 3 && (
          <section className={styles.stepSection}>
            <h2 className={styles.sectionHeading}>{t('healthCheck.uploadImage') || 'Upload Medicine/Prescription Image'} <span className={styles.optional}>({t('healthCheck.optional') || 'Optional'})</span></h2>
            <ImageUploader
              onImageUpload={handleImageUpload}
              onRemove={() => setUploadedImages([])}
            />
            <div className={styles.notesSection}>
              <label className={styles.label}>{t('healthCheck.additionalNotes') || 'Additional Notes'}</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={styles.textarea}
                rows={4}
                placeholder={t('healthCheck.notesPlaceholder') || 'Add any additional information about your symptoms...'}
              />
            </div>
            <div className={styles.navButtons}>
              <button onClick={() => { setCurrentQuestionIndex(questions.length - 1); setStep(2); }} className={styles.btnSecondary}>
                ← {t('healthCheck.back') || 'Back'}
              </button>
              <button onClick={() => setStep(4)} className={styles.btnPrimary}>
                {t('healthCheck.review') || 'Review Answers'} →
              </button>
            </div>
          </section>
        )}

        {/* Step 4: Review answers */}
        {step === 4 && (
          <section className={styles.stepSection}>
            <h2 className={styles.sectionHeading}>{t('healthCheck.review') || 'Review Answers'}</h2>
            <p className={styles.subtitle}>Please review your answers before generating your clinical health summary.</p>
            
            <div className={styles.reviewList}>
              {answers.map((a, i) => (
                <div key={i} className={styles.reviewItem}>
                  <div className={styles.reviewText}>
                    <p className={styles.reviewQ}><strong>{i + 1}. {a.questionText}</strong></p>
                    <p className={styles.reviewA}>{a.selectedOptionText} {a.isWarning ? '⚠️' : ''}</p>
                  </div>
                  <button onClick={() => jumpToQuestion(i)} className={styles.editBtn}>
                    ✏️ {t('common.edit') || 'Edit'}
                  </button>
                </div>
              ))}

              {uploadedImages.length > 0 && (
                <div className={styles.reviewItem}>
                  <div className={styles.reviewText}>
                    <p className={styles.reviewQ}><strong>📷 {t('healthCheck.uploadImage') || 'Uploaded Image'}</strong></p>
                    <p className={styles.reviewA}>{uploadedImages[0].userNotes || 'Image attached'}</p>
                  </div>
                  <button onClick={() => setStep(3)} className={styles.editBtn}>
                    ✏️ {t('common.edit') || 'Edit'}
                  </button>
                </div>
              )}

              {notes && (
                <div className={styles.reviewItem}>
                  <div className={styles.reviewText}>
                    <p className={styles.reviewQ}><strong>📝 {t('healthCheck.additionalNotes') || 'Additional Notes'}</strong></p>
                    <p className={styles.reviewA}>{notes}</p>
                  </div>
                  <button onClick={() => setStep(3)} className={styles.editBtn}>
                    ✏️ {t('common.edit') || 'Edit'}
                  </button>
                </div>
              )}
            </div>

            <div className={styles.navButtons}>
              <button onClick={() => setStep(3)} className={styles.btnSecondary}>
                ← {t('healthCheck.back') || 'Back'}
              </button>
              <button onClick={generateReport} className={styles.btnPrimary}>
                🚀 {t('healthCheck.generateReport') || 'Generate Report'}
              </button>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
