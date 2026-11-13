import { useLanguage } from '../../context/LanguageContext';
import { reeferTypes } from '../../data/reeferTypes';
import styles from './ReeferTypes.module.css';

interface ReeferTypesProps {
  className?: string;
}

/** Галерея з типами рефрижераторів, з якими працює компанія. */
export function ReeferTypes({ className }: ReeferTypesProps) {
  const { t } = useLanguage();

  return (
    <div className={className}>
      <p className={styles.heading}>{t.reeferTypes.heading}</p>
      <ul className={styles.grid}>
        {reeferTypes.map((type, index) => {
          const text = t.reeferTypes.items[type.id];
          return (
            <li key={type.id} className={index === 0 ? styles.wide : styles.card}>
              <figure className={styles.figure}>
                <img
                  src={type.image}
                  alt={text.title}
                  className={styles.image}
                  style={{ objectPosition: type.position }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <figcaption className={styles.caption}>
                  <strong className={styles.title}>{text.title}</strong>
                  <span className={styles.description}>{text.description}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
