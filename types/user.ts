// types/user.ts — User, Doctor, and Admin TypeScript types for RAHAT

export type Language = 'en' | 'hi' | 'bn';

export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | '';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface UserProfile {
  phone: string;
  rahatHealthId: string;
  name: string;
  age: number | null;
  dateOfBirth: string; // ISO date string
  gender: Gender | '';
  bloodGroup: BloodGroup;
  height: string; // e.g. "170 cm"
  weight: string; // e.g. "65 kg"
  allergies: string[];
  existingConditions: string[];
  emergencyContact: EmergencyContact;
  language: Language;
  profileCompleted: boolean;
  createdAt: string; // ISO date string
}

// Doctor Profile
export interface DoctorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  regNumber: string; // Medical Council Registration Number
  specialty: string;
  qualification: string;
  experienceYears: number;
  hospitalAffiliation: string;
  consultationFee: number;
  isVerified: boolean;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  createdAt: string;
}

// What we store in localStorage / auth state
export interface AuthState {
  isLoggedIn: boolean;
  phone: string;
  userId: string; // same as rahatHealthId
  role?: 'patient' | 'doctor' | 'admin';
}

export interface DoctorAuthState {
  isLoggedIn: boolean;
  doctorId: string;
  name: string;
  specialty: string;
  regNumber: string;
}

export interface AdminAuthState {
  isLoggedIn: boolean;
  adminId: string;
  email: string;
  role: 'superadmin' | 'moderator';
}

// Default empty profile for new users
export function createEmptyProfile(phone: string, healthId: string): UserProfile {
  return {
    phone,
    rahatHealthId: healthId,
    name: '',
    age: null,
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    height: '',
    weight: '',
    allergies: [],
    existingConditions: [],
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    language: 'en',
    profileCompleted: false,
    createdAt: new Date().toISOString(),
  };
}
