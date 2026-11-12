import clsx from 'clsx';
import { Flame, Snowflake } from 'lucide-react';
import { Reveal } from '../../../../components/Reveal/Reveal';
import { useTheme } from '../../../../context/ThemeContext';
import { brands } from '../../../../data/brands';
import pageStyles from '../../HomePage.module.css';
import styles from './BrandsSection.module.css';

/** Марки рефрижераторних установок, з якими працює компанія. */
export function BrandsSection() {
  const { theme } = useTheme();
  const Icon = theme === 'dark' ? Flame : Snowflake;

  return (
    <section id="brands" className={clsx(pageStyles.section, pageStyles.sectionAlt)}>
      <div className="container">
        <h2 className={pageStyles.sectionTitle}>Марки, з якими працюємо</h2>
        <p className={pageStyles.sectionLead}>
          Ремонтуємо й обслуговуємо найпоширеніші в Європі та Україні рефрижераторні установки.
        </p>

        <Reveal>
          <ul className={styles.grid}>
            {brands.map((brand) => (
              <li key={brand.id} className={styles.card}>
                {brand.image ? (
                  <img
                    src={brand.image}
                    alt={`Установка ${brand.name} на рефрижераторі`}
                    className={styles.photo}
                    style={{ objectPosition: brand.position }}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className={styles.placeholder} aria-hidden="true">
                    <Icon size={40} />
                  </div>
                )}
                <div className={styles.body}>
                  <h3 className={styles.name}>{brand.name}</h3>
                  <span className={styles.country}>{brand.country}</span>
                  <p className={styles.description}>{brand.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
