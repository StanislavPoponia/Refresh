import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Flame, ImageOff, ListFilter, Search, Snowflake, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useContactsModal } from '../../context/ContactsModalContext';
import { useLanguage } from '../../context/LanguageContext';
import { productCategory, productName, searchProducts, type Product } from '../../data/products';
import { useProducts } from '../../hooks/useProducts';
import { ProductModal } from './ProductModal';
import styles from './ShopPage.module.css';

/** Заглушка: малюнок рефрижераторного контейнера (колір береться з теми). */
function ReeferIllustration() {
  const ribs = Array.from({ length: 13 }, (_, i) => 62 + i * 11);
  return (
    <svg
      className={styles.illustration}
      viewBox="0 0 240 120"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* корпус контейнера */}
      <rect x="10" y="18" width="220" height="76" rx="4" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="3" />
      {/* гофровані стінки */}
      {ribs.map((x) => (
        <line key={x} x1={x} y1="24" x2={x} y2="88" stroke="currentColor" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* холодильна установка */}
      <rect x="10" y="18" width="40" height="76" rx="4" fill="currentColor" fillOpacity="0.28" stroke="currentColor" strokeWidth="3" />
      <circle cx="30" cy="42" r="12" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M30 33v18M22.2 37.5l15.6 9M37.8 37.5l-15.6 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="19" y1="68" x2="41" y2="68" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="19" y1="76" x2="41" y2="76" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="19" y1="84" x2="41" y2="84" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* кутові фітинги й опора */}
      <rect x="6" y="14" width="10" height="8" rx="2" fill="currentColor" />
      <rect x="224" y="14" width="10" height="8" rx="2" fill="currentColor" />
      <rect x="6" y="90" width="10" height="8" rx="2" fill="currentColor" />
      <rect x="224" y="90" width="10" height="8" rx="2" fill="currentColor" />
      <line x1="0" y1="108" x2="240" y2="108" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Заглушка порожньої полиці: сідловий тягач з причепом-рефрижератором (колір з теми). */
function TruckIllustration() {
  const ribs = Array.from({ length: 15 }, (_, i) => 30 + i * 13);
  const wheel = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy="108" r="14" fill="currentColor" />
      <circle cx={cx} cy="108" r="6" fill="var(--color-surface)" />
    </g>
  );
  const stroke = { stroke: 'currentColor', strokeWidth: 3, strokeLinejoin: 'round' as const };
  return (
    <svg
      className={styles.truck}
      viewBox="0 0 380 140"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* причеп-рефрижератор */}
      <rect x="8" y="14" width="244" height="80" rx="5" fill="currentColor" fillOpacity="0.12" {...stroke} />
      {ribs.map((x) => (
        <line key={x} x1={x} y1="22" x2={x} y2="86" stroke="currentColor" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" />
      ))}
      {/* холодильна установка на передній стінці причепа */}
      <rect x="226" y="22" width="24" height="34" rx="4" fill="currentColor" fillOpacity="0.3" {...stroke} />
      <circle cx="238" cy="34" r="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <line x1="231" y1="46" x2="245" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* опора причепа */}
      <line x1="196" y1="94" x2="196" y2="116" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="188" y1="118" x2="204" y2="118" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* рама та сідло */}
      <rect x="8" y="94" width="346" height="8" rx="3" fill="currentColor" />
      <rect x="244" y="88" width="28" height="8" rx="2" fill="currentColor" />
      {/* дефлектор на даху кабіни */}
      <path d="M256 20H298L322 34H256Z" fill="currentColor" fillOpacity="0.5" {...stroke} />
      {/* кабіна тягача: похиле лобове скло, нижча «морда» */}
      <path d="M262 94V40Q262 34 268 34H318Q324 34 327 39L343 66Q346 70 346 76V94Z" fill="currentColor" fillOpacity="0.28" {...stroke} />
      {/* бокове скло з косим переднім краєм */}
      <path d="M274 42H316L334 68H274Z" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* двері: шов, ручка, нижня панель */}
      <path d="M270 38V92H332" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="314" y1="76" x2="324" y2="76" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* дзеркало */}
      <line x1="334" y1="48" x2="340" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="338" y="50" width="6" height="16" rx="2.5" fill="currentColor" />
      {/* фара, решітка й бампер */}
      <rect x="336" y="78" width="10" height="7" rx="2" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2.5" />
      <line x1="338" y1="89" x2="346" y2="89" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M336 94H350Q356 94 356 100V104H336Z" fill="currentColor" />
      {/* колеса: два на причепі, провідний і передній на тягачі */}
      {[40, 72, 288, 328].map(wheel)}
      <line x1="0" y1="124" x2="380" y2="124" stroke="currentColor" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Магазин запчастин з миттєвим пошуком по будь-якому входженню тексту. */
