# SnapPortfolio Setup Script for Windows
Write-Host "🚀 SnapPortfolio Setup Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Check Node.js
Write-Host ""
Write-Host "Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node -v
Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green

# Check pnpm
Write-Host ""
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ pnpm not found. Installing pnpm..." -ForegroundColor Red
    npm install -g pnpm
} else {
    Write-Host "✓ pnpm installed" -ForegroundColor Green
}

# Install frontend dependencies
Write-Host ""
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
pnpm install

# Install backend dependencies
Write-Host ""
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location server
pnpm install
Set-Location ..

# Create .env files
Write-Host ""
Write-Host "Setting up environment files..." -ForegroundColor Yellow
if (!(Test-Path .env.local)) {
    Write-Host "Creating .env.local from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env.local
    Write-Host "⚠️  Please edit .env.local with your credentials" -ForegroundColor Yellow
}

if (!(Test-Path server\.env)) {
    Write-Host "Creating server\.env from server\.env.example..." -ForegroundColor Yellow
    Copy-Item server\.env.example server\.env
    Write-Host "⚠️  Please edit server\.env with your credentials" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env.local with your credentials"
Write-Host "2. Edit server\.env with your credentials"
Write-Host "3. Run 'pnpm dev' to start frontend"
Write-Host "4. Run 'cd server; pnpm dev' to start backend"
Write-Host ""
Write-Host "For detailed setup instructions, see SETUP.md" -ForegroundColor Cyan
