"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchProducts } from '@/lib/slices/productsSlice';
import ProductList from '@/components/ProductList';

// Главная страница: список продуктов
export default function HomeProductsPage() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Список продуктов
        </h1>
      </div>
      <ProductList />
    </div>
  );
}
