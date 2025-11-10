# Инструкция по деплою на GitHub Pages

## Подготовка

1. Убедитесь, что ваш репозиторий на GitHub называется правильно:
   - Если репозиторий называется `username.github.io` - это корневой репозиторий, используйте `GITHUB_PAGES=false`
   - Если репозиторий называется иначе (например, `react-products`) - используйте имя репозитория

2. Установите зависимости (если еще не установлены):
   ```bash
   npm install
   ```

## Способ 1: Автоматический деплой через скрипт (рекомендуется)

### Для Windows (PowerShell):
```powershell
# Установите имя репозитория (замените на ваше)
$env:REPOSITORY_NAME="react-products"
$env:GITHUB_PAGES="true"
npm run build

# После сборки скопируйте содержимое папки 'out' в корень репозитория
# и закоммитьте в ветку gh-pages
```

### Для Linux/Mac:
```bash
# Используйте скрипт deploy.sh
chmod +x deploy.sh
./deploy.sh react-products

# Или вручную:
GITHUB_PAGES=true REPOSITORY_NAME=react-products npm run build
```

## Способ 2: Ручной деплой

### Шаг 1: Сборка проекта

```bash
# Установите переменные окружения
export GITHUB_PAGES=true
export REPOSITORY_NAME=react-products  # Замените на имя вашего репозитория

# Или используйте встроенный скрипт
npm run build:gh-pages
```

Если имя репозитория отличается от `react-products`, используйте:
```bash
GITHUB_PAGES=true REPOSITORY_NAME=your-repo-name npm run build
```

### Шаг 2: Настройка GitHub Pages

1. Перейдите в настройки репозитория на GitHub: `Settings > Pages`
2. В разделе "Source" выберите:
   - Branch: `gh-pages` (или создайте эту ветку)
   - Folder: `/ (root)`
3. Нажмите "Save"

### Шаг 3: Публикация файлов

#### Вариант A: Через отдельную ветку gh-pages

```bash
# Создайте и переключитесь на ветку gh-pages
git checkout -b gh-pages

# Скопируйте содержимое папки 'out' в корень
# Windows (PowerShell):
Copy-Item -Path out\* -Destination . -Recurse -Force

# Linux/Mac:
cp -r out/* .

# Закоммитьте изменения
git add .
git commit -m "Deploy to GitHub Pages"

# Отправьте на GitHub
git push origin gh-pages

# Вернитесь на основную ветку
git checkout main
```

#### Вариант B: Через подпапку docs (альтернативный способ)

1. Переименуйте папку `out` в `docs`
2. В настройках GitHub Pages выберите:
   - Branch: `main` (или `master`)
   - Folder: `/docs`
3. Закоммитьте и запушьте:
```bash
mv out docs
git add docs
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## Важные замечания

1. **Имя репозитория**: Если вы изменили имя репозитория, обязательно обновите переменную `REPOSITORY_NAME` при сборке.

2. **Корневой репозиторий**: Если ваш репозиторий называется `username.github.io`, установите `GITHUB_PAGES=false`:
   ```bash
   GITHUB_PAGES=false npm run build
   ```

3. **Файл .nojekyll**: Файл `.nojekyll` уже создан в папке `public` и будет автоматически скопирован в `out` при сборке. Это необходимо для правильной работы Next.js на GitHub Pages.

4. **Обновление деплоя**: При каждом обновлении проекта:
   - Запустите сборку: `npm run build:gh-pages`
   - Скопируйте содержимое `out` в ветку `gh-pages`
   - Закоммитьте и запушьте изменения

## Проверка

После деплоя ваш сайт будет доступен по адресу:
- Если репозиторий не корневой: `https://username.github.io/react-products/`
- Если репозиторий корневой: `https://username.github.io/`

Подождите несколько минут после пуша, чтобы GitHub обработал изменения.

