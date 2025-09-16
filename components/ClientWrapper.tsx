"use client";

import { ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
