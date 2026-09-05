// components/AudioReadout.tsx — Text-to-Speech Audio Readout
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { IconSpeaker } from './Icons';
import styles from './AudioReadout.module.css';

interface AudioReadoutProps {
  textToRead: string;
  label?: string;
  className?: string;
}

export default function AudioReadout({ textToRead, label, className = '' }: AudioReadoutProps) {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
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

  const handleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech audio is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = getLocaleCode();
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`${styles.audioBtn} ${isPlaying ? styles.playing : ''} ${className}`}
      title={isPlaying ? 'Stop audio' : 'Listen to explanation'}
    >
      <IconSpeaker size={18} color="currentColor" />
      <span>{isPlaying ? (language === 'hi' ? 'रोकें' : language === 'bn' ? 'থামান' : 'Stop') : (label || (language === 'hi' ? 'ऑडियो सुनें' : language === 'bn' ? 'অডিও শুনুন' : 'Listen'))}</span>
      {isPlaying && <span className={styles.playingWave}></span>}
    </button>
  );
}
