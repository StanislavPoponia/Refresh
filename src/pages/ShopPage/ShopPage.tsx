import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ShopPage.module.css';

/** Магазин запчастин — поки що заглушка «в розробці». */
export default function ShopPage() {
  const { t } = useLanguage();

  return (
    <section className={styles.page}>
      <div className={`container ${styles.box}`}>
        <Construction className={styles.icon} size={56} aria-hidden="true" />
        <h1 className={styles.title}>{t.shop.title}</h1>
        <p className={styles.text}>{t.shop.text}</p>
        <Link to="/" className={styles.button}>
          {t.shop.home}
        </Link>
      </div>
    </section>
  );
}
