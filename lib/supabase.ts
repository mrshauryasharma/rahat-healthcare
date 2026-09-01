// lib/supabase.ts — Supabase client setup for RAHAT
// Falls back gracefully if Supabase is not configured

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read Supabase config from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
export const isSupabaseConfigured =
  supabaseUrl !== '' &&
  supabaseUrl !== 'your-supabase-url-here' &&
  supabaseAnonKey !== '' &&
  supabaseAnonKey !== 'your-supabase-anon-key-here';

// Create Supabase client (or a dummy one if not configured)
let supabase: SupabaseClient;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a dummy client that won't actually connect
  // The app will use localStorage in demo mode
  supabase = createClient(
    'https://placeholder.supabase.co',
    'placeholder-key'
  );
}

export { supabase };

/**
 * Send OTP to a phone number via Supabase Auth.
 * In demo mode, this just returns success without sending anything.
 */
export async function sendOtp(phone: string): Promise<{ success: boolean; error?: string }> {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (isDemoMode || !isSupabaseConfigured) {
    // In demo mode, pretend the OTP was sent
    console.log('[DEMO] OTP "sent" to', phone);
    return { success: true };
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone: `+91${phone}`,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to send OTP. Please try again.' };
  }
}

/**
 * Verify an OTP code.
 * In demo mode, accepts the demo OTP code.
 */
export async function verifyOtp(
  phone: string,
  otpCode: string
): Promise<{ success: boolean; error?: string }> {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
  const demoOtp = process.env.NEXT_PUBLIC_DEMO_OTP || '123456';

  if (isDemoMode || !isSupabaseConfigured) {
    // In demo mode, accept the demo OTP
    if (otpCode === demoOtp) {
      return { success: true };
    }
    return { success: false, error: 'Invalid OTP. Try ' + demoOtp + ' in demo mode.' };
  }

  try {
    const { error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token: otpCode,
      type: 'sms',
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to verify OTP. Please try again.' };
  }
}
