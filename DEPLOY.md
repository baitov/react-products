# Инструкция по деплою на GitHub Pages

## Подготовка

1. Убедитесь, что ваш репозиторий на GitHub называется правильно:
   - Если репозиторий называется `username.github.io` — это корневой репозиторий, используйте `GITHUB_PAGES=false`
   - Если репозиторий называется иначе (например, `react-products`) — используйте имя репозитория как basePath

2. Установите зависимости (если еще не установлены):
   ```bash
   npm install
   ```

## Ручной деплой (только manual)

### Шаг 1: Сборка проекта

Для некорневого репозитория (например, `create-product`):

- Windows (PowerShell):
  ```powershell
  $env:GITHUB_PAGES="true"
  $env:REPOSITORY_NAME="create-product"   # замените на имя вашего репозитория
  npm run build
  ```

- Linux/Mac:
  ```bash
  GITHUB_PAGES=true REPOSITORY_NAME=create-product npm run build
  ```

Для корневого репозитория (`username.github.io`):

- Windows (PowerShell):
  ```powershell
  $env:GITHUB_PAGES="false"
  npm run build
  ```

- Linux/Mac:
  ```bash
  GITHUB_PAGES=false npm run build
  ```

После сборки статические файлы будут в папке `out`.

### Шаг 2: Создать 404.html для роутинга SPA
GitHub Pages должен отдавать `index.html` для любых путей SPA. Создайте `out/404.html`, скопировав содержимое `out/index.html`:

- Windows (PowerShell):
  ```powershell
  Copy-Item -Path out/index.html -Destination out/404.html -Force
  ```
- Linux/Mac:
  ```bash
  cp out/index.html out/404.html
  ```

### Шаг 3: Настройка GitHub Pages

1. Перейдите в настройки репозитория на GitHub: `Settings > Pages`
2. В разделе "Source" выберите:
   - Branch: `gh-pages` (или создайте эту ветку)
   - Folder: `/ (root)`
3. Нажмите "Save"

### Шаг 4: Публикация файлов

Вариант A: Отдельная ветка `gh-pages`
```bash
# Создайте и переключитесь на ветку gh-pages
git checkout -b gh-pages

# Скопируйте содержимое папки 'out' в корень (Linux/Mac)
cp -r out/* .

# Windows (PowerShell)
Copy-Item -Path out\* -Destination . -Recurse -Force

# Закоммитьте и запушьте изменения
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# Вернитесь на основную ветку
git checkout main
```

Вариант B: Папка `docs` на основной ветке
```bash
# Переименуйте out в docs
mv out docs

git add docs
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## Примечания

1. Если изменили имя репозитория — обновите переменную окружения `REPOSITORY_NAME` на шаге сборки.
2. Для корневого репозитория (`username.github.io`) не используйте `basePath`: установите `GITHUB_PAGES=false`.
3. Файл `.nojekyll` уже находится в папке `public` и будет скопирован в `out` при сборке.
4. Для локального предпросмотра статической сборки можно использовать любой статический сервер, например:
   ```bash
   npx serve out -l 3000 -s
   ```
   Откройте `http://localhost:3000/<имя-репозитория>/` при использовании basePath.

