// lib/reportGenerator.ts — Report Generator for RAHAT
// Generates printable/downloadable health reports

import { HealthAssessment, HealthReport, ReportContent } from '@/types/health';
import { UserProfile, Language } from '@/types/user';
import {
  generateUserSummary,
  generateDoctorSummary,
  generateEnglishSummary,
  getDisclaimer,
} from './ai';

/**
 * Generate a complete 3-version health report from an assessment.
 */
export async function generateReport(
  assessment: HealthAssessment,
  profile: UserProfile
): Promise<HealthReport> {
  const language = assessment.language || profile.language || 'en';

  // Generate all 3 versions
  const [userVersion, doctorVersion, englishVersion] = await Promise.all([
    generateUserSummary(
      assessment.concernName,
      assessment.answers,
      assessment.images,
      language,
      assessment.additionalNotes
    ),
    generateDoctorSummary(
      assessment.concernName,
      assessment.answers,
      assessment.images,
      assessment.additionalNotes
    ),
    generateEnglishSummary(
      assessment.concernName,
      assessment.answers,
      assessment.images,
      assessment.additionalNotes
    ),
  ]);

  return {
    assessmentId: assessment.id,
    userVersion,
    doctorVersion,
    englishVersion,
    generatedAt: new Date().toISOString(),
    rahatHealthId: profile.rahatHealthId,
    disclaimer: getDisclaimer(language),
  };
}

/**
 * Generate a printable HTML string from a report.
 * This can be used with window.print() or saved as HTML.
 */
