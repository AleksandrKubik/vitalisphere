# Инструкция по размещению Portal React на хостинге VITALISPHERE

## Обзор проекта
Portal React состоит из двух частей:
1. **Frontend** (React + Vite + TypeScript)
2. **Backend** (Laravel PHP)

## Подготовка к деплою

### 1. Сборка Frontend
```bash
cd Portal\ React/contenthub_frontend
npm install
npm run build
```
После сборки в директории `dist` будут созданы статические файлы для размещения.

### 2. Подготовка Backend
```bash
cd Portal\ React/contenthub_backend
composer install --optimize-autoloader --no-dev
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Размещение на хостинге HostSailor

### 1. Настройка домена
Для портала будет использоваться домен edfuncontent.com, который уже приобретен на Namecheap.

### 2. Настройка Nginx для Frontend
Создайте файл конфигурации для домена:

```nginx
server {
    listen 80;
    server_name edfuncontent.com www.edfuncontent.com;
    root /var/www/portal/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Перенаправление API запросов на бэкенд
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. Настройка Backend (Laravel)

Создайте файл конфигурации для API:

```nginx
server {
    listen 8000;
    server_name localhost;
    root /var/www/portal/backend/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### 4. Загрузка файлов на сервер

```bash
# Подключение к серверу
ssh root@198.177.123.158

# Создание директорий
mkdir -p /var/www/portal/frontend /var/www/portal/backend

# Загрузка frontend
scp -r Portal\ React/contenthub_frontend/dist/* root@198.177.123.158:/var/www/portal/frontend/

# Загрузка backend
cd Portal\ React/contenthub_backend
tar -czf backend.tar.gz --exclude=node_modules --exclude=vendor .
scp backend.tar.gz root@198.177.123.158:/tmp/
ssh root@198.177.123.158 "tar -xzf /tmp/backend.tar.gz -C /var/www/portal/backend && rm /tmp/backend.tar.gz"
```

### 5. Настройка базы данных

```bash
# Импорт структуры базы данных
scp Portal\ React/contenthub_backend/contenthub.sql root@198.177.123.158:/tmp/
ssh root@198.177.123.158 "mysql -u username -p database_name < /tmp/contenthub.sql"
```

### 6. Настройка окружения Laravel

Создайте файл `.env` на сервере:

```bash
ssh root@198.177.123.158 "cp /var/www/portal/backend/.env.example /var/www/portal/backend/.env"
```

Отредактируйте файл `.env` на сервере, установив правильные параметры подключения к базе данных:

```
APP_NAME=ContentHub
APP_ENV=production
APP_KEY=base64:YOUR_GENERATED_KEY
APP_DEBUG=false
APP_URL=https://edfuncontent.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

### 7. Установка SSL-сертификата

```bash
# Установка Certbot (если еще не установлен)
ssh root@198.177.123.158 "apt install certbot python3-certbot-nginx -y"

# Получение SSL-сертификата
ssh root@198.177.123.158 "certbot --nginx -d edfuncontent.com -d www.edfuncontent.com"
```

### 8. Перезапуск сервисов

```bash
ssh root@198.177.123.158 "systemctl restart nginx && systemctl restart php8.1-fpm"
```

## Проверка работоспособности

1. Откройте в браузере https://edfuncontent.com
2. Убедитесь, что фронтенд загружается корректно
3. Проверьте работу API, отправив тестовый запрос:
   ```
   curl https://edfuncontent.com/api/health-check
   ```

## Дополнительные рекомендации

1. **Автоматизация деплоя**: Для упрощения процесса обновления портала используйте скрипт деплоя `portal-deploy.sh`.

2. **Мониторинг**: Настройте мониторинг для отслеживания работоспособности портала.

3. **Резервное копирование**: Регулярно создавайте резервные копии базы данных и файлов портала.

4. **Логирование**: Настройте централизованное логирование для быстрого выявления и устранения проблем.

5. **Масштабирование**: При необходимости можно настроить балансировщик нагрузки для распределения запросов между несколькими экземплярами приложения. 