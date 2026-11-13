import { useEffect, useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  // Значок і збільшення: миша над перемикачем або щойно натиснули (дотик)
  const [active, setActive] = useState(false);
  // Коли й де натиснули: зміна мови перекомпоновує сторінку і може викликати «фантомний» скрол
  const pressedAt = useRef({ time: 0, y: 0 });

  // Поки активний: зникає при кліку/дотику деінде, скролі чи натисканні клавіші
  useEffect(() => {
    if (!active) return;
    const hide = () => setActive(false);
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) hide();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', hide);
    // Ховаємо лише при справжній прокрутці користувача, а не через перекомпоновку після кліку
    const onScroll = () => {
      const { time, y } = pressedAt.current;
      if (Date.now() - time > 800 && Math.abs(window.scrollY - y) > 12) hide();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', hide);
      window.removeEventListener('scroll', onScroll);
    };
  }, [active]);

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={t.language.label}
      className={clsx(styles.switch, lang === 'en' && styles.second, active && styles.active)}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setActive(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setActive(false)}
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
          onClick={() => {
            pressedAt.current = { time: Date.now(), y: window.scrollY };
            setLang(option.value);
            setActive(true);
          }}
        >
          {option.short}
        </button>
      ))}
    </div>
  );
}
