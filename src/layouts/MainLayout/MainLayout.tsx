import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ContactsModal } from '../../components/ContactsModal/ContactsModal';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import type { ScrollState } from '../../hooks/useSectionNavigation';
import styles from './MainLayout.module.css';

/** Спільний каркас усіх сторінок: Header + контент + Footer + вікно контактів. */
export function MainLayout() {
  const { pathname, state } = useLocation();

  // Нова сторінка відкривається зверху (якщо не просили скрол до секції)
  useEffect(() => {
    if (!(state as ScrollState | null)?.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={<div className={styles.loading}>Завантаження…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ContactsModal />
    </div>
  );
}
