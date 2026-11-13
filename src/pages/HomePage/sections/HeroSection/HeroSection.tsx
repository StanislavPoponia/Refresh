import { ReeferTypes } from '../../../../components/ReeferTypes/ReeferTypes';
import { useContactsModal } from '../../../../context/ContactsModalContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { scrollToSection } from '../../../../hooks/useSectionNavigation';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const { open: openContacts } = useContactsModal();
  const { t } = useLanguage();

  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h1 className={styles.title}>{t.hero.title}</h1>
          <p className={styles.lead}>{t.hero.lead}</p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primary}
              onClick={() => scrollToSection('services')}
            >
              {t.hero.services}
            </button>
            <button type="button" className={styles.secondary} onClick={openContacts}>
              {t.hero.contact}
            </button>
          </div>
        </div>
        <ReeferTypes className={styles.illustration} />
      </div>
    </section>
  );
}
