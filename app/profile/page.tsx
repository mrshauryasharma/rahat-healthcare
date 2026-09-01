// app/profile/page.tsx — Profile view and edit screen
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PatientHeader from '@/components/PatientHeader';
import Footer from '@/components/Footer';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/components/LanguageProvider';
import { UserProfile, Gender, BloodGroup } from '@/types/user';
import { getIntegrationMessage } from '@/lib/integrations/placeholder';
import styles from './page.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');

  // Form edit state
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    dateOfBirth: '',
    gender: '' as Gender | '',
    bloodGroup: '' as BloodGroup,
    height: '',
    weight: '',
    allergies: '',
    existingConditions: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: ''
  });

  useEffect(() => {
    const authStr = localStorage.getItem('rahat-auth');
    if (!authStr) {
      router.push('/login');
      return;
    }
    const auth = JSON.parse(authStr);
    setPhone(auth.phone);
    
    const profStr = localStorage.getItem(`rahat-profile-${auth.phone}`);
    if (profStr) {
      const prof: UserProfile = JSON.parse(profStr);
      setProfile(prof);
      setFormData({
        name: prof.name || '',
        age: prof.age ? String(prof.age) : '',
        dateOfBirth: prof.dateOfBirth || '',
        gender: prof.gender || '',
        bloodGroup: prof.bloodGroup || '',
        height: prof.height || '',
        weight: prof.weight || '',
        allergies: Array.isArray(prof.allergies) ? prof.allergies.join(', ') : '',
        existingConditions: Array.isArray(prof.existingConditions) ? prof.existingConditions.join('\n') : '',
        emergencyName: prof.emergencyContact?.name || '',
        emergencyRelation: prof.emergencyContact?.relationship || '',
        emergencyPhone: prof.emergencyContact?.phone || ''
      });
    }
    setLoading(false);
  }, [router]);

  const handleSave = () => {
    if (!phone || !profile) return;
    
    const updated: UserProfile = {
      ...profile,
      name: formData.name.trim(),
      age: formData.age ? parseInt(formData.age, 10) : null,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      height: formData.height.trim(),
      weight: formData.weight.trim(),
      allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()).filter(Boolean) : [],
      existingConditions: formData.existingConditions ? formData.existingConditions.split('\n').map(c => c.trim()).filter(Boolean) : [],
      emergencyContact: {
        name: formData.emergencyName.trim(),
        relationship: formData.emergencyRelation.trim(),
        phone: formData.emergencyPhone.trim()
      },
      profileCompleted: true
    };

    localStorage.setItem(`rahat-profile-${phone}`, JSON.stringify(updated));
    setProfile(updated);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        age: profile.age ? String(profile.age) : '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || '',
        bloodGroup: profile.bloodGroup || '',
        height: profile.height || '',
        weight: profile.weight || '',
        allergies: Array.isArray(profile.allergies) ? profile.allergies.join(', ') : '',
        existingConditions: Array.isArray(profile.existingConditions) ? profile.existingConditions.join('\n') : '',
        emergencyName: profile.emergencyContact?.name || '',
        emergencyRelation: profile.emergencyContact?.relationship || '',
        emergencyPhone: profile.emergencyContact?.phone || ''
      });
    }
    setIsEditing(false);
  };

  if (loading) return null;

  const currentHealthId = profile?.rahatHealthId || '---';

  return (
    <div className={styles.container}>
      <PatientHeader />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('profile.title') || 'Your Profile'}</h1>
          <div className={styles.headerButtons}>
            {isEditing ? (
              <>
                <button onClick={handleCancel} className={styles.btnSecondary}>
                  {t('profile.cancel') || 'Cancel'}
                </button>
                <button onClick={handleSave} className={styles.btnPrimary}>
                  {t('profile.save') || 'Save Changes'}
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className={styles.btnPrimary}>
                {t('profile.edit') || 'Edit Profile'}
              </button>
            )}
          </div>
        </div>

        {/* Health ID Section */}
        <section className={styles.section}>
          <div className={styles.healthIdBox}>
            <h2>{t('dashboard.healthId') || 'RAHAT Health ID'}</h2>
            <div className={styles.idNumber}>{currentHealthId}</div>
            <p className={styles.idSubtext}>{t('dashboard.healthIdNote')}</p>
          </div>
        </section>

        {/* Personal Information */}
        <section className={styles.section}>
          <h2>{t('profile.personal') || 'Personal Information'}</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>{t('onboarding.name') || 'Full Name'}</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.name || '-'}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>{t('login.phoneLabel') || 'Phone Number'}</label>
              <p className={styles.fieldVal}>+91 {phone || '-'}</p>
            </div>

            <div className={styles.field}>
              <label>{t('onboarding.age') || 'Age'}</label>
              {isEditing ? (
                <input 
                  type="number" 
                  value={formData.age} 
                  onChange={e => setFormData({ ...formData, age: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.age || '-'}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>{t('onboarding.dob') || 'Date of Birth'}</label>
              {isEditing ? (
                <input 
                  type="date" 
                  value={formData.dateOfBirth} 
                  onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.dateOfBirth || '-'}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>{t('onboarding.gender') || 'Gender'}</label>
              {isEditing ? (
                <select 
                  value={formData.gender} 
                  onChange={e => setFormData({ ...formData, gender: e.target.value as Gender | '' })}
                  className={styles.input}
                >
                  <option value="">-- Select --</option>
                  <option value="male">{t('onboarding.male') || 'Male'}</option>
                  <option value="female">{t('onboarding.female') || 'Female'}</option>
                  <option value="other">{t('onboarding.other') || 'Other'}</option>
                  <option value="prefer-not-to-say">{t('onboarding.preferNotToSay') || 'Prefer not to say'}</option>
                </select>
              ) : (
                <p className={styles.fieldVal}>{profile?.gender || '-'}</p>
              )}
            </div>
          </div>
        </section>

        {/* Health Information */}
        <section className={styles.section}>
          <h2>{t('profile.health') || 'Health Information'}</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>{t('onboarding.bloodGroup') || 'Blood Group'}</label>
              {isEditing ? (
                <select 
                  value={formData.bloodGroup} 
                  onChange={e => setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })}
                  className={styles.input}
                >
                  <option value="">-- Select --</option>
                  <option value="A+">A+</option><option value="A-">A-</option>
                  <option value="B+">B+</option><option value="B-">B-</option>
                  <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  <option value="O+">O+</option><option value="O-">O-</option>
                </select>
              ) : (
                <p className={styles.fieldVal}>{profile?.bloodGroup || '-'}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>{t('onboarding.height') || 'Height (cm)'}</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.height} 
                  onChange={e => setFormData({ ...formData, height: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.height ? `${profile.height} cm` : '-'}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>{t('onboarding.weight') || 'Weight (kg)'}</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.weight} 
                  onChange={e => setFormData({ ...formData, weight: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.weight ? `${profile.weight} kg` : '-'}</p>
              )}
            </div>

            <div className={styles.fieldFull}>
              <label>{t('onboarding.allergies') || 'Allergies'}</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.allergies} 
                  onChange={e => setFormData({ ...formData, allergies: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.allergies?.length ? profile.allergies.join(', ') : 'None listed'}</p>
              )}
            </div>

            <div className={styles.fieldFull}>
              <label>{t('onboarding.conditions') || 'Existing Medical Conditions'}</label>
              {isEditing ? (
                <textarea 
                  value={formData.existingConditions} 
                  onChange={e => setFormData({ ...formData, existingConditions: e.target.value })} 
                  className={styles.textarea} 
                  rows={2}
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.existingConditions?.length ? profile.existingConditions.join(', ') : 'None listed'}</p>
              )}
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className={styles.section}>
          <h2>{t('profile.emergency') || 'Emergency Contact'}</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>{t('onboarding.emergencyName') || 'Contact Name'}</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.emergencyName} 
                  onChange={e => setFormData({ ...formData, emergencyName: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.emergencyContact?.name || '-'}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>{t('onboarding.emergencyRelation') || 'Relationship'}</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.emergencyRelation} 
                  onChange={e => setFormData({ ...formData, emergencyRelation: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.emergencyContact?.relationship || '-'}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>{t('onboarding.emergencyPhone') || 'Contact Phone'}</label>
              {isEditing ? (
                <input 
                  type="tel" 
                  value={formData.emergencyPhone} 
                  onChange={e => setFormData({ ...formData, emergencyPhone: e.target.value })} 
                  className={styles.input} 
                />
              ) : (
                <p className={styles.fieldVal}>{profile?.emergencyContact?.phone || '-'}</p>
              )}
            </div>
          </div>
        </section>

        {/* Language Preference */}
        <section className={styles.section}>
          <h2>{t('profile.languagePref') || 'Language Preference'}</h2>
          <div className={styles.langSelectorWrap}>
            <LanguageSelector />
          </div>
        </section>

        {/* Official Integrations Section */}
        <section className={styles.section}>
          <h2>{t('integration.title') || 'Official Integrations'}</h2>
          <div className={styles.integrationNotice}>
            <p>🏛️ {getIntegrationMessage(language)}</p>
          </div>
        </section>

        {/* Privacy Note */}
        <div className={styles.privacyNote}>
          <p>🔒 {t('profile.privacyInfo') || 'Your information is stored locally on your device and is not shared without your consent.'}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
