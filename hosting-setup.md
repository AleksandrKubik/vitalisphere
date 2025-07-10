# Настройка хостинга для VITALISPHERE

В этом документе описаны различные варианты размещения Go-приложения VITALISPHERE на хостинге.

## Вариант 1: VPS на Namecheap

Поскольку вы уже приобрели домен на Namecheap, использование их VPS-хостинга может быть логичным продолжением:

1. **Приобретение VPS**:
   - Перейдите в раздел "Hosting" на Namecheap и выберите VPS Hosting
   - Рекомендуемый план: Pulsar (2GB RAM, 2 CPU) - оптимален для небольших проектов
   - Выберите ОС: Ubuntu 20.04 или новее

2. **Настройка сервера**:
   ```bash
   # Подключение к серверу
   ssh root@ваш-ip-адрес
   
   # Обновление сервера
   apt update && apt upgrade -y
   
   # Установка Nginx
   apt install nginx -y
   
   # Настройка фаервола
   apt install ufw -y
   ufw allow 'Nginx Full'
   ufw allow 'OpenSSH'
   ufw enable
   
   # Установка Git
   apt install git -y
   
   # Установка Go
   wget https://golang.org/dl/go1.17.3.linux-amd64.tar.gz
   tar -C /usr/local -xzf go1.17.3.linux-amd64.tar.gz
   echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
   source ~/.profile
   ```

3. **Деплой приложения**:
   ```bash
   # Клонирование репозитория
   git clone https://github.com/AleksandrKubik/vitalisphere.git
   cd vitalisphere
   
   # Сборка приложения
   go build -o app
   
   # Создание systemd сервиса для автозапуска
   cat > /etc/systemd/system/vitalisphere.service << EOF
   [Unit]
   Description=Vitalisphere Go Application
   After=network.target
   
   [Service]
   User=root
   WorkingDirectory=/root/vitalisphere
   ExecStart=/root/vitalisphere/app
   Restart=always
   
   [Install]
   WantedBy=multi-user.target
   EOF
   
   # Активация и запуск сервиса
   systemctl enable vitalisphere
   systemctl start vitalisphere
   ```

4. **Настройка Nginx**:
   ```bash
   cat > /etc/nginx/sites-available/vitalisphere << EOF
   server {
       listen 80;
       server_name ваш-домен.com www.ваш-домен.com;
   
       location / {
           proxy_pass http://localhost:8080;
           proxy_set_header Host \$host;
           proxy_set_header X-Real-IP \$remote_addr;
       }
   }
   EOF
   
   # Активация конфигурации
   ln -s /etc/nginx/sites-available/vitalisphere /etc/nginx/sites-enabled/
   nginx -t
   systemctl restart nginx
   ```

5. **Настройка SSL**:
   ```bash
   # Установка Certbot для Let's Encrypt
   apt install certbot python3-certbot-nginx -y
   
   # Получение и настройка SSL-сертификата
   certbot --nginx -d ваш-домен.com -d www.ваш-домен.com
   ```

## Вариант 2: Облачный хостинг на Render.com

Render - это современная платформа для размещения веб-приложений с простым деплоем и поддержкой Go.

1. **Регистрация и настройка**:
   - Создайте аккаунт на [Render.com](https://render.com)
   - Подключите свой GitHub/GitLab репозиторий

2. **Создание нового сервиса**:
   - Выберите "New Web Service"
   - Выберите ваш репозиторий
   - Выберите среду "Go"
   - Укажите команду сборки: `go build -o app`
   - Укажите команду запуска: `./app`
   - Выберите тариф "Starter" ($7/месяц) или "Free" (с ограничениями)

3. **Настройка переменных окружения**:
   - В разделе "Environment" добавьте переменную `PORT=8080`

4. **Настройка домена**:
   - В разделе "Settings" вашего сервиса найдите "Custom Domain"
   - Добавьте свой домен, который вы приобрели на Namecheap
   - Следуйте инструкциям для настройки DNS-записей

5. **Настройка DNS на Namecheap**:
   - Зайдите в панель управления Namecheap
   - Выберите ваш домен и перейдите в "Advanced DNS"
   - Создайте CNAME-запись: `www` указывающую на ваш URL на Render
   - Создайте A-запись для корневого домена, указывающую на IP-адрес Render (предоставляется Render)

## Вариант 3: Облачное решение на DigitalOcean App Platform

DigitalOcean предлагает специализированную платформу для приложений, оптимизированную для разработчиков.

1. **Настройка аккаунта**:
   - Зарегистрируйтесь на [DigitalOcean](https://www.digitalocean.com/)
   - Перейдите в раздел "Apps" и нажмите "Create App"

2. **Создание приложения**:
   - Подключите свой GitHub/GitLab репозиторий
   - Выберите ветку для деплоя
   - Выберите тип "Web Service"
   - Платформа определит Go автоматически

3. **Конфигурация**:
   - Укажите команду запуска: `./app`
   - Выберите тарифный план (Basic за $12/месяц рекомендуется для старта)

4. **Настройка домена**:
   - В настройках приложения выберите "Domains"
   - Добавьте свой домен с Namecheap
   - Следуйте инструкциям по настройке DNS

5. **Настройка DNS на Namecheap**:
   - В панели Namecheap перейдите в "Advanced DNS"
   - Создайте CNAME-запись: `www` указывающую на ваш URL на DigitalOcean
   - Для корневого домена следуйте инструкциям от DigitalOcean (обычно они предлагают либо A-запись, либо настройку ALIAS)

## Рекомендация

Для вашего проекта VITALISPHERE, я рекомендую:

1. **Новичкам**: Использовать Render.com - простая настройка, отличная документация, быстрый старт
2. **Средний уровень**: DigitalOcean App Platform - больше возможностей, хорошая масштабируемость
3. **Продвинутым**: VPS на Namecheap или DigitalOcean Droplet - полный контроль, гибкость настроек

После выбора платформы, я могу помочь с детальной настройкой конкретного варианта. 