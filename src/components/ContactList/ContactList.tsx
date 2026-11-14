import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { format, useLanguage } from '../../context/LanguageContext';
import { contacts, emailLink, mapLink, telLink, viberLink } from '../../data/contacts';
import styles from './ContactList.module.css';

/** Скільки пікселів треба прокрутити, щоб відкритий графік сам закрився. */
const SCHEDULE_CLOSE_SCROLL_PX = 160;

interface ContactListProps {
  /** modal — для вікна контактів, footer — розписано у футері */
  variant?: 'modal' | 'footer';
}

/** Спільний список контактів для модального вікна та футера. */
export function ContactList({ variant = 'modal' }: ContactListProps) {
  const { t } = useLanguage();
  const c = t.contacts;
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const scheduleRef = useRef<HTMLDivElement>(null);

  // Клік/дотик поза блоком графіка згортає його
  useEffect(() => {
    if (!scheduleOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!scheduleRef.current?.contains(event.target as Node)) setScheduleOpen(false);
    };
    // Згортаємо, лише коли прокрутили далі за SCHEDULE_CLOSE_SCROLL_PX від місця відкриття
    const starts = new Map<EventTarget, number>();
    const position = (target: EventTarget) =>
      target instanceof Element ? target.scrollTop : window.scrollY;
    const onScroll = (event: Event) => {
      const target = event.target ?? document;
      const now = position(target);
      const start = starts.get(target);
      if (start === undefined) {
        starts.set(target, now);
      } else if (Math.abs(now - start) > SCHEDULE_CLOSE_SCROLL_PX) {
        setScheduleOpen(false);
      }
    };
    starts.set(document, window.scrollY);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [scheduleOpen]);

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
              <a
                href={phone.viber ? viberLink(phone.value) : telLink(phone.value)}
                className={styles.link}
              >
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
        <div ref={scheduleRef}>
          <span className={styles.label}>{c.labelSchedule}</span>
          <div className={styles.scheduleWrap}>
            <button
              type="button"
              className={styles.scheduleButton}
              onClick={() => setScheduleOpen((v) => !v)}
              aria-expanded={scheduleOpen}
              aria-controls="schedule-list"
            >
              <span className={styles.scheduleToday}>{c.scheduleTitle}</span>
              <span className={styles.scheduleHint}>
                {c.scheduleHint}
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={clsx(styles.chevron, scheduleOpen && styles.chevronOpen)}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {scheduleOpen && (
                <motion.ul
                  id="schedule-list"
                  className={styles.scheduleList}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {c.schedule.map((row) => (
                    <li key={row.day} className={styles.scheduleRow}>
                      <span>{row.day}</span>
                      <span className={row.hours ? styles.hours : styles.closed}>
                        {row.hours ?? c.scheduleClosed}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </li>
    </ul>
  );
}
