import clsx from 'clsx';
import { BadgeCheck } from 'lucide-react';
import { Reveal } from '../../../../components/Reveal/Reveal';
import { useContactsModal } from '../../../../context/ContactsModalContext';
import { useLanguage } from '../../../../context/LanguageContext';
import pageStyles from '../../HomePage.module.css';
import styles from './AboutSection.module.css';

export function AboutSection() {
  const { open: openContacts } = useContactsModal();
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section id="about" className={clsx(pageStyles.section, styles.root)}>
      <div className="container">
        <h2 className={pageStyles.sectionTitle}>{a.title}</h2>
        <p className={pageStyles.sectionLead}>{a.intro}</p>

        <ul className={styles.grid}>
          {a.advantages.map((item, index) => (
            <li key={item.id}>
              <Reveal delay={index * 0.06} className={styles.card}>
                <BadgeCheck className={styles.icon} size={30} aria-hidden="true" />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className={styles.cta}>
          <p>{a.howWeWork}</p>
          <button type="button" className={styles.button} onClick={openContacts}>
            {a.button}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
