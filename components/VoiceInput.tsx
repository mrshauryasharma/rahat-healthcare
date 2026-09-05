// components/VoiceInput.tsx — Robust Continuous Trilingual Voice Recognition (Web Speech API)
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);
  const accumulatedTextRef = useRef('');

  useEffect(() => {
    // Check Web Speech API availability
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const getLocaleCode = () => {
    switch (language) {
      case 'hi': return 'hi-IN';
      case 'bn': return 'bn-IN';
      default: return 'en-IN';
    }
  };

  const startListening = async () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'hi' 
        ? 'आपके ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है। कृपया Google Chrome या Edge का उपयोग करें।' 
        : language === 'bn' 
        ? 'আপনার ব্রাউজারে ভয়েস সমর্থন নেই। অনুগ্রহ করে Chrome বা Edge ব্যবহার করুন।' 
        : 'Voice recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    // Request microphone permission explicitly
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Release tracks immediately so SpeechRecognition can bind cleanly
        stream.getTracks().forEach(track => track.stop());
      } catch (err: any) {
        console.warn('Microphone permission request error:', err);
        setErrorMessage(language === 'hi' ? 'माइक्रोफ़ोन अनुमति की आवश्यकता है' : language === 'bn' ? 'মাইক্রোফোন অ্যাক্সেস প্রয়োজন' : 'Microphone permission needed');
        return;
      }
    }

    setErrorMessage(null);
    shouldListenRef.current = true;
    accumulatedTextRef.current = '';

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = getLocaleCode();
      recognition.continuous = true; // Stay listening continuously without 1-second cutoff
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setInterimText('');
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let currentInterim = '';
        let fullFinal = '';

        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            fullFinal += res[0].transcript + ' ';
          } else {
            currentInterim += res[0].transcript;
          }
        }

        if (currentInterim) {
          setInterimText(currentInterim);
        }

        if (fullFinal.trim()) {
          accumulatedTextRef.current = fullFinal.trim();
          onTranscript(fullFinal.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[Voice Recognition]', event.error);
        
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          shouldListenRef.current = false;
          setIsListening(false);
          setErrorMessage(language === 'hi' ? 'कृपया माइक्रोफ़ोन की अनुमति दें' : language === 'bn' ? 'মাইক্রোফোন পারমিশন দিন' : 'Please allow microphone access');
          return;
        }

        // For 'no-speech' or 'network' with continuous active, don't crash
        if (event.error === 'no-speech' && shouldListenRef.current) {
          // Keep listening
          return;
        }
      };

      recognition.onend = () => {
        // If user hasn't explicitly stopped it, auto-restart to prevent 1-second timeout
        if (shouldListenRef.current) {
          try {
            recognition.start();
          } catch (e) {
            setIsListening(false);
          }
        } else {
          setIsListening(false);
          setInterimText('');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to initialize speech recognition:', err);
      setIsListening(false);
      shouldListenRef.current = false;
    }
  };

  const stopListening = () => {
    shouldListenRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    setInterimText('');
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
        title={isListening ? 'Click to stop listening' : `Click to speak (${getLocaleCode()})`}
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

      {/* Visual Live Overlay when Mic is Active */}
      {isListening && (
        <div className={styles.liveSpeechOverlay}>
          <span className={styles.pulseDot}></span>
          <span className={styles.listeningText}>
            {language === 'hi' ? '🎤 सुन रहा हूँ... खुलकर बोलिए...' : language === 'bn' ? '🎤 শুনছি... আপনার লক্ষণ বলুন...' : '🎤 Listening continuously... Speak your symptoms...'}
          </span>
          {interimText && <span className={styles.interimText}>"{interimText}"</span>}
          <button type="button" onClick={stopListening} className={styles.stopTextBtn}>
            {language === 'hi' ? 'रोकें (Done)' : language === 'bn' ? 'সম্পন্ন (Done)' : 'Stop'}
          </button>
        </div>
      )}

      {errorMessage && (
        <div className={styles.errorPill}>
          ⚠️ {errorMessage}
        </div>
      )}
    </div>
  );
}
