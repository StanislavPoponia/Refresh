import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.box}`}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Сторінку не знайдено</h1>
        <p className={styles.text}>Можливо, посилання застаріло або адресу введено з помилкою.</p>
        <Link to="/" className={styles.button}>
          На головну
        </Link>
      </div>
    </section>
  );
}
