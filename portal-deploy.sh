#!/bin/bash

# VITALISPHERE Portal deployment script
# Usage: ./portal-deploy.sh [env] [server_user]
# env can be: prod, staging, local (default: prod)
# server_user: Пользователь для SSH-подключения (по умолчанию: root)

set -e  # Exit on error

ENV=${1:-prod}
SERVER_IP="198.177.123.158"
SERVER_USER=${2:-"root"}

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Portal deployment for ${ENV} environment...${NC}"

# Сборка frontend
echo -e "${GREEN}Building frontend...${NC}"
cd "Portal React/contenthub_frontend" || exit 1
npm install
npm run build
cd ../..

# Подготовка backend
echo -e "${GREEN}Preparing backend...${NC}"
cd "Portal React/contenthub_backend" || exit 1

# Создаем архив для бэкенда, исключая node_modules и vendor
echo -e "${GREEN}Creating backend archive...${NC}"
tar -czf ../../portal-backend.tar.gz --exclude=node_modules --exclude=vendor .
cd ../..

# Деплой в зависимости от окружения
if [ "$ENV" = "prod" ]; then
    echo -e "${GREEN}Deploying to production server...${NC}"
    
    # Создание директорий на сервере
    echo -e "${GREEN}Creating directories on server...${NC}"
    ssh "${SERVER_USER}@${SERVER_IP}" "mkdir -p /var/www/portal/frontend /var/www/portal/backend"
    
    # Загрузка frontend
    echo -e "${GREEN}Uploading frontend files...${NC}"
    scp -r "Portal React/contenthub_frontend/dist/"* "${SERVER_USER}@${SERVER_IP}:/var/www/portal/frontend/"
    
    # Загрузка backend
    echo -e "${GREEN}Uploading backend files...${NC}"
    scp portal-backend.tar.gz "${SERVER_USER}@${SERVER_IP}:/tmp/"
    ssh "${SERVER_USER}@${SERVER_IP}" "tar -xzf /tmp/portal-backend.tar.gz -C /var/www/portal/backend && rm /tmp/portal-backend.tar.gz"
    
    # Копирование конфигурационных файлов Nginx
    echo -e "${GREEN}Copying Nginx configuration files...${NC}"
    scp nginx/portal.conf "${SERVER_USER}@${SERVER_IP}:/etc/nginx/sites-available/edfuncontent.conf"
    scp nginx/portal-backend.conf "${SERVER_USER}@${SERVER_IP}:/etc/nginx/sites-available/edfuncontent-backend.conf"
    
    # Активация конфигураций Nginx
    echo -e "${GREEN}Activating Nginx configurations...${NC}"
    ssh "${SERVER_USER}@${SERVER_IP}" "ln -sf /etc/nginx/sites-available/edfuncontent.conf /etc/nginx/sites-enabled/"
    ssh "${SERVER_USER}@${SERVER_IP}" "ln -sf /etc/nginx/sites-available/edfuncontent-backend.conf /etc/nginx/sites-enabled/"
    ssh "${SERVER_USER}@${SERVER_IP}" "nginx -t && systemctl reload nginx"
    
    # Настройка backend
    echo -e "${GREEN}Setting up backend...${NC}"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/portal/backend && composer install --optimize-autoloader --no-dev"
    
    # Копирование файла .env
    echo -e "${GREEN}Copying .env file...${NC}"
    scp portal-env-example "${SERVER_USER}@${SERVER_IP}:/var/www/portal/backend/.env"
    
    # Генерация ключа и кэширование конфигурации
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/portal/backend && php artisan key:generate --force"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/portal/backend && php artisan config:cache"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/portal/backend && php artisan route:cache"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/portal/backend && php artisan view:cache"
    
    # Настройка символической ссылки для хранилища
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/portal/backend && php artisan storage:link"
    
    # Настройка прав доступа
    echo -e "${GREEN}Setting permissions...${NC}"
    ssh "${SERVER_USER}@${SERVER_IP}" "chown -R www-data:www-data /var/www/portal"
    ssh "${SERVER_USER}@${SERVER_IP}" "chmod -R 755 /var/www/portal"
    ssh "${SERVER_USER}@${SERVER_IP}" "chmod -R 777 /var/www/portal/backend/storage"
    
    # Перезапуск сервисов
    echo -e "${GREEN}Restarting services...${NC}"
    ssh "${SERVER_USER}@${SERVER_IP}" "systemctl restart nginx && systemctl restart php8.1-fpm"
    
    echo -e "${YELLOW}Checking if SSL certificate needs to be installed...${NC}"
    SSL_CHECK=$(ssh "${SERVER_USER}@${SERVER_IP}" "[ -f /etc/letsencrypt/live/edfuncontent.com/fullchain.pem ] && echo 'exists' || echo 'not_exists'")
    
    if [ "$SSL_CHECK" = "not_exists" ]; then
        echo -e "${GREEN}Installing SSL certificate...${NC}"
        ssh "${SERVER_USER}@${SERVER_IP}" "certbot --nginx -d edfuncontent.com -d www.edfuncontent.com --non-interactive --agree-tos --email hello@edfuncontent.com"
    else
        echo -e "${GREEN}SSL certificate already installed.${NC}"
    fi
    
