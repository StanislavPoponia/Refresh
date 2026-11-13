import type { MouseEvent } from 'react';
import clsx from 'clsx';
import logoCold from '../../assets/cold.svg';
import logoHot from '../../assets/hot.svg';
import { useTheme } from '../../context/ThemeContext';
import { contacts } from '../../data/contacts';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import styles from './Logo.module.css';

interface LogoProps {
  /** Висота логотипу: у хедері менша, у футері більша */
  size?: 'header' | 'footer';
  /** Додатковий обробник (наприклад, закрити мобільне меню) */
  onNavigate?: () => void;
  /** Показати назву "RefChe" поруч із логотипом */
  showName?: boolean;
}

/** Логотип RefChe. Клік веде на початок сайту (з будь-якої сторінки). */
export function Logo({ size = 'header', onNavigate, showName = false }: LogoProps) {
  const { goTo } = useSectionNavigation();
  const { theme } = useTheme();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();
    goTo('top');
  };

  return (
    <a
      href={import.meta.env.BASE_URL}
      className={clsx(styles.logo, styles[size])}
      onClick={handleClick}
      aria-label="RefChe — на початок сайту"
    >
      <img src={theme === 'dark' ? logoHot : logoCold} alt="RefChe" className={styles.image} />
      {showName && <span className={styles.name}>{contacts.company}</span>}
    </a>
  );
}
