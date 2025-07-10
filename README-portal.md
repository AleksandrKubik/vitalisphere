# VITALISPHERE Portal

## Обзор
VITALISPHERE Portal - это веб-приложение, состоящее из React-фронтенда и Laravel-бэкенда, которое размещается на том же хостинге, что и основное приложение VITALISPHERE.

## Структура проекта
- `contenthub_frontend/` - React-приложение (TypeScript, Vite, Tailwind CSS)
- `contenthub_backend/` - Laravel API

## Файлы для деплоя
- `portal-deployment.md` - подробная инструкция по размещению портала на хостинге
- `portal-deploy.sh` - скрипт для автоматического деплоя портала
- `portal-server-setup.sh` - скрипт для настройки сервера
- `nginx/portal.conf` - конфигурация Nginx для фронтенда
- `nginx/portal-backend.conf` - конфигурация Nginx для бэкенда
- `portal-env-example` - пример файла .env для Laravel

## Быстрый старт

### 1. Настройка сервера
```bash
# Сделать скрипт исполняемым
chmod +x portal-server-setup.sh

# Запустить скрипт настройки сервера
sudo ./portal-server-setup.sh
```

### 2. Деплой портала
```bash
# Сделать скрипт исполняемым
chmod +x portal-deploy.sh

# Деплой на продакшн
./portal-deploy.sh prod your-server-ip your-server-user

# Деплой на стейджинг
./portal-deploy.sh staging your-server-ip your-server-user

# Локальная разработка
./portal-deploy.sh local
```

### 3. Настройка базы данных
После первого деплоя необходимо импортировать структуру базы данных:
```bash
mysql -u username -p database_name < contenthub.sql
```

### 4. Настройка SSL
```bash
certbot --nginx -d portal.vitalisphere.com
```

## Требования к серверу
- Ubuntu 20.04 или новее
- Nginx
- PHP 8.1+
- MySQL 8.0+
- Composer
- Node.js 18+ (только для сборки)

## Поддомен
Портал размещается на поддомене `portal.vitalisphere.com`

## Обновление портала
Для обновления портала используйте скрипт деплоя:
```bash
./portal-deploy.sh prod your-server-ip your-server-user
```

## Устранение неполадок

### Проблемы с правами доступа
```bash
# Исправление прав доступа на сервере
ssh your-server-user@your-server-ip "chown -R www-data:www-data /var/www/portal && chmod -R 755 /var/www/portal && chmod -R 777 /var/www/portal/backend/storage"
```

### Очистка кэша Laravel
```bash
ssh your-server-user@your-server-ip "cd /var/www/portal/backend && php artisan cache:clear && php artisan config:clear && php artisan route:clear && php artisan view:clear"
```

### Проверка логов
```bash
# Логи Nginx
ssh your-server-user@your-server-ip "tail -f /var/log/nginx/portal-error.log"
ssh your-server-user@your-server-ip "tail -f /var/log/nginx/portal-backend-error.log"

# Логи Laravel
ssh your-server-user@your-server-ip "tail -f /var/www/portal/backend/storage/logs/laravel.log"
``` 