elif [ "$ENV" = "staging" ]; then
    echo -e "${GREEN}Deploying to staging server...${NC}"
    
    # Аналогично production, но с другими путями или настройками
    ssh "${SERVER_USER}@${SERVER_IP}" "mkdir -p /var/www/staging-portal/frontend /var/www/staging-portal/backend"
    scp -r "Portal React/contenthub_frontend/dist/"* "${SERVER_USER}@${SERVER_IP}:/var/www/staging-portal/frontend/"
    scp portal-backend.tar.gz "${SERVER_USER}@${SERVER_IP}:/tmp/"
    ssh "${SERVER_USER}@${SERVER_IP}" "tar -xzf /tmp/portal-backend.tar.gz -C /var/www/staging-portal/backend && rm /tmp/portal-backend.tar.gz"
    
    # Настройка backend для staging
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/staging-portal/backend && composer install --optimize-autoloader --no-dev"
    scp portal-env-example "${SERVER_USER}@${SERVER_IP}:/var/www/staging-portal/backend/.env"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/staging-portal/backend && php artisan key:generate --force"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/staging-portal/backend && php artisan config:cache"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/staging-portal/backend && php artisan route:cache"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/staging-portal/backend && php artisan view:cache"
    ssh "${SERVER_USER}@${SERVER_IP}" "cd /var/www/staging-portal/backend && php artisan storage:link"
    
    # Настройка прав доступа
    ssh "${SERVER_USER}@${SERVER_IP}" "chown -R www-data:www-data /var/www/staging-portal"
    ssh "${SERVER_USER}@${SERVER_IP}" "chmod -R 755 /var/www/staging-portal"
    ssh "${SERVER_USER}@${SERVER_IP}" "chmod -R 777 /var/www/staging-portal/backend/storage"
    
    # Перезапуск сервисов
    ssh "${SERVER_USER}@${SERVER_IP}" "systemctl restart nginx && systemctl restart php8.1-fpm"
    
elif [ "$ENV" = "local" ]; then
    echo -e "${GREEN}Setting up for local development...${NC}"
    
    # Для локальной разработки просто запускаем сервер
    cd "Portal React/contenthub_frontend" || exit 1
    echo -e "${GREEN}Starting frontend development server...${NC}"
    npm run dev &
    
    cd ../contenthub_backend || exit 1
    echo -e "${GREEN}Starting backend development server...${NC}"
    php artisan serve &
    
    echo -e "${GREEN}Local development servers started:${NC}"
    echo -e "Frontend: http://localhost:5173"
    echo -e "Backend: http://localhost:8000"
else
    echo -e "${RED}Unknown environment: ${ENV}${NC}"
    exit 1
fi

# Удаление временных файлов
echo -e "${GREEN}Cleaning up...${NC}"
rm -f portal-backend.tar.gz

echo -e "${GREEN}Portal deployment completed!${NC}"
if [ "$ENV" = "prod" ] || [ "$ENV" = "staging" ]; then
    echo -e "${YELLOW}Don't forget to import the database if this is the first deployment:${NC}"
    echo -e "scp Portal\\ React/contenthub_backend/contenthub.sql ${SERVER_USER}@${SERVER_IP}:/tmp/"
    echo -e "ssh ${SERVER_USER}@${SERVER_IP} \"mysql -u username -p database_name < /tmp/contenthub.sql\""
fi 