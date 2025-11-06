'use client';

import { Product } from '@/lib/slices/productsSlice';
import { useAppDispatch } from '@/lib/hooks';
import { toggleLike, removeProduct } from '@/lib/slices/productsSlice';
import { Heart, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

// Компонент карточки продукта
export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Обработчик клика на лайк
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем переход на страницу продукта
    dispatch(toggleLike(product.id));
  };

  // Обработчик клика на удаление
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем переход на страницу продукта
    dispatch(removeProduct(product.id));
  };

  // Обработчик клика на карточку (переход на страницу продукта)
  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  // Урезаем описание для одинаковой высоты карточек
  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
    >
      {/* Изображение продукта */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Подстановка, если изображение не загрузилось
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=%D0%9D%D0%B5%D1%82+%D1%84%D0%BE%D1%82%D0%BE';
          }}
        />
        {product.hasNoImage && (
          <span className="absolute top-2 left-2 bg-gray-900/75 text-white text-xs px-2 py-1 rounded">
            Нет фото
          </span>
        )}
      </div>

      {/* Контент карточки */}
      <div className="p-4 flex flex-col flex-1">
        {/* Заголовок и кнопки действий */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
            {product.title}
          </h3>
          <div className="flex gap-2 ml-2">
            {/* Иконка лайка */}
            <button
              onClick={handleLikeClick}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={product.isLiked ? 'Убрать лайк' : 'Поставить лайк'}
            >
              <Heart
                size={20}
                className={product.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}
              />
            </button>
            {/* Иконка удаления */}
            <button
              onClick={handleDeleteClick}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Удалить продукт"
            >
              <Trash2 size={20} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
        </div>

        {/* Описание (урезанное) */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex-1 line-clamp-3">
          {truncateDescription(product.description)}
        </p>
        {product.hasNoDescription && (
          <span className="text-xs text-amber-600 dark:text-amber-400">Описание отсутствует</span>
        )}

        {/* Цена и категория */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </span>
          {product.category && (
            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {product.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


