#!/bin/bash

echo "🚀 SnapPortfolio Setup Script"
echo "=============================="

# Check Node.js version
echo ""
echo "Checking Node.js version..."
node_version=$(node -v)
echo "✓ Node.js $node_version"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null
then
    echo "❌ pnpm not found. Installing pnpm..."
    npm install -g pnpm
else
    echo "✓ pnpm installed"
fi

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
pnpm install

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
cd server && pnpm install
cd ..

# Create .env files if they don't exist
echo ""
echo "Setting up environment files..."
if [ ! -f .env.local ]; then
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please edit .env.local with your credentials"
fi

if [ ! -f server/.env ]; then
    echo "Creating server/.env from server/.env.example..."
    cp server/.env.example server/.env
    echo "⚠️  Please edit server/.env with your credentials"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your credentials"
echo "2. Edit server/.env with your credentials"
echo "3. Run 'pnpm dev' to start frontend"
echo "4. Run 'cd server && pnpm dev' to start backend"
echo ""
echo "For detailed setup instructions, see SETUP.md"
