'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { toggleLike, removeProduct } from '@/lib/slices/productsSlice';
import { Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Клиентский компонент для детального просмотра продукта
export default function ProductDetailClient() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const productId = Number(params.id);

  // Получаем продукт из store
  const product = useAppSelector((state) =>
    state.products.items.find((p) => p.id === productId)
  );

  // Обработчик клика на лайк
  const handleLikeClick = () => {
    dispatch(toggleLike(productId));
  };

  // Обработчик клика на удаление
  const handleDeleteClick = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(removeProduct(productId));
      router.push('/');
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product not found
          </h1>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        ← Back to products
      </Link>

      {/* Детальная информация о продукте */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product image */}
          <div className="md:w-1/2">
            <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-700">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=No+Image';
                }}
              />
            </div>
          </div>

          {/* Product info */}
          <div className="md:w-1/2 p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex-1">
                {product.title}
              </h1>
              <div className="flex gap-2 ml-4">
                {/* Кнопка лайка */}
                <button
                  onClick={handleLikeClick}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={product.isLiked ? 'Remove like' : 'Set like'}
                >
                  <Heart
                    size={24}
                    className={
                      product.isLiked
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }
                  />
                </button>
                {/* Кнопка удаления */}
                <button
                  onClick={handleDeleteClick}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Delete product"
                >
                  <Trash2 size={24} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>

            {product.category && (
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm mb-4">
                {product.category}
              </span>
            )}

            <div className="mb-6">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Product ID: {product.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

