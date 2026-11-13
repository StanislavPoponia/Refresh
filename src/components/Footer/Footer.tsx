import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Flame, Snowflake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { contacts } from '../../data/contacts';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { ContactList } from '../ContactList/ContactList';
import { ContactMap } from '../ContactMap/ContactMap';
import { Logo } from '../Logo/Logo';
import styles from './Footer.module.css';

/** Футер на всіх сторінках: логотип (скрол нагору) і повні контакти без модального вікна. */
export function Footer() {
  const { goTo } = useSectionNavigation();
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  // Як у хедері: холодна тема — сніжинка, темна — вогник (без підсвітки активного розділу)
  const NavIcon = isDark ? Flame : Snowflake;
  const icon = (
    <NavIcon className={clsx(styles.flake, isDark && styles.flame)} size={18} aria-hidden="true" />
  );

  return (
    <footer className={styles.footer}>
      <div className={clsx('container', styles.inner)}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size="footer" />
          </div>

          <nav className={styles.links} aria-label={t.footer.quickLinks}>
            <button type="button" onClick={() => goTo('services')}>
              {icon}
              {t.nav.services}
            </button>
            <button type="button" onClick={() => goTo('about')}>
              {icon}
              {t.nav.about}
            </button>
            <Link to="/shop">
              {icon}
              {t.nav.shop}
            </Link>
          </nav>
        </div>

        <ContactList variant="footer" />
        <ContactMap variant="footer" />

        <p className={styles.copy}>
          © {new Date().getFullYear()} {contacts.company}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
