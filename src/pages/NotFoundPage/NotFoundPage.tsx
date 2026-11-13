import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import styles from './NotFoundPage.module.css';

/** Причеп-рефрижератор збоку: агрегат спереду (ліворуч) не працює, індикатор аварії блимає. */
function BrokenReeferTrailer() {
  const { t } = useLanguage();

  return (
    <svg className={styles.trailer} viewBox="0 0 420 200" role="img" aria-label={t.notFound.svgAlt}>
      <defs>
        <linearGradient id="nf-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ill-box-top)" />
          <stop offset="1" stopColor="var(--ill-box-bottom)" />
        </linearGradient>
      </defs>

      {/* Тінь на дорозі */}
      <ellipse cx="215" cy="186" rx="190" ry="6" fill="var(--color-gray-100)" />

      {/* Опорні стійки */}
      <rect x="92" y="146" width="6" height="30" fill="var(--ill-chassis)" />
      <rect x="84" y="174" width="22" height="4" rx="2" fill="var(--ill-chassis)" />

      {/* Рама */}
      <rect x="52" y="138" width="352" height="9" rx="2" fill="var(--ill-chassis)" />

      {/* Кузов-ізотерм */}
      <rect
        x="66"
        y="22"
        width="338"
        height="116"
        rx="8"
        fill="url(#nf-box)"
        stroke="var(--color-primary)"
        strokeWidth="3"
      />
      <path
        d="M104 22v116M156 22v116M208 22v116M260 22v116M312 22v116M364 22v116"
        stroke="var(--color-gray-100)"
        strokeWidth="2"
      />

      {/* Холодильний агрегат на передній стінці */}
      <rect
        x="30"
        y="38"
        width="40"
        height="80"
        rx="6"
        fill="var(--color-surface)"
        stroke="var(--color-primary)"
        strokeWidth="3"
      />
      <circle
        cx="50"
        cy="80"
        r="15"
        fill="var(--color-bg-alt)"
        stroke="var(--color-gray-400)"
        strokeWidth="2"
      />
      {/* Лопаті вентилятора — стоять */}
      <g stroke="var(--color-gray-400)" strokeWidth="3" strokeLinecap="round">
        <path d="M50 80V68M50 80l10.4 6M50 80l-10.4 6" />
      </g>
      <circle cx="50" cy="80" r="3" fill="var(--color-gray-400)" />
      <path d="M38 106h24M38 111h24" stroke="var(--color-gray-100)" strokeWidth="2" />

      {/* Індикатор аварії */}
      <circle className={styles.alarm} cx="50" cy="52" r="5" fill="var(--color-primary-dark)" />

      {/* Колеса */}
      {[300, 346, 388].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="160" r="17" fill="var(--ill-tire)" />
          <circle cx={cx} cy="160" r="7" fill="var(--color-gray-400)" />
        </g>
      ))}
    </svg>
  );
}

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className={styles.page}>
      <div className={`container ${styles.box}`}>
        <p className={styles.code}>404</p>
        <BrokenReeferTrailer />
        <h1 className={styles.title}>{t.notFound.title}</h1>
        <p className={styles.text}>{t.notFound.text}</p>
        <Link to="/" className={styles.button}>
          {t.notFound.home}
        </Link>
      </div>
    </section>
  );
}
