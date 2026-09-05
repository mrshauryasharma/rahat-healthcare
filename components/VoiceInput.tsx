// components/VoiceInput.tsx — Real-Time Trilingual Voice Recognition (Web Speech API)
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageProvider';
import { IconMic } from './Icons';
import styles from './VoiceInput.module.css';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export default function VoiceInput({ onTranscript, placeholder, className = '' }: VoiceInputProps) {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Web Speech API availability
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
  }, []);

  const getLocaleCode = () => {
    switch (language) {
      case 'hi': return 'hi-IN';
      case 'bn': return 'bn-IN';
      default: return 'en-IN';
    }
  };

  const startListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'hi' 
        ? 'आपके ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है। कृपया Google Chrome का उपयोग करें।' 
        : language === 'bn' 
        ? 'আপনার ব্রাউজারে ভয়েস সমর্থন নেই। অনুগ্রহ করে Chrome ব্যবহার করুন।' 
        : 'Voice recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = getLocaleCode();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setInterimText('');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) {
          setInterimText(interim);
        }
        if (final) {
          onTranscript(final);
          setInterimText('');
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[Voice Recognition Error]', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className={`${styles.voiceContainer} ${className}`}>
      <button
        type="button"
        onClick={toggleListening}
        className={`${styles.micButton} ${isListening ? styles.listening : ''}`}
        title={isListening ? 'Stop listening' : `Speak symptoms (${getLocaleCode()})`}
        aria-label="Voice input"
      >
        <IconMic size={20} color={isListening ? '#ffffff' : 'currentColor'} />
        {isListening && (
          <div className={styles.waveContainer}>
            <span className={styles.waveBar}></span>
            <span className={styles.waveBar}></span>
            <span className={styles.waveBar}></span>
            <span className={styles.waveBar}></span>
          </div>
        )}
      </button>

      {isListening && (
        <div className={styles.liveSpeechOverlay}>
          <span className={styles.pulseDot}></span>
          <span className={styles.listeningText}>
            {language === 'hi' ? 'सुन रहा हूँ... बोलिए...' : language === 'bn' ? 'শুনছি... বলুন...' : 'Listening... Speak now...'}
          </span>
          {interimText && <span className={styles.interimText}>"{interimText}"</span>}
        </div>
      )}
    </div>
  );
}
