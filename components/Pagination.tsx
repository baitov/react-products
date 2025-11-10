'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCurrentPage } from '@/lib/slices/productsSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Компонент пагинации для навигации по страницам
export default function Pagination() {
  const dispatch = useAppDispatch();
  const { items, filter, currentPage, itemsPerPage } = useAppSelector((state) => state.products);

  // Фильтруем продукты в зависимости от выбранного фильтра
  const filteredProducts = filter === 'favorites' 
    ? items.filter((product) => product.isLiked)
    : items;

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Если товаров нет или страница одна, не показываем пагинацию
  if (filteredProducts.length === 0 || totalPages <= 1) {
    return null;
  }

  // Вычисляем диапазон страниц для отображения
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Максимальное количество видимых страниц

    if (totalPages <= maxVisible) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Если страниц много, показываем с многоточием
      if (currentPage <= 3) {
        // В начале
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // В конце
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // В середине
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      // Прокручиваем вверх при смене страницы
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${
          currentPage === 1
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Номера страниц */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-2 text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Кнопка "Вперед" */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${
          currentPage === totalPages
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}


