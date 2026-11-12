import clsx from 'clsx';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contacts, emailLink, mapLink, telLink, viberLink } from '../../data/contacts';
import styles from './ContactList.module.css';

interface ContactListProps {
  /** modal — для вікна контактів, footer — розписано у футері */
  variant?: 'modal' | 'footer';
}

/** Спільний список контактів для модального вікна та футера. */
export function ContactList({ variant = 'modal' }: ContactListProps) {
  return (
    <ul className={clsx(styles.list, styles[variant])}>
      <li className={styles.item}>
        <MapPin className={styles.icon} aria-hidden="true" />
        <div>
          <span className={styles.label}>Адреса</span>
          <a href={mapLink} className={styles.link} target="_blank" rel="noopener noreferrer">
            {contacts.address}
          </a>
          {contacts.formerAddress && (
            <span className={styles.value}>({contacts.formerAddress})</span>
          )}
        </div>
      </li>

      <li className={styles.item}>
        <Phone className={styles.icon} aria-hidden="true" />
        <div>
          <span className={styles.label}>Телефони</span>
          {contacts.phones.map((phone) => (
            <span key={phone.value} className={styles.phoneRow}>
              <a href={telLink(phone.value)} className={styles.link}>
                {phone.display}
              </a>
              {phone.viber && (
                <a
                  href={viberLink(phone.value)}
                  className={styles.viber}
                  aria-label={`Написати у Viber ${phone.display}`}
                >
                  <MessageCircle size={14} aria-hidden="true" /> Viber
                </a>
              )}
            </span>
          ))}
        </div>
      </li>

      <li className={styles.item}>
        <Mail className={styles.icon} aria-hidden="true" />
        <div>
          <span className={styles.label}>Пошта</span>
          <a href={emailLink} className={styles.link} target="_blank" rel="noopener noreferrer">
            {contacts.email}
          </a>
        </div>
      </li>

      <li className={styles.item}>
        <Clock className={styles.icon} aria-hidden="true" />
        <div>
          <span className={styles.label}>Графік роботи</span>
          {contacts.schedule.map((row) => (
            <span key={row.days} className={styles.value}>
              {row.days}: {row.hours}
            </span>
          ))}
        </div>
      </li>
    </ul>
  );
}
