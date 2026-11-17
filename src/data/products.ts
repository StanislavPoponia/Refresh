import { IMAGES_BUCKET, supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  /** Артикул / код запчастини */
  article: string;
  category: string;
  /** Назва англійською (null — використовується українська) */
  nameEn: string | null;
  /** Категорія англійською (null — використовується українська) */
  categoryEn: string | null;
  /** Шлях файлу у сховищі Supabase (null — фото немає) */
  imagePath: string | null;
  /** Готове посилання на фото (null — фото немає) */
  imageUrl: string | null;
}

interface ProductRow {
  id: string;
  name: string;
  article: string;
  category: string;
  name_en: string | null;
  category_en: string | null;
  image_path: string | null;
}

function fromRow(row: ProductRow): Product {
  const imageUrl =
    row.image_path && supabase
      ? supabase.storage.from(IMAGES_BUCKET).getPublicUrl(row.image_path).data.publicUrl
      : null;
  return {
    id: row.id,
    name: row.name,
    article: row.article,
    category: row.category,
    nameEn: row.name_en,
    categoryEn: row.category_en,
    imagePath: row.image_path,
    imageUrl,
  };
}

/** Завантажує весь каталог із Supabase. */
export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) throw new Error('Supabase не налаштований');
  const { data, error } = await supabase
    .from('products')
    .select('id, name, article, category, name_en, category_en, image_path')
    .order('name');
  if (error) throw error;
  return (data as ProductRow[]).map(fromRow);
}

/** Назва товару мовою інтерфейсу (якщо переклад не заповнено — українська). */
export function productName(p: Product, lang: string): string {
  return (lang === 'en' && p.nameEn?.trim()) || p.name;
}

/** Категорія товару мовою інтерфейсу (якщо переклад не заповнено — українська). */
export function productCategory(p: Product, lang: string): string {
  return (lang === 'en' && p.categoryEn?.trim()) || p.category;
}

/** Пошук за будь-яким входженням тексту (назва, артикул, категорія). */
export function searchProducts(list: Product[], query: string): Product[] {
  const q = query.trim().toLocaleLowerCase('uk');
  if (!q) return list;
  return list.filter((p) =>
    `${p.name} ${p.nameEn ?? ''} ${p.article} ${p.category} ${p.categoryEn ?? ''}`.toLocaleLowerCase('uk').includes(q),
  );
}
