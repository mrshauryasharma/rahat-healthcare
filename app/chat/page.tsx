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

  const quickPrompts = [
    { label: language === 'hi' ? '🤒 2 दिन से बुखार और ठंड' : language === 'bn' ? '🤒 ২ দিন ধরে জ্বর ও শীত' : '🤒 Fever & chills for 2 days', query: 'I have had fever and chills for 2 days' },
    { label: language === 'hi' ? '🤧 सर्दी और गले में खराश' : language === 'bn' ? '🤧 সর্দি ও গলায় ব্যথা' : '🤧 Cold & sore throat', query: 'Severe runny nose and throat irritation' },
    { label: language === 'hi' ? '🤕 तेज सिरदर्द' : language === 'bn' ? '🤕 তীব্র মাথাব্যথা' : '🤕 Throbbing headache', query: 'Severe continuous headache and light sensitivity' },
    { label: language === 'hi' ? '🤢 पेट में दर्द और ऐंठन' : language === 'bn' ? '🤢 পেটে তীব্র ব্যথা' : '🤢 Stomach ache & cramps', query: 'Sharp stomach pain after eating meals' },
  ];

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
          ? '⚠️ आपातकालीन चेतावनी: सीने में तेज दर्द या सांस लेने में तकलीफ गंभीर हो सकती है। कृपया तुरंत 108/112 डायल करें या निकटतम आपातकालीन अस्पताल जाएं!' 
          : language === 'bn'
          ? '⚠️ জরুরী সতর্কতা: বুকে তীব্র ব্যথা বা শ্বাসকষ্ট গুরুতর হতে পারে। অবিলম্বে ১০৮/১১২ ডায়াল করুন অথবা নিকটস্থ হাসপাতালে যোগাযোগ করুন!'
          : '⚠️ URGENT EMERGENCY: Severe chest pain or breathing difficulty can be life-threatening. Please call emergency services (108/112) or go to the nearest emergency room immediately!',
        isEmergency: true,
        suggestedAction: 'book-doctor' as const
      };
    }

    if (lower.includes('fever') || lower.includes('बुखार') || lower.includes('জ্বর')) {
      return {
        text: language === 'hi'
          ? 'बुखार के साथ क्या आपको शरीर में दर्द, सिरदर्द या ठंड लग रही है? पर्याप्त पानी पिएं और आराम करें। चलिए आपके डॉक्टर के लिए 3-संस्करण स्वास्थ्य रिपोर्ट तैयार करते हैं।'
          : language === 'bn'
          ? 'জ্বরের সাথে আপনার কি গায়ে ব্যথা বা মাথাব্যথা হচ্ছে? পর্যাপ্ত জল পান করুন ও বিশ্রাম নিন। চলুন ডাক্তারের জন্য ৩-সংস্করণ স্বাস্থ্য রিপোর্ট তৈরি করি।'
          : 'For fever, monitor your temperature, stay hydrated, and rest. Are you experiencing chills or body pain? You can start a guided health assessment to generate a doctor-ready triage report.',
        isEmergency: false,
        suggestedAction: 'start-assessment' as const
      };
    }

    if (lower.includes('cough') || lower.includes('खांसी') || lower.includes('কাশি')) {
      return {
        text: language === 'hi'
          ? 'खांसी सूखी है या कफ के साथ? गर्म पानी की भाप लें और गुनगुना पानी पिएं। यदि सांस लेने में भारीपन हो, तो तुरंत डॉक्टर से परामर्श लें।'
          : language === 'bn'
          ? 'কাশি কি শুকনো নাকি কফযুক্ত? গরম জলের ভাপ নেওয়া সহায়ক হতে পারে। শ্বাসকষ্ট থাকলে অবিলম্বে ডাক্তারের পরামর্শ নিন।'
          : 'Is your cough dry or with phlegm? Warm fluids and steam inhalation can help soothe irritation. If you have chest tightness, take a structured health assessment.',
        isEmergency: false,
        suggestedAction: 'start-assessment' as const
      };
    }

    if (lower.includes('stomach') || lower.includes('pain') || lower.includes('पेट दर्द') || lower.includes('পেট ব্যথা')) {
      return {
        text: language === 'hi'
          ? 'पेट दर्द में हल्का और सुपाच्य भोजन लें। यदि दर्द बहुत तेज है या उल्टी/दस्त है, तो तुरंत डॉक्टर से जांच करवाएं।'
          : language === 'bn'
          ? 'পেটে ব্যথার ক্ষেত্রে হালকা খাবার গ্রহণ করুন। ব্যথা তীব্র হলে বা বমি হলে অবিলম্বে ডাক্তারের কাছে যান।'
          : 'Stomach discomfort can arise from indigestion or acidity. Avoid heavy or oily foods, stay hydrated, and record your exact symptoms with our health check.',
        isEmergency: false,
        suggestedAction: 'start-assessment' as const
      };
    }

    // Default trilingual response
    return {
      text: language === 'hi'
        ? `मैंने आपके लक्षण "${userQuery}" को नोट कर लिया है। लक्षणों की सही जांच और डॉक्टर-तैयार 3-संस्करण सारांश पाने के लिए "स्वास्थ्य जांच शुरू करें" पर क्लिक करें।`
        : language === 'bn'
        ? `আমি আপনার লক্ষণ "${userQuery}" নোট করেছি। সঠিক মূল্যায়ন এবং ডাক্তারের জন্য রিপোর্ট পেতে "স্বাস্থ্য পরীক্ষা শুরু করুন" বাটনে ক্লিক করুন।`
        : `I have analyzed your input regarding "${userQuery}". For clinical accuracy and to generate a structured 3-version report for your physician, please launch a guided health assessment.`,
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
      text: q,
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
          {/* Chat Header */}
          <div className={styles.chatHeader}>
            <div className={styles.botInfo}>
              <div className={styles.botAvatar}>
                <span>🤖</span>
                <span className={styles.onlineDot}></span>
              </div>
              <div>
                <h1 className={styles.title}>{t('chat.title') || 'RAHAT AI Health Assistant'}</h1>
                <p className={styles.subtitle}>
                  <span className={styles.triageTag}>Trilingual Clinical Triage</span> &bull; 24/7 Active
                </p>
              </div>
            </div>
            <button onClick={() => router.push('/health-check')} className={styles.headerCta}>
              🩺 {t('chat.convertReport') || 'Start Health Check'}
            </button>
          </div>

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageWrapper} ${
                  msg.sender === 'user' ? styles.userWrapper : styles.aiWrapper
                }`}
              >
                {msg.sender === 'ai' && <div className={styles.msgAvatar}>🤖</div>}
                
                <div className={`${styles.messageBubble} ${msg.sender === 'user' ? styles.userBubble : styles.aiBubble} ${msg.isEmergency ? styles.emergencyBubble : ''}`}>
                  <p className={styles.messageText}>{msg.text}</p>
                  
                  {msg.isEmergency && (
                    <div className={styles.emergencyActionBox}>
                      <a href="tel:108" className={styles.emergencyCallBtn}>
                        🚨 Call Ambulance (108/112)
                      </a>
                    </div>
                  )}

                  {msg.suggestedAction === 'start-assessment' && (
                    <div className={styles.actionPrompt}>
                      <button
                        onClick={() => router.push('/health-check')}
                        className={styles.promptBtn}
                      >
                        🩺 Take Full Symptom Assessment &rarr;
                      </button>
                    </div>
                  )}

                  <span className={styles.timestamp}>{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
                <div className={styles.msgAvatar}>🤖</div>
                <div className={`${styles.messageBubble} ${styles.aiBubble} ${styles.typingBubble}`}>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className={styles.suggestionChips}>
            <span className={styles.chipLabel}>Suggestions:</span>
            {quickPrompts.map((p, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSend(p.query)}
                className={styles.chipBtn}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t('chat.inputPlaceholder') || 'Describe your symptoms in English, Hindi, or Bengali...'}
              className={styles.inputField}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className={styles.sendButton}
            >
              Send 🚀
            </button>
          </div>

          <div className={styles.disclaimerNote}>
            🛡️ RAHAT AI is an assistive triage tool and not a substitute for clinical diagnosis. For emergencies, call 108/112.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
