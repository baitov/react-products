// Скрипт для исправления роутинга на GitHub Pages
// Создает 404.html, который редиректит на index.html для обработки клиентского роутинга

const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');
const indexPath = path.join(outDir, 'index.html');
const notFoundPath = path.join(outDir, '404.html');

// Получаем basePath из переменной окружения или из next.config
// Если REPOSITORY_NAME не установлен, пытаемся определить из собранных файлов
let basePath = process.env.REPOSITORY_NAME ? `/${process.env.REPOSITORY_NAME}` : '';

// Если basePath не установлен, проверяем структуру папок в out
// Next.js создает папку с именем basePath, если он установлен
if (!basePath && fs.existsSync(outDir)) {
  const files = fs.readdirSync(outDir);
  // Ищем папки, которые могут быть basePath (исключаем стандартные папки Next.js)
  const possibleBasePath = files.find(f => {
    const stat = fs.statSync(path.join(outDir, f));
    return stat.isDirectory() && !f.startsWith('_') && f !== '404' && f !== 'index';
  });
  if (possibleBasePath) {
    basePath = `/${possibleBasePath}`;
  }
}

// Читаем index.html
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Если есть basePath, нужно обновить пути в HTML
  if (basePath) {
    // Заменяем относительные пути на пути с basePath
    indexContent = indexContent.replace(
      /(href|src)="\/(?!\/)/g,
      `$1="${basePath}/`
    );
  }
  
  // Создаем 404.html с тем же содержимым, что и index.html
  // Это позволит Next.js обработать маршрут на клиенте
  fs.writeFileSync(notFoundPath, indexContent, 'utf8');
  
  console.log('✓ Created 404.html for GitHub Pages routing');
  if (basePath) {
    console.log(`✓ Using basePath: ${basePath}`);
  }
} else {
  console.error('✗ index.html not found in out directory');
  process.exit(1);
}

