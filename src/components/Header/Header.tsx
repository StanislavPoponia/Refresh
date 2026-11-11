import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useContactsModal } from '../../context/ContactsModalContext';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { Logo } from '../Logo/Logo';
import styles from './Header.module.css';

/** Хедер сайту: логотип, Послуги, Контакти, Магазин, Про нас. Присутній на всіх сторінках. */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { goTo } = useSectionNavigation();
  const { open: openContacts } = useContactsModal();
  const { pathname } = useLocation();

  const closeMenu = () => setMenuOpen(false);

  // Закриваємо мобільне меню при зміні сторінки
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSection = (id: 'services' | 'about') => {
    closeMenu();
    goTo(id);
  };

  const handleContacts = () => {
    closeMenu();
    openContacts();
  };

  const nav = (
    <>
      <button type="button" className={styles.link} onClick={() => handleSection('services')}>
        Послуги
      </button>
      <button type="button" className={styles.link} onClick={handleContacts}>
        Контакти
      </button>
      <NavLink
        to="/shop"
        className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
        onClick={closeMenu}
      >
        Магазин
      </NavLink>
      <button type="button" className={styles.link} onClick={() => handleSection('about')}>
        Про нас
      </button>
    </>
  );

  return (
    <header className={styles.header}>
      <div className={clsx('container', styles.inner)}>
        <Logo size="header" onNavigate={closeMenu} />

        <nav className={styles.desktopNav} aria-label="Головне меню">
          {nav}
        </nav>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileNav}
            aria-label="Мобільне меню"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {nav}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
