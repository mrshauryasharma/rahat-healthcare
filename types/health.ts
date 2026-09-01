// types/health.ts — Health-related TypeScript types for RAHAT

import { Language } from './user';

// Multi-language text helper
export interface TranslatedText {
  en: string;
  hi: string;
  bn: string;
}

// Common health concern / symptom category
export interface HealthConcern {
  id: string;
  name: TranslatedText;
  icon: string; // Emoji or icon name
  description: TranslatedText;
}

// Single MCQ question option
export interface AnswerOption {
  id: string;
  text: TranslatedText;
  // If selecting this option triggers follow-up questions
  nextQuestionId?: string;
  // If this option is a red flag / emergency warning
  isWarning?: boolean;
}

// Condition for showing follow-up questions
export interface FollowUpCondition {
  questionId: string;
  selectedOptionId: string;
}

// MCQ Health Question
export interface HealthQuestion {
  id: string;
  concernId: string;
  order: number;
  text: TranslatedText;
  options: AnswerOption[];
  // If this is a base question (shown to all) or adaptive (shown on condition)
  isBaseQuestion?: boolean;
  // Condition required to show this question (for adaptive flow)
  condition?: FollowUpCondition;
  followUpConditions?: any[];
  // Can user skip this question?
  isRequired: boolean;
  // Help text or explanation
  helpText?: TranslatedText;
}

// User's answer to a question
export interface UserAnswer {
  questionId: string;
  questionText: string;
  selectedOptionId: string;
  selectedOptionText: string;
  isWarning?: boolean;
}

// Uploaded medicine / prescription image
export interface UploadedImage {
  id: string;
  fileName: string;
  dataUrl: string; // Base64 image data for localStorage
  extractedText?: string;
  confirmedByUser: boolean;
  userNotes?: string;
}

// Full health check assessment record
export interface HealthAssessment {
  id: string;
  rahatHealthId: string;
  concernId: string;
  concernName: string;
  answers: UserAnswer[];
  images: UploadedImage[];
  duration: string;
  additionalNotes: string;
  createdAt: string; // ISO date string
  language: Language;
  reportGenerated: boolean;
}

// 3-version generated health report
export interface HealthReport {
  assessmentId: string;
  userVersion: ReportContent;
  doctorVersion: ReportContent;
  englishVersion: ReportContent;
  generatedAt: string;
  rahatHealthId: string;
  disclaimer: string;
}

// Content of a single report version
export interface ReportContent {
  title: string;
  language: Language | 'clinical';
  mainConcern: string;
  reportedSymptoms: string[];
  duration: string;
  relevantAnswers: { question: string; answer: string }[];
  medicinesMentioned: string[];
  imageNotes: string[];
  importantNotes: string[];
  nextSteps: string[];
}

// Prescription item written by a doctor
export interface PrescriptionMedicine {
  id: string;
  medicineName: string;
  dosage: string; // e.g., "500mg"
  frequency: string; // e.g., "1-0-1 (Morning & Night)"
  duration: string; // e.g., "5 days"
  instructions: string; // e.g., "After food"
}

// Digital Prescription Record
export interface DigitalPrescription {
  id: string;
  prescriptionNumber: string; // e.g., "RX-2026-98124"
  rahatHealthId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorRegNumber: string;
  hospitalName: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  clinicalNotes: string;
  followUpDate?: string;
  issuedAt: string;
}

// Appointment booking
export interface Appointment {
  id: string;
  rahatHealthId: string;
  patientName?: string;
  specialty: string;
  doctorId?: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  consultationNotes?: string;
  createdAt: string;
}

// History item for the history page
export interface HealthHistoryItem {
  id: string;
  date: string;
  concernName: string;
  shortSummary: string;
  reportGenerated: boolean;
}

// AI Chatbot Message
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  isEmergency?: boolean;
  suggestedAction?: 'start-assessment' | 'book-doctor' | 'none';
}
