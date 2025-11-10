#!/bin/bash

# Скрипт для ручного деплоя на GitHub Pages
# Использование: ./deploy.sh [repository-name]

REPO_NAME=${1:-react-products}

echo "Building for GitHub Pages with repository name: $REPO_NAME"
echo ""

# Сборка проекта
GITHUB_PAGES=true REPOSITORY_NAME=$REPO_NAME npm run build

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo ""
echo "Build completed successfully!"
echo ""
echo "Next steps:"
echo "1. Go to your repository on GitHub"
echo "2. Go to Settings > Pages"
echo "3. Under 'Source', select 'Deploy from a branch'"
echo "4. Select branch: 'gh-pages' (or create it)"
echo "5. Select folder: '/ (root)'"
echo "6. Click Save"
echo ""
echo "To deploy manually:"
echo "1. Create/checkout gh-pages branch: git checkout -b gh-pages"
echo "2. Copy contents of 'out' folder to root: cp -r out/* ."
echo "3. Commit and push: git add . && git commit -m 'Deploy to GitHub Pages' && git push origin gh-pages"
echo ""
echo "Or use the following commands:"
echo "  git checkout -b gh-pages"
echo "  cp -r out/* ."
echo "  git add ."
echo "  git commit -m 'Deploy to GitHub Pages'"
echo "  git push origin gh-pages"
echo "  git checkout main"

