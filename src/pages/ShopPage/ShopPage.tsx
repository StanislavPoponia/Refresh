import { useCallback, useMemo, useState } from 'react';
import { ImageOff, Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { products, searchProducts, type Product } from '../../data/products';
import { ProductModal } from './ProductModal';
import styles from './ShopPage.module.css';

/** Магазин запчастин з миттєвим пошуком по будь-якому входженню тексту. */
export default function ShopPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);
  const results = useMemo(() => searchProducts(products, query), [query]);

  return (
    <section className={styles.page}>
      <div className={`container ${styles.box}`}>
        <h1 className={styles.title}>{t.shop.title}</h1>

        <div className={styles.search}>
          <Search className={styles.searchIcon} size={20} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            placeholder={t.shop.searchPlaceholder}
            aria-label={t.shop.searchLabel}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => setQuery('')}
              aria-label={t.shop.clear}
            >
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className={styles.list}>
            {results.map((p) => (
              <li key={p.id}>
                <button type="button" className={styles.card} onClick={() => setSelected(p)}>
                  <span className={styles.photo} aria-hidden="true">
                    <ImageOff size={48} />
                  </span>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.article}>
                    {t.shop.article}: {p.article}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>{t.shop.empty}</p>
        )}
      </div>
      <ProductModal product={selected} onClose={closeModal} onReopen={setSelected} />
    </section>
  );
}
