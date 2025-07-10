#!/bin/bash

# VITALISPHERE deployment script
# Usage: ./deploy.sh [env]
# env can be: prod, staging, local (default: prod)

set -e  # Exit on error

ENV=${1:-prod}
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment for ${ENV} environment...${NC}"

# Build the application
echo -e "${GREEN}Building application...${NC}"
go build -o app

# Checking for errors in templates
echo -e "${GREEN}Checking templates...${NC}"
find templates -name "*.html" -exec grep -l "{{" {} \; | xargs -n1 echo "Checking template:"

# Create directories if they don't exist
echo -e "${GREEN}Setting up directories...${NC}"
mkdir -p logs

# Setting permissions
echo -e "${GREEN}Setting permissions...${NC}"
chmod +x app

# Environment-specific configuration
if [ "$ENV" = "prod" ]; then
    echo -e "${GREEN}Configuring for production...${NC}"
    # Add production-specific settings
    export PORT=8080
    
    # Optional: restart service if using systemd
    if command -v systemctl &> /dev/null && [ -f /etc/systemd/system/vitalisphere.service ]; then
        echo -e "${GREEN}Restarting service...${NC}"
        sudo systemctl restart vitalisphere.service
    else
        echo -e "${GREEN}Starting application...${NC}"
        ./app > logs/app.log 2>&1 &
        echo $! > app.pid
        echo -e "${GREEN}Application started with PID $(cat app.pid)${NC}"
    fi
elif [ "$ENV" = "staging" ]; then
    echo -e "${GREEN}Configuring for staging...${NC}"
    export PORT=8081
    ./app > logs/app.log 2>&1 &
    echo $! > app.pid
    echo -e "${GREEN}Application started with PID $(cat app.pid)${NC}"
elif [ "$ENV" = "local" ]; then
    echo -e "${GREEN}Configuring for local development...${NC}"
    export PORT=8080
    ./app
else
    echo -e "${RED}Unknown environment: ${ENV}${NC}"
    exit 1
fi

echo -e "${GREEN}Deployment completed!${NC}" 