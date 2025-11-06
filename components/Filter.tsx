'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setFilter } from '@/lib/slices/productsSlice';

// Компонент фильтра для просмотра всех карточек или только избранных
export default function Filter() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.products.filter);

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => dispatch(setFilter('all'))}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          filter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Все продукты
      </button>
      <button
        onClick={() => dispatch(setFilter('favorites'))}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          filter === 'favorites'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Избранное
      </button>
    </div>
  );
}


