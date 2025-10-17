#!/bin/bash

echo "🏥 MedicAI Setup Script"
echo "======================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
else
    echo -e "${GREEN}✓ Creating .env file...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env and add your Anthropic API key${NC}"
fi

echo ""
echo -e "${GREEN}✓ Installing dependencies...${NC}"
npm install

echo ""
echo -e "${GREEN}✓ Setting up Prisma database...${NC}"
npx prisma migrate dev --name init

echo ""
echo -e "${GREEN}✓ Building project...${NC}"
npm run build

echo ""
echo -e "${GREEN}✅ Setup completed!${NC}"
echo ""
echo "To start the development server, run:"
echo -e "${YELLOW}npm run dev${NC}"
echo ""
echo "Then open http://localhost:3000 in your browser"
