// lib/integrations/placeholder.ts — Future Integration Placeholder
// This module contains placeholder structures for future official integrations.
// No real government or third-party APIs are connected.

/**
 * Integration Status
 * Tracks which official integrations are available.
 * All are disabled by default until proper authorization and API access is granted.
 */
export interface IntegrationStatus {
  governmentHealthService: boolean;
  verifiedIdentityService: boolean;
  healthRecordsService: boolean;
}

// All integrations are disabled by default
export const integrationStatus: IntegrationStatus = {
  governmentHealthService: false,
  verifiedIdentityService: false,
  healthRecordsService: false,
};

/**
 * Check if any official integration is currently active.
 * Returns false in the current version — all integrations are placeholders.
 */
export function isAnyIntegrationActive(): boolean {
  return Object.values(integrationStatus).some((v) => v);
}

/**
 * Get a user-friendly message about integration status.
 */
export function getIntegrationMessage(language: 'en' | 'hi' | 'bn'): string {
  const messages = {
    en: 'Official health service integrations may be connected after proper authorization and API access.',
    hi: 'उचित प्राधिकरण और API पहुंच के बाद आधिकारिक स्वास्थ्य सेवा एकीकरण जोड़ा जा सकता है।',
    bn: 'যথাযথ অনুমোদন এবং API অ্যাক্সেসের পরে অফিসিয়াল স্বাস্থ্য পরিষেবা ইন্টিগ্রেশন সংযুক্ত করা যেতে পারে।',
  };
  return messages[language] || messages.en;
}
