import { reeferTypes } from '../../data/reeferTypes';
import styles from './ReeferTypes.module.css';

interface ReeferTypesProps {
  className?: string;
}

/** Галерея з типами рефрижераторів, з якими працює компанія. */
export function ReeferTypes({ className }: ReeferTypesProps) {
  return (
    <div className={className}>
      <p className={styles.heading}>З якими рефрижераторами працюємо</p>
      <ul className={styles.grid}>
        {reeferTypes.map((type, index) => (
          <li key={type.id} className={index === 0 ? styles.wide : styles.card}>
            <figure className={styles.figure}>
              <img
                src={type.image}
                alt={type.title}
                className={styles.image}
                style={{ objectPosition: type.position }}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <figcaption className={styles.caption}>
                <strong className={styles.title}>{type.title}</strong>
                <span className={styles.description}>{type.description}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
