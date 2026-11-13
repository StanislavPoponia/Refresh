import clsx from 'clsx';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { format, useLanguage } from '../../context/LanguageContext';
import { contacts, emailLink, mapLink, telLink, viberLink } from '../../data/contacts';
import styles from './ContactList.module.css';

interface ContactListProps {
  /** modal — для вікна контактів, footer — розписано у футері */
  variant?: 'modal' | 'footer';
}

/** Спільний список контактів для модального вікна та футера. */
export function ContactList({ variant = 'modal' }: ContactListProps) {
  const { t } = useLanguage();
  const c = t.contacts;

  return (
    <ul className={clsx(styles.list, styles[variant])}>
      <li className={styles.item}>
        <MapPin className={styles.icon} aria-hidden="true" />
        <div>
          <span className={styles.label}>{c.labelAddress}</span>
          <a href={mapLink} className={styles.link} target="_blank" rel="noopener noreferrer">
            {c.address}
          </a>
          {c.formerAddress && <span className={styles.value}>({c.formerAddress})</span>}
        </div>
      </li>

      <li className={styles.item}>
        <Phone className={styles.icon} aria-hidden="true" />
        <div>
          <span className={styles.label}>{c.labelPhones}</span>
          {contacts.phones.map((phone) => (
            <span key={phone.value} className={styles.phoneRow}>
              <a href={telLink(phone.value)} className={styles.link}>
                {phone.display}
              </a>
              {phone.viber && (
                <a
                  href={viberLink(phone.value)}
                  className={styles.viber}
                  aria-label={format(c.viberAria, { phone: phone.display })}
                >
                  <MessageCircle size={14} aria-hidden="true" /> {c.viber}
                </a>
              )}
            </span>
          ))}
        </div>
      </li>

      <li className={styles.item}>
        <Mail className={styles.icon} aria-hidden="true" />
        <div>
          <span className={styles.label}>{c.labelEmail}</span>
          <a
            href={emailLink(c.emailSubject)}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contacts.email}
          </a>
        </div>
      </li>

      <li className={styles.item}>
        <Clock className={styles.icon} aria-hidden="true" />
        <div>
          <span className={styles.label}>{c.labelSchedule}</span>
          {c.schedule.map((row) => (
            <span key={row.days} className={styles.value}>
              {row.days}: {row.hours}
            </span>
          ))}
        </div>
      </li>
    </ul>
  );
}