export function generatePrintableHtml(
  report: HealthReport,
  version: 'user' | 'doctor' | 'english',
  profile: UserProfile
): string {
  const content =
    version === 'user'
      ? report.userVersion
      : version === 'doctor'
      ? report.doctorVersion
      : report.englishVersion;

  const date = new Date(report.generatedAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="${content.language === 'clinical' ? 'en' : content.language}">
<head>
  <meta charset="UTF-8">
  <title>${content.title} - RAHAT</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      color: #1a2b3c;
      line-height: 1.6;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #00b4d8;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
    .logo-text {
      font-size: 22px;
      font-weight: 700;
      color: #0088cc;
      margin: 0;
    }
    .health-id {
      font-size: 13px;
      color: #5a6b7c;
      font-weight: 600;
    }
    .patient-meta {
      font-size: 13px;
      color: #5a6b7c;
      text-align: right;
    }
    h1 {
      font-size: 20px;
      color: #1a2b3c;
      margin-bottom: 6px;
    }
    h2 {
      font-size: 15px;
      color: #0088cc;
      margin-top: 20px;
      margin-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 4px;
    }
    .concern-badge {
      display: inline-block;
      font-size: 16px;
      font-weight: 600;
      color: #0088cc;
      background: #f0f9ff;
      padding: 6px 14px;
      border-radius: 6px;
      border: 1px solid #bae6fd;
      margin-bottom: 14px;
    }
    ul {
      padding-left: 20px;
      margin: 6px 0;
    }
    li {
      margin-bottom: 4px;
    }
    .qa-item {
      background: #f8fafc;
      padding: 6px 12px;
      border-radius: 4px;
      margin-bottom: 6px;
      border: 1px solid #e2e8f0;
      font-size: 14px;
    }
    .qa-item strong {
      color: #1a2b3c;
    }
    .warning {
      background: #fef3cd;
      border-left: 4px solid #f59e0b;
      padding: 10px 14px;
      margin: 14px 0;
      border-radius: 4px;
    }
    .disclaimer {
      margin-top: 28px;
      padding: 12px 16px;
      background: #f8fafc;
      border-radius: 6px;
      font-size: 12px;
      color: #5a6b7c;
      border: 1px solid #e2e8f0;
    }
    .footer {
      margin-top: 24px;
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
    }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <img src="/logo.png" alt="RAHAT Logo" class="logo-img" />
      <div>
        <div class="logo-text">RAHAT</div>
        <div class="health-id">Health ID: ${report.rahatHealthId}</div>
      </div>
    </div>
    <div class="patient-meta">
      <div><strong>Date:</strong> ${date}</div>
      ${profile.name ? `<div><strong>Patient:</strong> ${profile.name}</div>` : ''}
      ${profile.age ? `<div><strong>Age:</strong> ${profile.age} yrs</div>` : ''}
      ${profile.gender ? `<div><strong>Gender:</strong> ${profile.gender}</div>` : ''}
    </div>
  </div>

  <h1>${content.title}</h1>
  ${version === 'doctor' ? '<p style="color: #5a6b7c; font-size: 13px; margin-top: -4px;"><em>AI-assisted patient summary &mdash; Not a clinical diagnosis</em></p>' : ''}

  <div class="concern-badge">Main Concern: ${content.mainConcern}</div>

  ${content.duration ? `<h2>${version === 'doctor' ? 'Duration' : content.language === 'hi' ? 'अवधि' : content.language === 'bn' ? 'সময়কাল' : 'Duration'}</h2><p>${content.duration}</p>` : ''}

  <h2>${version === 'doctor' ? 'Reported Symptoms' : content.language === 'hi' ? 'रिपोर्ट किए गए लक्षण' : content.language === 'bn' ? 'রিপোর্ট করা লক্ষণ' : 'Reported Symptoms'}</h2>
  <ul>
    ${content.reportedSymptoms.map((s) => `<li>${s}</li>`).join('\n    ')}
  </ul>

  <h2>${version === 'doctor' ? 'Relevant Responses' : content.language === 'hi' ? 'प्रासंगिक उत्तर' : content.language === 'bn' ? 'প্রাসঙ্গিক উত্তর' : 'Relevant Responses'}</h2>
  ${content.relevantAnswers.map((qa) => `<div class="qa-item"><strong>${qa.question}:</strong> ${qa.answer}</div>`).join('\n  ')}

  ${content.medicinesMentioned.length > 0 ? `
  <h2>${version === 'doctor' ? 'Medications Mentioned' : content.language === 'hi' ? 'उल्लेखित दवाइयाँ' : content.language === 'bn' ? 'উল্লিখিত ওষুধ' : 'Medicines Mentioned'}</h2>
  <ul>
    ${content.medicinesMentioned.map((m) => `<li>${m}</li>`).join('\n    ')}
  </ul>` : ''}

  ${content.importantNotes.length > 0 ? `
  <div class="warning">
    <h2 style="margin-top: 0; border: none; color: #b45309;">⚠️ ${version === 'doctor' ? 'Important Notes' : content.language === 'hi' ? 'महत्वपूर्ण नोट्स' : content.language === 'bn' ? 'গুরুত্বপূর্ণ নোট' : 'Important Notes'}</h2>
    <ul>
      ${content.importantNotes.map((n) => `<li>${n}</li>`).join('\n      ')}
    </ul>
  </div>` : ''}

  <h2>${version === 'doctor' ? 'Recommended Next Steps' : content.language === 'hi' ? 'अगले कदम' : content.language === 'bn' ? 'পরবর্তী পদক্ষেপ' : 'Next Steps'}</h2>
  <ul>
    ${content.nextSteps.map((s) => `<li>${s}</li>`).join('\n    ')}
  </ul>

  <div class="disclaimer">
    <strong>Disclaimer:</strong> ${report.disclaimer}
  </div>

  <div class="footer">
    RAHAT Health Platform &mdash; Generated on ${date}<br>
    This document is an AI-assisted informational summary and does not constitute certified clinical diagnosis.
  </div>
</body>
</html>`;
}

/**
 * Trigger a print/download dialog for a report.
 */
export function downloadReport(
  report: HealthReport,
  version: 'user' | 'doctor' | 'english',
  profile: UserProfile
): void {
  const html = generatePrintableHtml(report, version, profile);

  // Open in a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    // Give time for styles to load, then trigger print
    setTimeout(() => {
      printWindow.print();
    }, 400);
  }
}
