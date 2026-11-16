import { useEffect, useState, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Pencil, Trash2 } from 'lucide-react';
import { type Product } from '../../data/products';
import { useProducts } from '../../hooks/useProducts';
import { IMAGES_BUCKET, supabase } from '../../lib/supabase';
import styles from './AdminPage.module.css';

/** Стискає фото до 1200px у webp — швидше вантажиться на сайті. */
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Не вдалося обробити фото'))), 'image/webp', 0.85),
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError('Невірний email або пароль');
    setBusy(false);
  };

  return (
    <form className={styles.card} onSubmit={submit}>
      <h1 className={styles.title}>Вхід в адмін-панель</h1>
      <label className={styles.field}>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
      </label>
      <label className={styles.field}>
        Пароль
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.primary} disabled={busy}>
        {busy ? 'Вхід…' : 'Увійти'}
      </button>
    </form>
  );
}

function Panel() {
  const { products, loading, reload } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [article, setArticle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [...new Set(products.map((p) => p.category))].sort((a, b) => a.localeCompare(b, 'uk'));

  const resetForm = () => {
    setEditing(null);
    setName('');
    setArticle('');
    setCategory('');
    setFile(null);
    setFileKey((k) => k + 1);
  };

  const startEdit = (p: Product) => {
    setEditing(p);
    setName(p.name);
    setArticle(p.article);
    setCategory(p.category);
    setFile(null);
    setFileKey((k) => k + 1);
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeImage = async (path: string | null) => {
    if (path && supabase) await supabase.storage.from(IMAGES_BUCKET).remove([path]);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage('');
    try {
      let imagePath = editing?.imagePath ?? null;
      if (file) {
        const blob = await compressImage(file);
        const newPath = `${crypto.randomUUID()}.webp`;
        const { error: upErr } = await supabase.storage
          .from(IMAGES_BUCKET)
          .upload(newPath, blob, { contentType: 'image/webp' });
        if (upErr) throw upErr;
        await removeImage(imagePath);
        imagePath = newPath;
      }
      const row = { name: name.trim(), article: article.trim(), category: category.trim(), image_path: imagePath };
      const { error: dbErr } = editing
        ? await supabase.from('products').update(row).eq('id', editing.id)
        : await supabase.from('products').insert(row);
      if (dbErr) throw dbErr;
      setMessage(editing ? 'Зміни збережено' : 'Товар додано');
      resetForm();
      await reload();
    } catch {
      setMessage('Помилка збереження. Перевірте з’єднання та спробуйте ще раз.');
    }
    setBusy(false);
  };

  const remove = async (p: Product) => {
    if (!supabase || !window.confirm(`Видалити «${p.name}»?`)) return;
    const { error: dbErr } = await supabase.from('products').delete().eq('id', p.id);
    if (dbErr) {
      setMessage('Не вдалося видалити товар');
      return;
    }
    await removeImage(p.imagePath);
    if (editing?.id === p.id) resetForm();
    await reload();
  };

  return (
    <>
      <div className={styles.bar}>
        <h1 className={styles.title}>Товари ({products.length})</h1>
        <button type="button" className={styles.secondary} onClick={() => void supabase?.auth.signOut()}>
          Вийти
        </button>
      </div>

      <form className={styles.card} onSubmit={save}>
        <h2 className={styles.subtitle}>{editing ? 'Редагувати товар' : 'Додати товар'}</h2>
        <label className={styles.field}>
          Назва
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className={styles.field}>
          Артикул
          <input value={article} onChange={(e) => setArticle(e.target.value)} required />
        </label>
        <label className={styles.field}>
          Категорія
          <input value={category} onChange={(e) => setCategory(e.target.value)} list="categories" required />
          <datalist id="categories">
            {categories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>
        <label className={styles.field}>
          Фото {editing?.imageUrl && '(залиште порожнім, щоб не змінювати)'}
          <input
            key={fileKey}
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.actions}>
          <button type="submit" className={styles.primary} disabled={busy}>
            {busy ? 'Збереження…' : editing ? 'Зберегти' : 'Додати'}
          </button>
          {editing && (
            <button type="button" className={styles.secondary} onClick={resetForm}>
              Скасувати
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Завантаження…</p>
      ) : (
        <ul className={styles.list}>
          {products.map((p) => (
            <li key={p.id} className={styles.row}>
              {p.imageUrl ? (
                <img src={p.imageUrl} alt="" className={styles.thumb} />
              ) : (
                <span className={styles.thumb} />
              )}
              <span className={styles.rowText}>
                <strong>{p.name}</strong>
                <small>
                  {p.article} · {p.category}
                </small>
              </span>
              <button type="button" className={styles.icon} onClick={() => startEdit(p)} aria-label="Редагувати">
                <Pencil size={18} />
              </button>
              <button type="button" className={styles.icon} onClick={() => void remove(p)} aria-label="Видалити">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Закрита сторінка керування товарами: /admin */
export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const { data } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <section className={styles.page}>
      <div className={`container ${styles.box}`}>
        {!supabase ? (
          <p>Supabase не налаштований: додайте VITE_SUPABASE_URL і VITE_SUPABASE_ANON_KEY.</p>
        ) : !ready ? (
          <p>Завантаження…</p>
        ) : session ? (
          <Panel />
        ) : (
          <Login />
        )}
      </div>
    </section>
  );
}
