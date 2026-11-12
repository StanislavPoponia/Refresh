import { ReeferTypes } from '../../../../components/ReeferTypes/ReeferTypes';
import { useContactsModal } from '../../../../context/ContactsModalContext';
import { contacts } from '../../../../data/contacts';
import { scrollToSection } from '../../../../hooks/useSectionNavigation';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const { open: openContacts } = useContactsModal();

  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            Ремонт і діагностика рефрижераторів у місті {contacts.city}
          </h1>
          <p className={styles.lead}>
            Повертаємо холод вашому вантажу: швидко знаходимо несправність і надійно ремонтуємо
            рефрижераторні установки різних типів.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.primary}
              onClick={() => scrollToSection('services')}
            >
              Наші послуги
            </button>
            <button type="button" className={styles.secondary} onClick={openContacts}>
              Зв’язатися
            </button>
          </div>
        </div>
        <ReeferTypes className={styles.illustration} />
      </div>
    </section>
  );
}
