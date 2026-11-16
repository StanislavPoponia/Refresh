import { useCallback, useEffect, useState } from 'react';
import { fetchProducts, type Product } from '../data/products';

interface State {
  products: Product[];
  loading: boolean;
  error: boolean;
}

/** Завантажує каталог із Supabase; reload() оновлює список. */
export function useProducts() {
  const [state, setState] = useState<State>({ products: [], loading: true, error: false });

  const reload = useCallback(async () => {
    try {
      const products = await fetchProducts();
      setState({ products, loading: false, error: false });
    } catch {
      setState({ products: [], loading: false, error: true });
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { ...state, reload };
}
