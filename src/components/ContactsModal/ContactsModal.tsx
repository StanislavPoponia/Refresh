import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useContactsModal } from '../../context/ContactsModalContext';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { ContactList } from '../ContactList/ContactList';
import { ContactMap } from '../ContactMap/ContactMap';
import styles from './ContactsModal.module.css';

/** Спливаюче вікно з контактами. Закривається: кнопка ✕, клік по фону, Escape. */
export function ContactsModal() {
  const { isOpen, close } = useContactsModal();
  const { t } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contacts-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.close}
              onClick={close}
              aria-label={t.contacts.close}
            >
              <X size={22} aria-hidden="true" />
            </button>
            <h2 id="contacts-title" className={styles.title}>
              {t.contacts.title}
            </h2>
            <p className={styles.subtitle}>{t.contacts.subtitle}</p>
            <ContactList variant="modal" />
            <ContactMap variant="modal" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
