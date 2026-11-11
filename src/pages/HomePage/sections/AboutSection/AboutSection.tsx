import clsx from 'clsx';
import { BadgeCheck } from 'lucide-react';
import { Reveal } from '../../../../components/Reveal/Reveal';
import { useContactsModal } from '../../../../context/ContactsModalContext';
import { aboutIntro, advantages, howWeWork } from '../../../../data/about';
import pageStyles from '../../HomePage.module.css';
import styles from './AboutSection.module.css';

export function AboutSection() {
  const { open: openContacts } = useContactsModal();

  return (
    <section id="about" className={clsx(pageStyles.section, pageStyles.sectionAlt)}>
      <div className="container">
        <h2 className={pageStyles.sectionTitle}>Про нас</h2>
        <p className={pageStyles.sectionLead}>{aboutIntro}</p>

        <ul className={styles.grid}>
          {advantages.map((item, index) => (
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
          <p>{howWeWork}</p>
          <button type="button" className={styles.button} onClick={openContacts}>
            Контакти
          </button>
        </Reveal>
      </div>
    </section>
  );
}
