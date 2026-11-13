import clsx from 'clsx';
import { Flame, Snowflake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './LanguageSwitch.module.css';

const OPTIONS: { value: Language; short: string }[] = [
  { value: 'uk', short: 'UA' },
  { value: 'en', short: 'EN' },
];

/**
 * Невеликий перемикач мови UA / EN. При наведенні трохи збільшується, а біля вибраної
 * мови з'являється сніжинка (світла тема) або вогник (темна) — кольори беруться з теми.
 */
export function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();
  const { theme } = useTheme();
  const Icon = theme === 'dark' ? Flame : Snowflake;

  return (
    <div
      role="radiogroup"
      aria-label={t.language.label}
      className={clsx(styles.switch, lang === 'en' && styles.second)}
    >
      <span className={styles.thumb} aria-hidden="true">
        <Icon className={styles.badge} size={12} aria-hidden="true" />
      </span>
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          lang={option.value}
          aria-checked={lang === option.value}
          aria-label={t.language[option.value]}
          title={t.language[option.value]}
          className={styles.option}
          onClick={() => setLang(option.value)}
        >
          {option.short}
        </button>
      ))}
    </div>
  );
}
