// app/layout.tsx — Root layout for RAHAT
// Wraps the entire app with LanguageProvider, LanguageModal, and global AI Assistant

import type { Metadata } from 'next';
import './globals.css';
import LanguageProvider from '@/components/LanguageProvider';
import LanguageModal from '@/components/LanguageModal';
import AiChatWidget from '@/components/AiChatWidget';

export const metadata: Metadata = {
  title: 'RAHAT — AI-Assisted Healthcare Support & Clinical Network',
  description:
    'RAHAT helps you describe health concerns, answer guided questions, consult verified doctors, and prepare reports. Available in English, Hindi, and Bengali.',
  keywords: ['healthcare', 'health check', 'symptoms', 'AI health', 'RAHAT', 'doctor portal', 'telemedicine'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <LanguageProvider>
          {children}
          <LanguageModal />
          <AiChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
