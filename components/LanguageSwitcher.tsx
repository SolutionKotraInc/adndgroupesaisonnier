"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          language === 'fr'
            ? 'bg-emerald-600 text-white'
            : 'bg-white/10 text-gray-700 hover:bg-white/20'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-emerald-600 text-white'
            : 'bg-white/10 text-gray-700 hover:bg-white/20'
        }`}
      >
        EN
      </button>
    </div>
  );
}
