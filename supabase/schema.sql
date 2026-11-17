-- Виконайте цей скрипт ОДИН РАЗ у Supabase: SQL Editor -> New query -> Run.

-- 1. Таблиця товарів
create table if not exists public.products (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  article    text not null,
  category   text not null,
  name_en    text,                       -- переклад назви (необов'язково)
  category_en text,                      -- переклад категорії (необов'язково)
  image_path text,                       -- шлях файлу у сховищі product-images
  created_at timestamptz not null default now()
);

-- Для вже створеної таблиці: додати стовпці перекладу
alter table public.products add column if not exists name_en text;
alter table public.products add column if not exists category_en text;

alter table public.products enable row level security;

-- Права на таблицю (потрібні, навіть якщо автоматичне відкриття таблиць вимкнене)
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

-- Дивитися товари може будь-хто
drop policy if exists "products_read" on public.products;
create policy "products_read" on public.products
  for select using (true);

-- Додавати, змінювати, видаляти може лише користувач, що увійшов (адмін)
drop policy if exists "products_insert" on public.products;
create policy "products_insert" on public.products
  for insert to authenticated with check (true);

drop policy if exists "products_update" on public.products;
create policy "products_update" on public.products
  for update to authenticated using (true) with check (true);

drop policy if exists "products_delete" on public.products;
create policy "products_delete" on public.products
  for delete to authenticated using (true);

-- 2. Сховище для фото (публічне для читання)
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "images_read" on storage.objects;
create policy "images_read" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "images_insert" on storage.objects;
create policy "images_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

drop policy if exists "images_update" on storage.objects;
create policy "images_update" on storage.objects
  for update to authenticated using (bucket_id = 'product-images');

drop policy if exists "images_delete" on storage.objects;
create policy "images_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'product-images');

-- 3. Поточні тимчасові товари (можна видалити потім в /admin)
insert into public.products (name, article, category) values
  ('Фільтр паливний',        'ФП-101', 'Фільтри'),
  ('Фільтр масляний',        'ФМ-102', 'Фільтри'),
  ('Фільтр-осушувач',        'ФО-103', 'Фільтри'),
  ('Ремінь приводний',       'РП-204', 'Приводи'),
  ('Датчик температури',     'ДТ-305', 'Датчики'),
  ('Датчик тиску',           'ДТ-306', 'Датчики'),
  ('Електромагнітний клапан','ЕК-407', 'Клапани'),
  ('Вентилятор випарника',   'ВВ-508', 'Вентиляція'),
  ('Компресор',              'КМ-609', 'Компресори'),
  ('Реле запуску',           'РЗ-710', 'Електрика');
