import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { contacts } from '../../data/contacts';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import { ContactList } from '../ContactList/ContactList';
import { Logo } from '../Logo/Logo';
import styles from './Footer.module.css';

/** Футер на всіх сторінках: логотип (скрол нагору) і повні контакти без модального вікна. */
export function Footer() {
  const { goTo } = useSectionNavigation();

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
              Послуги
            </button>
            <button type="button" onClick={() => goTo('about')}>
              Про нас
            </button>
            <Link to="/shop">Магазин</Link>
          </nav>
        </div>

        <ContactList variant="footer" />

        <p className={styles.copy}>
          © {new Date().getFullYear()} {contacts.company}. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}
