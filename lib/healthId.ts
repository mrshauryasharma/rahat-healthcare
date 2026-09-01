// lib/healthId.ts — RAHAT Health ID Generator
// Generates unique health IDs in format: RAHAT-2026-XXXXXX

/**
 * Generates a unique RAHAT Health ID.
 * Format: RAHAT-YYYY-XXXXXX where YYYY is the current year
 * and XXXXXX is a random 6-character alphanumeric string.
 */
export function generateHealthId(): string {
  const year = new Date().getFullYear();
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1 to avoid confusion
  let randomPart = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomPart += characters[randomIndex];
  }

  return `RAHAT-${year}-${randomPart}`;
}

/**
 * Validates that a string looks like a RAHAT Health ID.
 */
export function isValidHealthId(id: string): boolean {
  const pattern = /^RAHAT-\d{4}-[A-Z0-9]{6}$/;
  return pattern.test(id);
}
