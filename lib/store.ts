import { configureStore, Middleware } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';

// Middleware для автоматического сохранения в localStorage
const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Сохраняем товары в localStorage после любых изменений
  if (typeof window !== 'undefined') {
    try {
      const state = store.getState();
      localStorage.setItem('products-items', JSON.stringify(state.products.items));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }
  
  return result;
};

// Конфигурация Redux‑хранилища
export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


