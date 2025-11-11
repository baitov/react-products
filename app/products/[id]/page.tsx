import ProductDetailClient from '@/components/ProductDetailClient';

// Функция для получения всех ID товаров для статической генерации
// Используется во время сборки для статического экспорта
export async function generateStaticParams() {
  try {
    // Пытаемся загрузить данные из API
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Используем кеш для статической генерации
      cache: 'force-cache',
    });

    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data)) {
        // Фильтруем только товары с полными данными
        const validProducts = data.filter((item: any) => 
          item.id && 
          item.title && 
          item.description && 
          item.price && 
          item.image
        );
        const apiIds = validProducts.map((item: any) => ({
          id: String(item.id),
        }));
        
        // Находим максимальный ID из API
        const maxApiId = validProducts.length > 0 
          ? Math.max(...validProducts.map((item: any) => Number(item.id) || 0))
          : 0;
        
        // Добавляем резервный диапазон для созданных пользователем товаров
        // Генерируем ID от maxApiId+1 до maxApiId+1000
        const reserveIds = Array.from({ length: 1000 }, (_, i) => ({
          id: String(maxApiId + i + 1),
        }));
        
        return [...apiIds, ...reserveIds];
      }
    }
  } catch (error) {
    console.warn('Failed to fetch products for static generation, using mock data');
  }

  // Если API недоступен, используем моковые данные
  // Генерируем диапазон ID (1-1000) для покрытия возможных ID созданных пользователем товаров
  // Это необходимо для статического экспорта - все пути должны быть предварительно сгенерированы
  return Array.from({ length: 1000 }, (_, i) => ({
    id: String(i + 1),
  }));
}

// Серверный компонент-обертка для страницы детального просмотра продукта
export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
