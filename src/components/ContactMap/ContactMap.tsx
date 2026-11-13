import clsx from 'clsx';
import { MapPin } from 'lucide-react';
import { format, useLanguage } from '../../context/LanguageContext';
import { mapEmbedSrc, mapLink } from '../../data/contacts';
import styles from './ContactMap.module.css';

interface ContactMapProps {
  /** modal — компактніша карта у вікні контактів, footer — ширша у футері */
  variant?: 'modal' | 'footer';
}

/**
 * Google-карта з міткою на нашій адресі. Поверх неї прозоре посилання:
 * клік по карті одразу відкриває цю адресу в Google Maps (нова вкладка / додаток).
 */
export function ContactMap({ variant = 'modal' }: ContactMapProps) {
  const { lang, t } = useLanguage();
  const address = { address: t.contacts.address };

  return (
    <div className={clsx(styles.map, styles[variant])}>
      <iframe
        className={styles.frame}
        src={mapEmbedSrc(lang)}
        title={format(t.contacts.mapTitle, address)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        tabIndex={-1}
      />
      <a
        className={styles.overlay}
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={format(t.contacts.mapOpenAria, address)}
      >
        <span className={styles.hint}>
          <MapPin size={16} aria-hidden="true" /> {t.contacts.mapOpen}
        </span>
      </a>
    </div>
  );
}