export default function ShopPage() {
  const { t, lang } = useLanguage();
  const { open: openContacts } = useContactsModal();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const MarkIcon = theme === 'dark' ? Flame : Snowflake;
  const { products, loading, error } = useProducts();

  // Ключ категорії — українська назва; підпис залежить від мови сайту
  const categories = useMemo(() => {
    const labels = new Map<string, string>();
    for (const p of products) {
      if (!labels.has(p.category)) labels.set(p.category, productCategory(p, lang));
    }
    return [...labels.entries()]
      .map(([key, label]) => ({ key, label }))
      .sort((a, b) => a.label.localeCompare(b.label, lang));
  }, [products, lang]);
  const results = useMemo(
    () =>
      searchProducts(
        selectedCats.length > 0
          ? products.filter((p) => selectedCats.includes(p.category))
          : products,
        query,
      ),
    [products, selectedCats, query],
  );

  const toggleCategory = (c: string) =>
    setSelectedCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  // Закриваємо вікно фільтра при кліку поза ним або по Escape
  useEffect(() => {
    if (!filterOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFilterOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [filterOpen]);

  return (
    <section className={styles.page}>
      <div className={`container ${styles.box}`}>
        <h1 className={styles.title}>{t.shop.title}</h1>

        <div className={styles.toolbar}>
          {categories.length > 1 && (
            <div className={styles.filter} ref={filterRef}>
              <button
                type="button"
                className={`${styles.filterBtn} ${selectedCats.length ? styles.filterBtnActive : ''}`}
                aria-expanded={filterOpen}
                aria-haspopup="true"
                aria-label={t.shop.filter}
                onClick={() => setFilterOpen((o) => !o)}
              >
                <span className={styles.filterIcons} aria-hidden="true">
                  <ListFilter size={20} className={styles.iconDefault} />
                  <MarkIcon
                    size={20}
                    className={`${styles.iconHover} ${theme === 'dark' ? styles.iconFlame : ''}`}
                  />
                </span>
                <span className={styles.filterLabel}>{t.shop.filter}</span>
                {selectedCats.length > 0 && (
                  <span className={styles.badge}>{selectedCats.length}</span>
                )}
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={filterOpen ? styles.chevronOpen : undefined}
                />
              </button>
              {filterOpen && (
                <div className={styles.dropdown} role="group" aria-label={t.shop.categories}>
                  {categories.map(({ key: c, label }) => {
                    const on = selectedCats.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        className={`${styles.option} ${on ? styles.optionOn : ''}`}
                        aria-pressed={on}
                        onClick={() => toggleCategory(c)}
                      >
                        <span className={styles.mark} aria-hidden="true">
                          <MarkIcon
                            size={18}
                            className={`${styles.markIcon} ${theme === 'dark' ? styles.markFlame : ''}`}
                          />
                        </span>
                        <span>{label}</span>
                      </button>
                    );
                  })}
                  {selectedCats.length > 0 && (
                    <button
                      type="button"
                      className={styles.reset}
                      onClick={() => setSelectedCats([])}
                    >
                      {t.shop.resetFilter}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
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

        </div>

        {loading ? (
          <p className={styles.empty}>{t.loading}</p>
        ) : error ? (
          <p className={styles.empty}>{t.shop.error}</p>
        ) : products.length === 0 ? (
          <div className={`${styles.empty} ${styles.notFound} ${styles.shelfEmpty}`}>
            <TruckIllustration />
            <p>{t.shop.shelfEmpty}</p>
            <button type="button" className={styles.contactBtn} onClick={openContacts}>
              {t.nav.contacts}
            </button>
          </div>
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
                  <span className={styles.name} title={productName(p, lang)}>
                    {productName(p, lang)}
                  </span>
                  <span className={styles.article}>
                    {t.shop.article}: {p.article}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={`${styles.empty} ${styles.notFound}`}>
            <ReeferIllustration />
            <p>{t.shop.empty}</p>
            <button type="button" className={styles.contactBtn} onClick={openContacts}>
              {t.nav.contacts}
            </button>
          </div>
        )}
      </div>
      <ProductModal product={selected} onClose={closeModal} onReopen={setSelected} />
    </section>
  );
}
