import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Тип для продукта
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  isLiked?: boolean; // Флаг лайка (добавлен пользователем)
  hasNoImage?: boolean; // Признак отсутствия фото в источнике
  hasNoDescription?: boolean; // Признак отсутствия описания в источнике
}

// Состояние для продуктов
interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'favorites'; // Фильтр: все или только избранные
  currentPage: number; // Текущая страница
  itemsPerPage: number; // Количество элементов на странице
}

// Начальное состояние
const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all',
  currentPage: 1,
  itemsPerPage: 12,
};

// Моковые данные на русском языке для использования при недоступности API
const mockProductsRu: Product[] = [
  {
    id: 1,
    title: 'Смартфон Samsung Galaxy',
    description: 'Современный смартфон с отличной камерой и производительностью. Идеально подходит для работы и развлечений.',
    price: 29999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    category: 'Электроника',
    isLiked: false,
  },
  {
    id: 2,
    title: 'Ноутбук MacBook Pro',
    description: '', // нет описания
    price: 129999,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    category: 'Компьютеры',
    isLiked: false,
  },
  {
    id: 3,
    title: 'Наушники Sony WH-1000XM4',
    description: 'Беспроводные наушники с активным шумоподавлением. Отличное качество звука и комфорт.',
    price: 24999,
    image: '', // нет фото
    category: 'Аудио',
    isLiked: false,
  },
  {
    id: 4,
    title: 'Планшет iPad Air',
    description: 'Легкий и мощный планшет для работы и творчества. Отличный экран и долгая батарея.',
    price: 59999,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    category: 'Планшеты',
    isLiked: false,
  },
  {
    id: 5,
    title: 'Умные часы Apple Watch',
    description: 'Фитнес-трекер и умные часы в одном устройстве. Отслеживание здоровья и уведомления.',
    price: 34999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Гаджеты',
    isLiked: false,
  },
  {
    id: 6,
    title: 'Игровая консоль PlayStation 5',
    description: 'Новейшая игровая консоль с потрясающей графикой и производительностью.',
    price: 49999,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
    category: 'Игры',
    isLiked: false,
  },
  {
    id: 7,
    title: 'Камера Canon EOS R5',
    description: 'Профессиональная зеркальная камера с отличным качеством съемки и видео.',
    price: 399999,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400',
    category: 'Фото',
    isLiked: false,
  },
  {
    id: 8,
    title: 'Беспроводная клавиатура Logitech',
    description: 'Эргономичная клавиатура для комфортной работы. Беспроводное подключение.',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    category: 'Периферия',
    isLiked: false,
  },
];

// Асинхронное действие для загрузки продуктов из API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      // Используем FakeStoreAPI - более надежный API с полными данными
      // Документация: https://fakestoreapi.com/docs
      // Эндпоинт: https://fakestoreapi.com/products
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Отключаем кеширование для актуальных данных
        cache: 'no-store',
      });

      // Проверяем успешность ответа
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Проверяем наличие данных
      if (!data || !Array.isArray(data)) {
        throw new Error('Неверный формат данных от API');
      }

      // Фильтруем только товары с полными данными (название, описание, цена, изображение)
      const validProducts = data.filter((item: any) => 
        item.id && 
        item.title && 
        item.description && 
        item.price && 
        item.image
      );

      // Преобразуем данные API в наш формат и добавляем поле isLiked
      return validProducts.map((item: any) => {
        const hasNoDescription = !item.description || String(item.description).trim().length === 0;
        const hasNoImage = !item.image || String(item.image).trim().length === 0;
        const image = hasNoImage
          ? 'https://via.placeholder.com/600x400?text=No+Image'
          : item.image;
        
        return {
          id: item.id,
          title: item.title || 'Untitled',
          description: hasNoDescription ? 'No description' : item.description,
          price: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
          image,
          category: typeof item.category === 'string' ? item.category : undefined,
          isLiked: false,
          hasNoImage,
          hasNoDescription,
        } as Product;
      }) as Product[];
    } catch (error) {
      // Логируем ошибку для отладки
      console.error('Ошибка загрузки продуктов из API:', error);
      console.warn('Используются моковые данные на русском языке');
      
      // Если API недоступен, используем моковые данные на русском языке
      // Дополнительно помечаем товары с отсутствующим фото/описанием
      return mockProductsRu.map((p) => {
        const hasNoDescription = !p.description || p.description.trim().length === 0;
        const hasNoImage = !p.image || p.image.trim().length === 0;
        return {
          ...p,
          description: hasNoDescription ? 'No description' : p.description,
          image: hasNoImage ? 'https://via.placeholder.com/600x400?text=No+Image' : p.image,
          hasNoDescription,
          hasNoImage,
        } as Product;
      });
    }
  }
);

// Slice для управления продуктами
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Установить список продуктов (гидратация из localStorage)
    setItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    // Переключение лайка на продукте
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    // Удаление продукта
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Проверяем, не стала ли текущая страница пустой после удаления
      const filteredProducts = state.filter === 'favorites' 
        ? state.items.filter((product) => product.isLiked)
        : state.items;
      const totalPages = Math.ceil(filteredProducts.length / state.itemsPerPage);
      // Если текущая страница больше не существует, переходим на последнюю доступную
      if (state.currentPage > totalPages && totalPages > 0) {
        state.currentPage = totalPages;
      }
    },
    // Изменение фильтра
    setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
      state.filter = action.payload;
      state.currentPage = 1; // Сбрасываем на первую страницу при смене фильтра
    },
    // Изменение текущей страницы
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Изменение количества элементов на странице
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Сбрасываем на первую страницу
    },
    // Добавление нового продукта (для создания пользователем)
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newId = state.items.length > 0 
        ? Math.max(...state.items.map(p => p.id)) + 1 
        : 1;
      const newProduct: Product = {
        ...action.payload,
        id: newId,
        isLiked: false,
      } as Product;
      state.items = [newProduct, ...state.items];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    // Обработка загрузки продуктов
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Объединяем данные из API с уже существующими товарами
        // Сохраняем созданные пользователем товары (те, которых нет в API)
        const apiProductIds = new Set(action.payload.map(p => p.id));
        const userCreatedProducts = state.items.filter(p => !apiProductIds.has(p.id));
        // Объединяем: сначала созданные пользователем, потом из API
        state.items = [...userCreatedProducts, ...action.payload];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки продуктов';
      });
  },
});

export const { setItems, toggleLike, removeProduct, setFilter, addProduct, setCurrentPage, setItemsPerPage } = productsSlice.actions;
export default productsSlice.reducer;


