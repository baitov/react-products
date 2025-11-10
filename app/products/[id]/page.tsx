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
        return validProducts.map((item: any) => ({
          id: String(item.id),
        }));
      }
    }
  } catch (error) {
    console.warn('Failed to fetch products for static generation, using mock data');
  }

  // Если API недоступен, используем моковые данные
  // Моковые данные с ID от 1 до 20 (больше чем в моках, чтобы покрыть возможные ID из API)
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

// Серверный компонент-обертка для страницы детального просмотра продукта
export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
