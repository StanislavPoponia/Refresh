import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { Flame, Menu, Snowflake, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useContactsModal } from '../../context/ContactsModalContext';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { Logo } from '../Logo/Logo';
import styles from './Header.module.css';

/** Хедер сайту: логотип, Послуги, Контакти, Магазин, Про нас. Присутній на всіх сторінках. */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { goTo } = useSectionNavigation();
  const { open: openContacts, isOpen: contactsOpen } = useContactsModal();
  const { active: activeSection, hold } = useActiveSection();
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const [scrolled, setScrolled] = useState(false);

  // Хедер стискається після прокрутки вниз. Гістерезис (різні пороги) не дає йому
  // "смикатися" на межі, бо зміна висоти хедера зсуває контент сторінки.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > 8 : y > 64));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // Відкрите мобільне меню ховається, щойно користувач починає скролити вниз
  useEffect(() => {
    if (!menuOpen) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY + 4) setMenuOpen(false);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // Закриваємо мобільне меню при зміні сторінки
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const handleSection = (id: 'services' | 'about') => {
    closeMenu();
    hold(id);
    goTo(id);
  };

  const handleContacts = () => {
    closeMenu();
    openContacts();
  };

  // Який пункт меню зараз "горить": відкрите вікно контактів, сторінка магазину
  // або секція головної, у якій перебуває користувач
  const current: 'services' | 'about' | 'contacts' | 'shop' | null = contactsOpen
    ? 'contacts'
    : pathname.startsWith('/shop')
      ? 'shop'
      : activeSection;

  // Холодна тема — сніжинка, темна ("обігрів") — вогник
  const NavIcon = isDark ? Flame : Snowflake;
  const icon = (key: NonNullable<typeof current>) => (
    <NavIcon
      className={clsx(styles.flake, isDark && styles.flame, current === key && styles.lit)}
      size={18}
      aria-hidden="true"
    />
  );
  const linkClass = (key: NonNullable<typeof current>) =>
    clsx(styles.link, current === key && styles.active);
  const ariaCurrent = (key: NonNullable<typeof current>) =>
    current === key ? ('location' as const) : undefined;

  const nav = (
    <>
      <button
        type="button"
        className={linkClass('services')}
        aria-current={ariaCurrent('services')}
        onClick={() => handleSection('services')}
      >
        {icon('services')}
        {t.nav.services}
      </button>
      <button
        type="button"
        className={linkClass('contacts')}
        aria-current={ariaCurrent('contacts')}
        onClick={handleContacts}
      >
        {icon('contacts')}
        {t.nav.contacts}
      </button>
      <NavLink to="/shop" className={linkClass('shop')} onClick={closeMenu}>
        {icon('shop')}
        {t.nav.shop}
      </NavLink>
      <button
        type="button"
        className={linkClass('about')}
        aria-current={ariaCurrent('about')}
        onClick={() => handleSection('about')}
      >
        {icon('about')}
        {t.nav.about}
      </button>
    </>
  );

  return (
    <header className={clsx(styles.header, scrolled && styles.scrolled)}>
      <div className={clsx('container', styles.inner)}>
        <div className={styles.brand}>
          <LanguageSwitch />
          <Logo size="header" onNavigate={closeMenu} showName />
        </div>

        <nav className={styles.desktopNav} aria-label={t.nav.mainMenu}>
          {nav}
        </nav>

        <div className={styles.actions}>
          <div
            role="radiogroup"
            aria-label={t.theme.label}
            className={clsx(styles.themeSwitch, isDark && styles.themeSwitchOn)}
          >
            <span className={styles.themeThumb} aria-hidden="true" />
            <button
              type="button"
              role="radio"
              aria-checked={!isDark}
              aria-label={t.theme.light}
              title={t.theme.light}
              className={clsx(styles.themeOption, styles.themeCold)}
              onClick={() => setTheme('light')}
            >
              <Snowflake size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={isDark}
              aria-label={t.theme.dark}
              title={t.theme.dark}
              className={clsx(styles.themeOption, styles.themeHot)}
              onClick={() => setTheme('dark')}
            >
              <Flame size={18} aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileNav}
            aria-label={t.nav.mobileMenu}
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
