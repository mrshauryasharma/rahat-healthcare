"use client";

import React, { useState, useRef } from 'react';
import { UploadedImage } from '@/types/health';
import { useLanguage } from './LanguageProvider';
import styles from './ImageUploader.module.css';

interface Props {
  onImageUpload: (image: UploadedImage) => void;
  existingImage?: UploadedImage;
  onRemove?: () => void;
}

export default function ImageUploader({ onImageUpload, existingImage, onRemove }: Props) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [preview, setPreview] = useState<string | null>(existingImage?.dataUrl || null);
  const [userNotes, setUserNotes] = useState(existingImage?.userNotes || '');
  const [confirmedByUser, setConfirmedByUser] = useState(existingImage?.confirmedByUser || false);

  const handleFile = (file: File) => {
    if (!file) return;
    
    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(t('image.tooLarge') || 'File is too large. Maximum size is 5MB.');
      return;
    }
    
    // Validate type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert(t('image.invalidType') || 'Unsupported file type. Please upload JPG, PNG, or WebP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    if (preview) {
      onImageUpload({
        id: existingImage?.id || Date.now().toString(),
        fileName: 'uploaded-image',
        dataUrl: preview,
        extractedText: '',
        confirmedByUser,
        userNotes,
      });
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setUserNotes('');
    setConfirmedByUser(false);
    if (onRemove) onRemove();
  };

  return (
    <div className={styles.container}>
      {!preview ? (
        <div 
          className={styles.dropzone}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className={styles.uploadIcon}>📸</div>
          <p>{t('image.upload') || 'Click or drag to upload image'}</p>
          <span className={styles.hint}>{t('image.supports') || 'Supports: JPG, PNG, WebP (Max 5MB)'}</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <div className={styles.imageWrapper}>
            <img src={preview} alt="Preview" className={styles.previewImage} />
            <button className={styles.removeBtn} onClick={handleRemove}>✕</button>
          </div>
          
          <div className={styles.form}>
            <label className={styles.label}>
              {t('image.notes') || 'Notes about this image'}:
              <textarea 
                className={styles.textarea}
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="E.g., Taking 1 pill every morning"
              />
            </label>
            
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={confirmedByUser} 
                onChange={(e) => setConfirmedByUser(e.target.checked)}
              />
              {t('image.addToSummary') || 'Add to health summary?'}
            </label>
            
            <button className={styles.saveBtn} onClick={handleSave}>
              {t('common.save') || 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
