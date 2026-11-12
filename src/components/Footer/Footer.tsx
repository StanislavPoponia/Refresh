import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Flame, Snowflake } from 'lucide-react';
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
            <p className={styles.tagline}>
              Ремонт і діагностика рефрижераторів у місті {contacts.city}.
            </p>
          </div>

          <nav className={styles.links} aria-label="Швидкі посилання">
            <button type="button" onClick={() => goTo('services')}>
              {icon}Послуги
            </button>
            <button type="button" onClick={() => goTo('about')}>
              {icon}Про нас
            </button>
            <Link to="/shop">{icon}Магазин</Link>
          </nav>
        </div>

        <ContactList variant="footer" />
        <ContactMap variant="footer" />

        <p className={styles.copy}>
          © {new Date().getFullYear()} {contacts.company}. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}
