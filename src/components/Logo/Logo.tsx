import type { MouseEvent } from 'react';
import clsx from 'clsx';
import logoSrc from '../../assets/logo.svg';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import styles from './Logo.module.css';

interface LogoProps {
  /** Висота логотипу: у хедері менша, у футері більша */
  size?: 'header' | 'footer';
  /** Додатковий обробник (наприклад, закрити мобільне меню) */
  onNavigate?: () => void;
}

/** Логотип RefChe. Клік веде на початок сайту (з будь-якої сторінки). */
export function Logo({ size = 'header', onNavigate }: LogoProps) {
  const { goTo } = useSectionNavigation();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();
    goTo('top');
  };

  return (
    <a
      href="/"
      className={clsx(styles.logo, styles[size])}
      onClick={handleClick}
      aria-label="RefChe — на початок сайту"
    >
      <img src={logoSrc} alt="RefChe" className={styles.image} />
    </a>
  );
}
