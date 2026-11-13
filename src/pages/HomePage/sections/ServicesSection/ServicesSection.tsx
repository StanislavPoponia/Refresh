import clsx from 'clsx';
import { Wrench } from 'lucide-react';
import { Reveal } from '../../../../components/Reveal/Reveal';
import repairPhoto from '../../../../assets/images/services-repair.webp';
import { useLanguage } from '../../../../context/LanguageContext';
import pageStyles from '../../HomePage.module.css';
import styles from './ServicesSection.module.css';

export function ServicesSection() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section id="services" className={clsx(pageStyles.section, styles.root)}>
      <div className="container">
        <h2 className={pageStyles.sectionTitle}>{s.title}</h2>

        <Reveal className={styles.intro}>
          <img
            src={repairPhoto}
            alt={s.photoAlt}
            className={styles.photo}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.introText}>
            <h3>{s.introTitle}</h3>
            <p>{s.introText}</p>
          </div>
        </Reveal>

        <ul className={styles.grid}>
          {s.items.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={index * 0.06} className={clsx(styles.card)}>
                <span className={styles.icon}>
                  <Wrench size={22} aria-hidden="true" />
                </span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p>{service.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
