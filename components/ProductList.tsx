'use client';

import { useAppSelector } from '@/lib/hooks';
import ProductCard from './ProductCard';
import Filter from './Filter';
import Pagination from './Pagination';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

// Компонент списка продуктов с фильтрацией и пагинацией
export default function ProductList() {
  const { items, loading, error, filter, currentPage, itemsPerPage } = useAppSelector((state) => state.products);

  // Сохраняем товары в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem('products-items', JSON.stringify(items));
    } catch {
      // noop
    }
  }, [items]);

  // Фильтруем продукты в зависимости от выбранного фильтра
  const filteredProducts = filter === 'favorites' 
    ? items.filter((product) => product.isLiked)
    : items;

  // Вычисляем индексы для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

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
        <p>Failed to load products: {error}</p>
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
              ? 'No favorite products' 
              : 'No products to display'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Filter />
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination />
    </div>
  );
}


