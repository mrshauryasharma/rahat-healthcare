// components/AiChatWidget.tsx — Floating AI Health Assistant Widget
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import styles from './AiChatWidget.module.css';

export default function AiChatWidget() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: language === 'hi' 
        ? 'नमस्ते! मैं राहत AI सहायक हूँ। आप कोई भी लक्षण यहाँ पूछ सकते हैं।' 
        : language === 'bn'
        ? 'নমস্কার! আমি রাহাত AI সহকারী। আপনি যেকোনো লক্ষণ জিজ্ঞাসা করতে পারেন।'
        : 'Hello! I am RAHAT AI Assistant. Ask any symptom question or start a health check.'
    }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: language === 'hi'
            ? 'आपके लक्षणों के आधार पर, आप एक संपूर्ण स्वास्थ्य परीक्षण (Health Check) शुरू कर सकते हैं।'
            : language === 'bn'
            ? 'আপনার লক্ষণের ভিত্তিতে, আপনি সম্পূর্ণ স্বাস্থ্য পরীক্ষা শুরু করতে পারেন।'
            : 'Based on your symptoms, we recommend taking a structured health check to generate your report.'
        }
      ]);
    }, 500);
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.widgetBox}>
          <div className={styles.widgetHeader}>
            <div className={styles.widgetTitle}>
              <span>🤖</span> RAHAT AI Assistant
            </div>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>✕</button>
          </div>

          <div className={styles.widgetBody}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.bubble} ${m.sender === 'user' ? styles.user : styles.ai}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className={styles.widgetFooter}>
            <button onClick={() => router.push('/chat')} className={styles.fullChatBtn}>
              Open Full AI Chat Screen ↗
            </button>
            <div className={styles.inputRow}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about symptoms..."
                className={styles.input}
              />
              <button onClick={handleSend} className={styles.sendBtn}>➤</button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className={styles.floatingBtn} aria-label="Open AI Assistant">
        <span className={styles.btnIcon}>{isOpen ? '✕' : '🤖'}</span>
        {!isOpen && <span className={styles.btnText}>AI Assistant</span>}
      </button>
    </div>
  );
}
