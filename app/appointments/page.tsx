'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PatientHeader from '@/components/PatientHeader';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';
import { useLanguage } from '@/components/LanguageProvider';
import styles from './page.module.css';

export default function Appointments() {
  const router = useRouter();
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    specialty: 'General Physician',
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    const authStr = localStorage.getItem('rahat-auth');
    if (!authStr) {
      router.push('/login');
      return;
    }
    const auth = JSON.parse(authStr);
    
    const profStr = localStorage.getItem(`rahat-profile-${auth.phone}`);
    if (profStr) {
      const prof = JSON.parse(profStr);
      setProfile(prof);
      const healthId = prof.rahatHealthId || prof.healthId;
      if (healthId) {
        const apptStr = localStorage.getItem(`rahat-appointments-${healthId}`);
        if (apptStr) {
          setAppointments(JSON.parse(apptStr));
        }
      }
    }
    setLoading(false);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const healthId = profile?.rahatHealthId || profile?.healthId;
    if (!healthId) return;

    const newAppt = {
      id: Date.now().toString(),
      ...formData,
      status: 'scheduled'
    };

    const updated = [...appointments, newAppt];
    setAppointments(updated);
    localStorage.setItem(`rahat-appointments-${healthId}`, JSON.stringify(updated));
    setShowForm(false);
    setFormData({ specialty: 'General Physician', date: '', time: '', reason: '' });
    alert('Appointment scheduled successfully!');
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (loading) return null;

  return (
    <div className={styles.container}>
      <PatientHeader />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('appointments.title') || 'Appointments'}</h1>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className={styles.btnPrimary}>
              {t('appointments.book') || 'Book Appointment'}
            </button>
          )}
        </div>

        <div className={styles.notice}>
          <p>{t('appointments.comingSoon') || 'Doctor profiles and online booking will be available soon.'}</p>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.formCard}>
            <h2>{t('appointments.book') || 'New Booking'}</h2>
            
            <div className={styles.formGroup}>
              <label>{t('appointments.specialty') || 'Specialty'}</label>
              <select 
                value={formData.specialty} 
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                required
                className={styles.input}
              >
                <option value="General Physician">General Physician</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="ENT">ENT</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>{t('appointments.doctor') || 'Doctor'}</label>
              <select disabled className={styles.input}>
                <option>{t('appointments.comingSoon') || 'Any available doctor'}</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>{t('appointments.date') || 'Date'}</label>
                <input 
                  type="date" 
                  min={getMinDate()}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>{t('appointments.time') || 'Time'}</label>
                <input 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>{t('appointments.reason') || 'Reason for consultation'}</label>
              <textarea 
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                rows={3}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" onClick={() => setShowForm(false)} className={styles.btnSecondary}>
                {t('common.cancel') || 'Cancel'}
              </button>
              <button type="submit" className={styles.btnPrimary}>
                {t('common.confirm') || 'Confirm Booking'}
              </button>
            </div>
          </form>
        )}

        {!showForm && appointments.length === 0 ? (
          <EmptyState 
            icon="📅"
            title={t('appointments.title') || 'Appointments'}
            message={t('appointments.empty') || 'You have no scheduled appointments.'} 
            actionLabel={t('appointments.book') || 'Book Appointment'}
            onAction={() => setShowForm(true)}
          />
        ) : (
          !showForm && (
            <div className={styles.list}>
              {appointments.map(appt => (
                <div key={appt.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3>{appt.specialty}</h3>
                    <span className={styles.statusBadge}>{appt.status}</span>
                  </div>
                  <div className={styles.cardDetails}>
                    <p><strong>{t('appointments.date') || 'Date'}:</strong> {appt.date}</p>
                    <p><strong>{t('appointments.time') || 'Time'}:</strong> {appt.time}</p>
                    <p><strong>{t('appointments.reason') || 'Reason'}:</strong> {appt.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
