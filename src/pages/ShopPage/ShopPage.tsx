import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';
import styles from './ShopPage.module.css';

/** Магазин запчастин — поки що заглушка «в розробці». */
export default function ShopPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.box}`}>
        <Construction className={styles.icon} size={56} aria-hidden="true" />
        <h1 className={styles.title}>Магазин запчастин у розробці</h1>
        <p className={styles.text}>
          Ми готуємо каталог запчастин для рефрижераторів. Скоро тут з’явиться магазин — а поки що
          звертайтесь до нас за контактами, і ми підберемо потрібну деталь.
        </p>
        <Link to="/" className={styles.button}>
          На головну
        </Link>
      </div>
    </section>
  );
}
