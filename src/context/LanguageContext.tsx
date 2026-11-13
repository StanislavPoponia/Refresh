import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { en } from '../i18n/en';
import { uk } from '../i18n/uk';
import type { Dictionary } from '../i18n/uk';

export type Language = 'uk' | 'en';

const STORAGE_KEY = 'refche-lang';
const dictionaries: Record<Language, Dictionary> = { uk, en };

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Словник поточної мови */
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Початкова мова: збережена вибором користувача, інакше українська (основна). */
function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'uk' || saved === 'en') return saved;
  } catch {
    /* сховище недоступне — беремо українську */
  }
  return 'uk';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const t = dictionaries[lang];

  // Мова сторінки, заголовок вкладки й опис для пошуковиків
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* не критично */
    }
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage потрібно викликати всередині LanguageProvider');
  return ctx;
}

/** Підставляє значення у шаблон: format('Привіт, {name}', { name: 'світ' }). */
export function format(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
}
