import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language } from '../types/auth';
import { TRANSLATIONS } from '../data/translations';

export interface SupportedLanguageInfo {
  code: Language;
  label: string;
  nativeLabel: string;
  short: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguageInfo[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', short: 'EN' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', short: 'MR' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', short: 'HI' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', short: 'GU' }
];

export interface StatusBadgeProps {
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  dotClass: string;
  variant: 'emerald' | 'amber' | 'red' | 'blue' | 'purple' | 'slate';
}

export interface LocalizationContextType {
  language: Language;
  currentLanguage: Language; // Alias for seamless backwards compatibility
  setLanguage: (lang: Language) => void;
  setCurrentLanguage: (lang: Language) => void; // Alias for seamless backwards compatibility
  supportedLanguages: SupportedLanguageInfo[];
  t: (key: string, defaultText?: string) => string;
  getStatusLabel: (status: string | undefined | null) => string;
  getStatusBadgeProps: (status: string | undefined | null) => StatusBadgeProps;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

const STORAGE_KEY = 'pravah_preferred_language_v1';

export const LocalizationProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: Language;
}> = ({ children, initialLanguage }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLanguage) return initialLanguage;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'hi' || saved === 'mr' || saved === 'gu') {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('pravah_language', lang);
    } catch {
      // Ignore localStorage errors
    }
  };

  // Synchronize HTML lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const dict = useMemo(() => {
    return TRANSLATIONS[language] || TRANSLATIONS.en;
  }, [language]);

  const fallbackDict = TRANSLATIONS.en;

  const t = (key: string, defaultText?: string): string => {
    if (!key) return defaultText || '';
    if (dict[key]) return dict[key];
    if (fallbackDict[key]) return fallbackDict[key];
    return defaultText || key;
  };

  const getStatusLabel = (status: string | undefined | null): string => {
    if (!status) return t('status_DRAFT', 'Draft');

    // Normalize input (e.g. "Under Desk Review" -> "UNDER_DESK_REVIEW")
    const clean = status.trim();
    const normalizedKey = clean
      .replace(/[\s-]+/g, '_')
      .toUpperCase();

    // Check specific status prefixes
    const statusKey = `status_${normalizedKey}`;
    if (dict[statusKey]) return dict[statusKey];
    if (fallbackDict[statusKey]) return fallbackDict[statusKey];

    // Check direct key
    if (dict[clean]) return dict[clean];
    if (fallbackDict[clean]) return fallbackDict[clean];

    // Check standard variations
    const directStatusKey = `status_${clean.replace(/\s+/g, '_')}`;
    if (dict[directStatusKey]) return dict[directStatusKey];
    if (fallbackDict[directStatusKey]) return fallbackDict[directStatusKey];

    // Special mappings
    switch (normalizedKey) {
      case 'IN_PROGRESS':
        return t('inProgress', 'In Progress');
      case 'COMPLETED':
        return t('completed', 'Completed');
      case 'ATTENTION':
      case 'CRITICAL_BLOCKER':
        return t('status_ACTION_REQUIRED', 'Action Required');
      case 'PENDING':
        return t('status_PENDING', 'Pending');
      case 'CLEARED':
        return t('status_CLEARED', 'Cleared');
      case 'ACTIVE':
        return t('status_ACTIVE', 'Active');
      case 'EXEMPTED':
        return t('status_EXEMPTED', 'Exempted (Statutory)');
      default:
        // Format gracefully
        return clean.replace(/_/g, ' ');
    }
  };

  const getStatusBadgeProps = (status: string | undefined | null): StatusBadgeProps => {
    const label = getStatusLabel(status);
    const normalized = (status || '').trim().replace(/[\s-]+/g, '_').toUpperCase();

    switch (normalized) {
      // Success / Completed / Granted / Verified
      case 'NOC_GRANTED':
      case 'VERIFIED':
      case 'COMPLETED':
      case 'CLEARED':
      case 'FEASIBILITY_CLEARED':
      case 'LOW':
      case 'SLA_LOW':
        return {
          label,
          variant: 'emerald',
          bgClass: 'bg-emerald-50 text-emerald-800',
          borderClass: 'border-emerald-200',
          textClass: 'text-emerald-800',
          dotClass: 'bg-emerald-500'
        };

      // Review / In Progress / Blue
      case 'UNDER_DESK_REVIEW':
      case 'SUBMITTED':
      case 'IN_PROGRESS':
      case 'AI_EXTRACTED':
      case 'REQUESTED':
      case 'OFFICER_REVIEW':
        return {
          label,
          variant: 'blue',
          bgClass: 'bg-blue-50 text-blue-800',
          borderClass: 'border-blue-200',
          textClass: 'text-blue-800',
          dotClass: 'bg-blue-600'
        };

      // Ready / Scheduled / Purple
      case 'AUTOFILL_READY':
      case 'INSPECTION_SCHEDULED':
      case 'SCHEDULED':
        return {
          label,
          variant: 'purple',
          bgClass: 'bg-purple-50 text-purple-800',
          borderClass: 'border-purple-200',
          textClass: 'text-purple-800',
          dotClass: 'bg-purple-600'
        };

      // Action Required / Warning / Amber
      case 'ACTION_REQUIRED':
      case 'EVIDENCE_PENDING':
      case 'NEEDS_REVIEW':
      case 'ATTENTION':
      case 'MEDIUM':
      case 'SLA_MEDIUM':
      case 'REQUIRED':
      case 'INVESTOR_ACTION_PENDING':
        return {
          label,
          variant: 'amber',
          bgClass: 'bg-amber-50 text-amber-900',
          borderClass: 'border-amber-300',
          textClass: 'text-amber-900',
          dotClass: 'bg-amber-500'
        };

      // Critical / Breached / Conflict / Red
      case 'CONFLICT':
      case 'REJECTED':
      case 'HIGH':
      case 'SLA_HIGH':
      case 'BREACHED':
      case 'SLA_BREACHED':
      case 'CRITICAL_BLOCKER':
        return {
          label,
          variant: 'red',
          bgClass: 'bg-red-50 text-red-900',
          borderClass: 'border-red-300',
          textClass: 'text-red-900',
          dotClass: 'bg-red-500'
        };

      // Exempted / Special Teal
      case 'EXEMPTED':
        return {
          label,
          variant: 'emerald',
          bgClass: 'bg-teal-50 text-teal-800',
          borderClass: 'border-teal-200',
          textClass: 'text-teal-800',
          dotClass: 'bg-teal-500'
        };

      // Default Neutral Slate
      case 'DISCOVERED':
      case 'DRAFT':
      case 'SUPERSEDED':
      case 'EXPIRED':
      case 'OPEN':
      case 'RESOLVED':
      default:
        return {
          label,
          variant: 'slate',
          bgClass: 'bg-slate-100 text-slate-800',
          borderClass: 'border-slate-200',
          textClass: 'text-slate-700',
          dotClass: 'bg-slate-400'
        };
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        language,
        currentLanguage: language,
        setLanguage,
        setCurrentLanguage: setLanguage,
        supportedLanguages: SUPPORTED_LANGUAGES,
        t,
        getStatusLabel,
        getStatusBadgeProps
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
