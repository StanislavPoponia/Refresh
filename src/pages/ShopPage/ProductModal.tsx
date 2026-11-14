import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageOff, X } from 'lucide-react';
import { useContactsModal } from '../../context/ContactsModalContext';
import { useLanguage } from '../../context/LanguageContext';
import type { Product } from '../../data/products';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import styles from './ProductModal.module.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

/** Картка товару по центру екрана. Закривається: ✕, клік по фону, Escape. */
export function ProductModal({ product, onClose }: ProductModalProps) {
  const { t } = useLanguage();
  const { open: openContacts } = useContactsModal();
  const closeRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(product !== null);

  useEffect(() => {
    if (!product) return;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  const askAboutProduct = () => {
    onClose();
    openContacts();
  };

  return createPortal(
    <AnimatePresence>
      {product && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-title"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={onClose}
              aria-label={t.shop.close}
            >
              <X size={22} aria-hidden="true" />
            </button>
            <div className={styles.photo} aria-hidden="true">
              <ImageOff size={72} />
            </div>
            <div className={styles.info}>
              <h2 id="product-title" className={styles.title}>
                {product.name}
              </h2>
              <p className={styles.article}>
                {t.shop.article}: {product.article}
              </p>
              <p className={styles.description}>{product.description}</p>
              <button type="button" className={styles.ask} onClick={askAboutProduct}>
                {t.shop.ask}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
