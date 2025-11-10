import type { NextConfig } from "next";

// Определяем, нужно ли использовать настройки для GitHub Pages
const isGithubPages = process.env.GITHUB_PAGES === 'true';
// Имя репозитория (можно задать через переменную окружения или использовать значение по умолчанию)
const repositoryName = process.env.REPOSITORY_NAME || 'react-products';

const nextConfig: NextConfig = {
  // Статический экспорт для GitHub Pages
  output: 'export',
  
  // basePath и assetPrefix нужны только если репозиторий не является корневым (username.github.io)
  // Если ваш репозиторий называется username.github.io, установите GITHUB_PAGES=false
  basePath: isGithubPages ? `/${repositoryName}` : '',
  assetPrefix: isGithubPages ? `/${repositoryName}` : '',
  
  // Отключаем оптимизацию изображений для статического экспорта
  images: {
    unoptimized: true,
  },
  
  // Отключаем trailing slash для совместимости
  trailingSlash: false,
};

export default nextConfig;
