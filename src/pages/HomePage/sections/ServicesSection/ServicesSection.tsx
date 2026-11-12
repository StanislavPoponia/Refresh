import clsx from 'clsx';
import { Wrench } from 'lucide-react';
import { Reveal } from '../../../../components/Reveal/Reveal';
import repairPhoto from '../../../../assets/images/services-repair.webp';
import { services } from '../../../../data/services';
import pageStyles from '../../HomePage.module.css';
import styles from './ServicesSection.module.css';

export function ServicesSection() {
  return (
    <section id="services" className={clsx(pageStyles.section, styles.root)}>
      <div className="container">
        <h2 className={pageStyles.sectionTitle}>Послуги</h2>

        <Reveal className={styles.intro}>
          <img
            src={repairPhoto}
            alt="Майстер ремонтує рефрижераторну установку на напівпричепі"
            className={styles.photo}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.introText}>
            <h3>Ремонт і діагностика рефрижераторів</h3>
            <p>
              Наша компанія займається ремонтом та діагностикою рефрижераторів різних типів — для
              вантажівок, напівпричепів і фургонів. Працюємо з обладнанням популярних виробників та
              повертаємо його до роботи в найкоротші терміни.
            </p>
          </div>
        </Reveal>

        <ul className={styles.grid}>
          {services.map((service, index) => (
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
