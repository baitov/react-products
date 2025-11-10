# Скрипт для ручного деплоя на GitHub Pages (Windows PowerShell)
# Использование: .\deploy.ps1 [repository-name]

param(
    [string]$RepoName = "react-products"
)

Write-Host "Building for GitHub Pages with repository name: $RepoName" -ForegroundColor Cyan
Write-Host ""

# Установка переменных окружения
$env:GITHUB_PAGES = "true"
$env:REPOSITORY_NAME = $RepoName

# Сборка проекта
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to your repository on GitHub"
Write-Host "2. Go to Settings > Pages"
Write-Host "3. Under 'Source', select 'Deploy from a branch'"
Write-Host "4. Select branch: 'gh-pages' (or create it)"
Write-Host "5. Select folder: '/ (root)'"
Write-Host "6. Click Save"
Write-Host ""
Write-Host "To deploy manually:" -ForegroundColor Yellow
Write-Host "1. Create/checkout gh-pages branch: git checkout -b gh-pages"
Write-Host "2. Copy contents of 'out' folder to root: Copy-Item -Path out\* -Destination . -Recurse -Force"
Write-Host "3. Commit and push: git add . ; git commit -m 'Deploy to GitHub Pages' ; git push origin gh-pages"
Write-Host "4. Return to main: git checkout main"
Write-Host ""

