'use client';

import { useAppSelector } from '@/lib/hooks';
import ProductCard from './ProductCard';
import Filter from './Filter';
import { Loader2 } from 'lucide-react';

// Компонент списка продуктов с фильтрацией
export default function ProductList() {
  const { items, loading, error, filter } = useAppSelector((state) => state.products);

  // Фильтруем продукты в зависимости от выбранного фильтра
  const filteredProducts = filter === 'favorites' 
    ? items.filter((product) => product.isLiked)
    : items;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
        <p>Ошибка загрузки продуктов: {error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div>
        <Filter />
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {filter === 'favorites' 
              ? 'Нет избранных продуктов' 
              : 'Нет продуктов для отображения'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Filter />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


