// app/chat/page.tsx — Interactive RAHAT AI Health Assistant Chatbot
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import PatientHeader from '@/components/PatientHeader';
import DoctorHeader from '@/components/DoctorHeader';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { ChatMessage } from '@/types/health';
import styles from './page.module.css';

export default function AiChatPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'guest'>('guest');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem('rahat-doctor-auth')) {
        setUserRole('doctor');
      } else if (localStorage.getItem('rahat-auth')) {
        setUserRole('patient');
      }
    } catch (e) {}
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: t('chat.welcomeMsg') || 'Hello! I am RAHAT AI Health Assistant. How can I help you understand your symptoms today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: 'none'
      }
    ]);
  }, [language, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateAiReply = (userQuery: string) => {
    const lower = userQuery.toLowerCase();
    
    // Emergency checks
    if (lower.includes('chest pain') || lower.includes('breathing') || lower.includes('unconscious') || lower.includes('severe bleeding') || lower.includes('stroke') || lower.includes('सीने में दर्द') || lower.includes('শ্বাসকষ্ট')) {
      return {
        text: language === 'hi' 
          ? '⚠️ चेतावनी: यह एक गंभीर या आपातकालीन लक्षण हो सकता है। कृपया तुरंत नजदीकी अस्पताल या आपातकालीन हेल्पलाइन से संपर्क करें!' 
          : language === 'bn'
          ? '⚠️ সতর্কতা: এটি একটি গুরুতর বা জরুরী লক্ষণ হতে পারে। অনুগ্রহ করে অবিলম্বে নিকটস্থ হাসপাতালে যোগাযোগ করুন!'
          : '⚠️ URGENT WARNING: These could be signs of a medical emergency. Please seek immediate emergency medical care or call local emergency services right away!',
        isEmergency: true,
        suggestedAction: 'book-doctor' as const
      };
    }

    if (lower.includes('fever') || lower.includes('बुखार') || lower.includes('জ্বর')) {
      return {
        text: language === 'hi'
          ? 'बुखार के साथ क्या आपको शरीर में दर्द, सिरदर्द या ठंड लग रही है? आप पर्याप्त पानी पिएं और आराम करें। क्या आप पूरा स्वास्थ्य परीक्षण शुरू करना चाहते हैं?'
          : language === 'bn'
          ? 'জ্বরের সাথে আপনার কি গায়ে ব্যথা বা মাথাব্যথা হচ্ছে? পর্যাপ্ত জল পান করুন ও বিশ্রাম নিন। আপনি কি সম্পূর্ণ স্বাস্থ্য পরীক্ষা শুরু করতে চান?'
          : 'For fever, monitor your temperature, stay hydrated, and rest. Are you also experiencing body pain, chills, or headache? You can take a guided health check to generate a report for your doctor.',
        isEmergency: false,
        suggestedAction: 'start-assessment' as const
      };
    }

    if (lower.includes('cough') || lower.includes('खांसी') || lower.includes('কাশি')) {
      return {
        text: language === 'hi'
          ? 'खांसी सूखी है या कफ के साथ? यदि सांस लेने में तकलीफ या सीने में भारीपन हो, तो तुरंत डॉक्टर से परामर्श लें। गर्म पानी का भाप लेने से आराम मिल सकता है।'
          : language === 'bn'
          ? 'কাশি কি শুকনো নাকি কফযুক্ত? শ্বাসকষ্ট বা বুকে অস্বস্তি থাকলে অবিলম্বে ডাক্তারের পরামর্শ নিন। গরম জলের ভাপ নেওয়া সহায়ক হতে পারে।'
          : 'Is your cough dry or with phlegm? Warm fluids and steam inhalation can help soothe your throat. If you have chest tightness or difficulty breathing, please consult a doctor.',
        isEmergency: false,
        suggestedAction: 'start-assessment' as const
      };
    }

    if (lower.includes('stomach') || lower.includes('pain') || lower.includes('पेट दर्द') || lower.includes('পেট ব্যথা')) {
      return {
        text: language === 'hi'
          ? 'पेट दर्द किस तरफ है और कब से हो रहा है? क्या उल्टी या दस्त भी है? भारी या तैलीय भोजन से बचें और हल्का खाना खाएं।'
          : language === 'bn'
          ? 'পেটে ব্যথা কোথায় এবং কতদিন ধরে হচ্ছে? বমি বা পাতলা পায়খানা আছে কি? সহজপাচ্য খাবার গ্রহণ করুন।'
          : 'Stomach discomfort can arise from indigestion, acidity, or infections. Avoid heavy/spicy foods and stay hydrated. Consider starting an assessment to record your exact symptoms.',
        isEmergency: false,
        suggestedAction: 'start-assessment' as const
      };
    }

    return {
      text: language === 'hi'
        ? `मैंने आपके लक्षण दर्ज कर लिए हैं। बेहतर और सटीक विश्लेषण के लिए, आप नीचे बटन दबाकर संरचित स्वास्थ्य मूल्यांकन (Health Assessment) शुरू कर सकते हैं।`
        : language === 'bn'
        ? `আমি আপনার লক্ষণগুলি লক্ষ্য করেছি। আরও বিস্তারিত ও সঠিক মূল্যায়নের জন্য, আপনি নিচে বোতাম টিপে সম্পূর্ণ স্বাস্থ্য পরীক্ষা শুরু করতে পারেন।`
        : `I understand your concern. To properly structure your symptoms into a printable summary for a doctor, you can start our structured interactive health assessment.`,
      isEmergency: false,
      suggestedAction: 'start-assessment' as const
    };
  };

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: q.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAiReply(q);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: reply.isEmergency,
        suggestedAction: reply.suggestedAction
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      {userRole === 'doctor' ? <DoctorHeader /> : userRole === 'patient' ? <PatientHeader /> : <Header />}
      <main className={styles.main}>
        <div className={styles.chatCard}>
          <div className={styles.chatHeader}>
            <div className={styles.botInfo}>
              <div className={styles.botAvatar}>🤖</div>
              <div>
                <h1 className={styles.title}>{t('chat.title') || 'RAHAT AI Health Assistant'}</h1>
                <p className={styles.subtitle}>{t('chat.subtitle')}</p>
              </div>
            </div>
            <button onClick={() => router.push('/health-check')} className={styles.headerCta}>
              {t('chat.convertReport') || 'Start Health Check'}
            </button>
          </div>

          {/* Quick Prompts */}
          <div className={styles.quickPrompts}>
            <button onClick={() => handleSend(t('chat.prompt1'))} className={styles.promptBtn}>
              🌡️ {t('chat.prompt1')}
            </button>
            <button onClick={() => handleSend(t('chat.prompt2'))} className={styles.promptBtn}>
              🩺 {t('chat.prompt2')}
            </button>
            <button onClick={() => handleSend(t('chat.prompt3'))} className={styles.promptBtn}>
              💨 {t('chat.prompt3')}
            </button>
          </div>

          {/* Messages Stream */}
          <div className={styles.messagesBox}>
            {messages.map((m) => (
              <div key={m.id} className={`${styles.messageRow} ${m.sender === 'user' ? styles.userRow : styles.aiRow}`}>
                {m.sender === 'ai' && <div className={styles.avatarMini}>🤖</div>}
                <div className={`${styles.messageBubble} ${m.sender === 'user' ? styles.userBubble : styles.aiBubble} ${m.isEmergency ? styles.emergencyBubble : ''}`}>
                  <p className={styles.messageText}>{m.text}</p>
                  <span className={styles.time}>{m.timestamp}</span>

                  {m.suggestedAction === 'start-assessment' && (
                    <div className={styles.actionBlock}>
                      <button onClick={() => router.push('/health-check')} className={styles.bubbleActionBtn}>
                        📋 {t('chat.convertReport') || 'Start Structured Health Check'}
                      </button>
                    </div>
                  )}

                  {m.suggestedAction === 'book-doctor' && (
                    <div className={styles.actionBlock}>
                      <button onClick={() => router.push('/appointments')} className={styles.bubbleEmergencyBtn}>
                        🚨 {t('appointments.book') || 'Book Priority Consultation'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.messageRow} ${styles.aiRow}`}>
                <div className={styles.avatarMini}>🤖</div>
                <div className={styles.typingIndicator}>
                  <span>●</span><span>●</span><span>●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('chat.placeholder') || 'Type symptoms or questions...'}
              className={styles.input}
              autoFocus
            />
            <button onClick={() => handleSend()} className={styles.sendBtn} disabled={!input.trim()}>
              {t('chat.send') || 'Send'} ➤
            </button>
          </div>

          <div className={styles.safetyFootnote}>
            ⚠️ {t('common.disclaimer') || 'Disclaimer'}: RAHAT AI Assistant provides health information and symptom guidance, not formal clinical diagnosis.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
