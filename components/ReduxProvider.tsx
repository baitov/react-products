'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { ReactNode, useEffect } from 'react';
import { setItems, type Product } from '@/lib/slices/productsSlice';

// Провайдер Redux‑хранилища
interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem('products-items');
      if (raw) {
        const parsed = JSON.parse(raw) as Product[];
        if (Array.isArray(parsed)) {
          store.dispatch(setItems(parsed));
        }
      }
    } catch {
      // noop
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}


