import { useCallback, useMemo, useState } from 'react';
import { ImageOff, Search, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { searchProducts, type Product } from '../../data/products';
import { useProducts } from '../../hooks/useProducts';
import { ProductModal } from './ProductModal';
import styles from './ShopPage.module.css';

/** Магазин запчастин з миттєвим пошуком по будь-якому входженню тексту. */
export default function ShopPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);
  const [category, setCategory] = useState('');
  const { products, loading, error } = useProducts();

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b, 'uk')),
    [products],
  );
  const results = useMemo(
    () =>
      searchProducts(
        category ? products.filter((p) => p.category === category) : products,
        query,
      ),
    [products, category, query],
  );

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

        {categories.length > 1 && (
          <div className={styles.categories} role="group" aria-label={t.shop.categories}>
            {['', ...categories].map((c) => (
              <button
                key={c || 'all'}
                type="button"
                className={`${styles.chip} ${c === category ? styles.chipActive : ''}`}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c || t.shop.allCategories}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className={styles.empty}>{t.loading}</p>
        ) : error ? (
          <p className={styles.empty}>{t.shop.error}</p>
        ) : results.length > 0 ? (
          <ul className={styles.list}>
            {results.map((p) => (
              <li key={p.id}>
                <button type="button" className={styles.card} onClick={() => setSelected(p)}>
                  <span className={styles.photo} aria-hidden="true">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt="" loading="lazy" className={styles.img} />
                    ) : (
                      <ImageOff size={48} />
                    )}
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
