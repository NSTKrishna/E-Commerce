#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Idempotent Setup for E-Commerce Project..."

# Function to check and create .env files idempotently
setup_env() {
    local dir=$1
    local file="$dir/.env"
    local example="$dir/.env.example"

    if [ ! -f "$file" ]; then
        if [ -f "$example" ]; then
            echo "📝 Creating $file from $example..."
            cp "$example" "$file"
        else
            echo "⚠️  No .env.example found in $dir, skipping .env creation."
        fi
    else
        echo "✅ $file already exists, skipping."
    fi
}

# 1. Root Level
echo "📦 Installing root dependencies (if any)..."
if [ -f "package.json" ]; then
    npm install
else
    echo "ℹ️  No root package.json found, skipping."
fi

# 2. Server Setup
echo "🖥️  Setting up Server..."
cd server
setup_env "."
npm install

echo "💎 Generating Prisma Client..."
npx prisma generate

# 3. Client Setup
echo "🎨 Setting up Client..."
cd ../client
setup_env "."
npm install

cd ..

echo "✨ Setup Complete! You can now run the project."
echo "   - Server: cd server && npm start"
echo "   - Client: cd client && npm run dev"
