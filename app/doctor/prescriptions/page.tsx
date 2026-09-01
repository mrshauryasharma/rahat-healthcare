// app/doctor/prescriptions/page.tsx — Digital Prescription (Rx) Generator
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DoctorHeader from '@/components/DoctorHeader';
import Footer from '@/components/Footer';
import { useLanguage } from '@/components/LanguageProvider';
import { DoctorAuthState } from '@/types/user';
import { PrescriptionMedicine, DigitalPrescription } from '@/types/health';
import styles from './page.module.css';

export default function DoctorPrescriptionsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [doctor, setDoctor] = useState<DoctorAuthState | null>(null);

  // Form State
  const [patientHealthId, setPatientHealthId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    { id: '1', medicineName: '', dosage: '500mg', frequency: '1-0-1 (Morning & Night)', duration: '5 Days', instructions: 'After meals' }
  ]);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [issuedPrescription, setIssuedPrescription] = useState<DigitalPrescription | null>(null);

  useEffect(() => {
    const authStr = localStorage.getItem('rahat-doctor-auth');
    if (!authStr) {
      router.push('/doctor/login');
      return;
    }
    setDoctor(JSON.parse(authStr));

    // Check if healthId was passed in query
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const hid = params.get('healthId');
      if (hid) {
        setPatientHealthId(hid);
      }
    }
  }, [router]);

  const handleAddMedicine = () => {
    setMedicines(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        medicineName: '',
        dosage: '500mg',
        frequency: '1-0-1 (Morning & Night)',
        duration: '5 Days',
        instructions: 'After meals'
      }
    ]);
  };

  const handleRemoveMedicine = (id: string) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
  };

  const handleMedicineChange = (id: string, field: keyof PrescriptionMedicine, val: string) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, [field]: val } : m));
  };

  const handleIssueRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor || !patientHealthId.trim() || !diagnosis.trim()) {
      alert('Please fill in Patient Health ID and Diagnosis.');
      return;
    }

    const rx: DigitalPrescription = {
      id: Date.now().toString(),
      prescriptionNumber: `RX-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      rahatHealthId: patientHealthId.trim().toUpperCase(),
      patientName: patientName.trim() || 'Patient',
      doctorId: doctor.doctorId,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      doctorRegNumber: doctor.regNumber,
      hospitalName: 'RAHAT Telehealth & Clinical Network',
      diagnosis: diagnosis.trim(),
      medicines: medicines.filter(m => m.medicineName.trim()),
      clinicalNotes: clinicalNotes.trim(),
      followUpDate,
      issuedAt: new Date().toISOString()
    };

    // Save to localStorage for patient retrieval
    try {
      const existingStr = localStorage.getItem(`rahat-prescriptions-${rx.rahatHealthId}`);
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem(`rahat-prescriptions-${rx.rahatHealthId}`, JSON.stringify([...existing, rx]));
    } catch (e) {
      // Safe storage
    }

    setIssuedPrescription(rx);
  };

  const handlePrint = () => {
    if (!issuedPrescription) return;

    const printHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Digital Prescription - ${issuedPrescription.prescriptionNumber}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1a2b3c; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0088cc; padding-bottom: 16px; margin-bottom: 24px; }
    .doc-name { font-size: 20px; font-weight: bold; color: #0088cc; }
    .doc-meta { font-size: 13px; color: #5a6b7c; }
    .rx-num { font-size: 14px; font-weight: bold; color: #0088cc; }
    .patient-box { background: #f8fafc; padding: 14px 18px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px; display: flex; justify-content: space-between; }
    .rx-symbol { font-size: 28px; font-weight: bold; color: #0088cc; margin-bottom: 12px; }
    .med-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .med-table th, .med-table td { padding: 10px 14px; border: 1px solid #e2e8f0; text-align: left; font-size: 14px; }
    .med-table th { background: #f0f7f7; color: #1a2b3c; font-weight: 600; }
    .notes-box { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 16px; margin-bottom: 30px; font-size: 14px; }
    .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    .stamp { border: 2px dashed #0088cc; padding: 10px 16px; border-radius: 6px; text-align: center; color: #0088cc; font-size: 12px; font-weight: bold; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="doc-name">${issuedPrescription.doctorName}</div>
      <div class="doc-meta">${issuedPrescription.doctorSpecialty} • Reg: ${issuedPrescription.doctorRegNumber}</div>
      <div class="doc-meta">${issuedPrescription.hospitalName}</div>
    </div>
    <div style="text-align: right;">
      <div class="rx-num">${issuedPrescription.prescriptionNumber}</div>
      <div class="doc-meta">Date: ${new Date(issuedPrescription.issuedAt).toLocaleDateString()}</div>
    </div>
  </div>

  <div class="patient-box">
    <div><strong>Patient:</strong> ${issuedPrescription.patientName}</div>
    <div><strong>Health ID:</strong> ${issuedPrescription.rahatHealthId}</div>
    <div><strong>Diagnosis:</strong> ${issuedPrescription.diagnosis}</div>
  </div>

  <div class="rx-symbol">℞</div>

  <table class="med-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Medication</th>
        <th>Dosage</th>
        <th>Frequency</th>
        <th>Duration</th>
        <th>Instructions</th>
      </tr>
    </thead>
    <tbody>
      ${issuedPrescription.medicines.map((m, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td><strong>${m.medicineName}</strong></td>
          <td>${m.dosage}</td>
          <td>${m.frequency}</td>
          <td>${m.duration}</td>
          <td>${m.instructions}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  ${issuedPrescription.clinicalNotes ? `
    <div class="notes-box">
      <strong>Clinical Advice:</strong> ${issuedPrescription.clinicalNotes}
    </div>
  ` : ''}

  ${issuedPrescription.followUpDate ? `
    <p><strong>Follow-up Scheduled:</strong> ${issuedPrescription.followUpDate}</p>
  ` : ''}

  <div class="footer">
    <div style="font-size: 11px; color: #94a3b8;">
      Digitally Authenticated by RAHAT Health Platform<br>
      This digital prescription is valid under the Telemedicine Practice Guidelines.
    </div>
    <div class="stamp">
      VERIFIED CLINICAL RX<br>
      ${issuedPrescription.doctorName}
    </div>
  </div>
</body>
</html>`;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(printHtml);
      printWin.document.close();
      setTimeout(() => printWin.print(), 350);
    }
  };

  if (!doctor) return null;

  return (
    <div className={styles.container}>
      <DoctorHeader />
      <main className={styles.main}>
        <div className={styles.topNav}>
          <Link href="/doctor/dashboard" className={styles.backBtn}>
            ← Back to Doctor Dashboard
          </Link>
        </div>

        <div className={styles.formCard}>
          <div className={styles.rxHeader}>
            <div className={styles.rxIcon}>℞</div>
            <div>
              <h1 className={styles.title}>{t('doctor.rxTitle') || 'Digital Prescription Generator (Rx)'}</h1>
              <p className={styles.subtitle}>Issuing Doctor: <strong>{doctor.name}</strong> ({doctor.specialty})</p>
            </div>
          </div>

          {!issuedPrescription ? (
            <form onSubmit={handleIssueRx} className={styles.form}>
              {/* Patient Meta */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Patient RAHAT Health ID *</label>
                  <input
                    type="text"
                    value={patientHealthId}
                    onChange={(e) => setPatientHealthId(e.target.value)}
                    placeholder="e.g. RAHAT-2026-AV8912"
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Patient Full Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Amit Verma"
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Diagnosis */}
              <div className={styles.field}>
                <label>{t('doctor.diagnosis') || 'Clinical Diagnosis / Observations *'}</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Acute Viral Pharyngitis with Mild Pyrexia"
                  className={styles.input}
                  required
                />
              </div>

              {/* Medicines List */}
              <div className={styles.medSection}>
                <div className={styles.medSectionHeader}>
                  <h3>Prescribed Medications</h3>
                  <button type="button" onClick={handleAddMedicine} className={styles.addMedBtn}>
                    {t('doctor.addMedicine') || '+ Add Medicine'}
                  </button>
                </div>

                {medicines.map((m, idx) => (
                  <div key={m.id} className={styles.medRow}>
                    <div className={styles.medNum}>{idx + 1}</div>
                    <input
                      type="text"
                      value={m.medicineName}
                      onChange={(e) => handleMedicineChange(m.id, 'medicineName', e.target.value)}
                      placeholder="Medicine Name (e.g. Tab Paracetamol)"
                      className={styles.medNameInput}
                      required
                    />
                    <input
                      type="text"
                      value={m.dosage}
                      onChange={(e) => handleMedicineChange(m.id, 'dosage', e.target.value)}
                      placeholder="Dosage (500mg)"
                      className={styles.medInput}
                    />
                    <select
                      value={m.frequency}
                      onChange={(e) => handleMedicineChange(m.id, 'frequency', e.target.value)}
                      className={styles.medSelect}
                    >
                      <option value="1-0-1 (Morning & Night)">1-0-1 (Morning & Night)</option>
                      <option value="1-1-1 (Thrice Daily)">1-1-1 (Thrice Daily)</option>
                      <option value="1-0-0 (Morning Only)">1-0-0 (Morning Only)</option>
                      <option value="0-0-1 (Night Only)">0-0-1 (Night Only)</option>
                      <option value="PRN (As Needed)">PRN (As Needed)</option>
                    </select>
                    <input
                      type="text"
                      value={m.duration}
                      onChange={(e) => handleMedicineChange(m.id, 'duration', e.target.value)}
                      placeholder="Duration (5 Days)"
                      className={styles.medInputSmall}
                    />
                    <input
                      type="text"
                      value={m.instructions}
                      onChange={(e) => handleMedicineChange(m.id, 'instructions', e.target.value)}
                      placeholder="Instructions (After food)"
                      className={styles.medInput}
                    />
                    {medicines.length > 1 && (
                      <button type="button" onClick={() => handleRemoveMedicine(m.id)} className={styles.removeMedBtn}>
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Notes and Follow-up */}
              <div className={styles.row}>
                <div className={styles.fieldFlex}>
                  <label>Clinical Advice & Dietary Instructions</label>
                  <textarea
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="e.g. Warm water gargles twice daily, maintain hydration..."
                    className={styles.textarea}
                    rows={3}
                  />
                </div>
                <div className={styles.field}>
                  <label>Follow-up Date (Optional)</label>
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <button type="submit" className={styles.issueBtn}>
                🔐 {t('doctor.issueRx') || 'Sign & Issue Digital Prescription'}
              </button>
            </form>
          ) : (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h2>Prescription Successfully Issued!</h2>
              <p>Prescription Number: <strong>{issuedPrescription.prescriptionNumber}</strong> for Patient <strong>{issuedPrescription.rahatHealthId}</strong></p>

              <div className={styles.successActions}>
                <button onClick={handlePrint} className={styles.printBtn}>
                  🖨️ Print / Download Official Rx
                </button>
                <button onClick={() => { setIssuedPrescription(null); setPatientHealthId(''); setDiagnosis(''); }} className={styles.newRxBtn}>
                  ✍️ Write Another Prescription
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
