# VITALISPHERE - Информация о хостинге

## Подключение к серверу

```bash
ssh root@198.177.123.158
```

## Структура проекта

Основной сайт находится в директории:
```
/var/www/portal/
```

### Основная структура:
- `/var/www/portal/backend/` - Laravel бэкенд
- `/var/www/portal/frontend/` - React фронтенд

### Структура бэкенда (Laravel):
- `/var/www/portal/backend/app/` - Основной код приложения
  - `/var/www/portal/backend/app/Http/Controllers/` - Контроллеры
  - `/var/www/portal/backend/app/Http/Controllers/API/` - API контроллеры
  - `/var/www/portal/backend/app/Models/` - Модели данных
  - `/var/www/portal/backend/app/Providers/` - Сервис-провайдеры
- `/var/www/portal/backend/config/` - Конфигурационные файлы
- `/var/www/portal/backend/database/` - Миграции и сидеры БД
- `/var/www/portal/backend/routes/` - Маршруты API и веб
  - `/var/www/portal/backend/routes/api.php` - API маршруты
- `/var/www/portal/backend/storage/` - Файлы загрузок и логи
  - `/var/www/portal/backend/storage/logs/` - Логи приложения
  - `/var/www/portal/backend/storage/app/public/` - Публичные файлы (медиа контент)

### Структура фронтенда (React):
- `/var/www/portal/frontend/src/` - Исходный код React
  - `/var/www/portal/frontend/src/components/` - React компоненты
    - `/var/www/portal/frontend/src/components/articles/` - Компоненты для статей
    - `/var/www/portal/frontend/src/components/auth/` - Компоненты для аутентификации
    - `/var/www/portal/frontend/src/components/courses/` - Компоненты для курсов
    - `/var/www/portal/frontend/src/components/games/` - Компоненты для игр
    - `/var/www/portal/frontend/src/components/music/` - Компоненты для музыки
    - `/var/www/portal/frontend/src/components/video/` - Компоненты для видео
  - `/var/www/portal/frontend/src/contexts/` - React контексты (глобальное состояние)
  - `/var/www/portal/frontend/src/hooks/` - Пользовательские React хуки
  - `/var/www/portal/frontend/src/pages/` - Страницы приложения
- `/var/www/portal/frontend/public/` - Статические файлы
  - `/var/www/portal/frontend/public/content/` - Медиа контент
    - `/var/www/portal/frontend/public/content/videos/` - Видео файлы
    - `/var/www/portal/frontend/public/content/music/tracks/` - Аудио файлы
  - `/var/www/portal/frontend/public/games/` - Файлы игр

## База данных

- Название базы данных: `contenthub`
- Пользователь: `root` (без пароля)

### Подключение к MySQL:
```bash
mysql -u root contenthub
```

### Структура базы данных:

#### Основные таблицы:
- `users` - Пользователи системы
- `roles` - Роли в системе
- `user_roles` - Связь между пользователями и ролями
- `articles` - Статьи
- `videos` - Видео материалы
- `music_tracks` - Музыкальные треки
- `games` - Игры
- `course_lessons` - Уроки курсов
- `course_enrollments` - Записи на курсы

#### Таблица users:
| Колонка | Тип | Описание |
|---------|-----|----------|
| id | int | Уникальный ID пользователя |
| name | varchar | Имя пользователя |
| email | varchar | Email пользователя (используется для входа) |
| password | varchar | Хешированный пароль |
| created_at | timestamp | Дата создания |
| updated_at | timestamp | Дата обновления |

#### Таблица roles:
| Колонка | Тип | Описание |
|---------|-----|----------|
| id | int | Уникальный ID роли |
| name | varchar | Название роли |
| created_at | timestamp | Дата создания |
| updated_at | timestamp | Дата обновления |

#### Таблица user_roles:
| Колонка | Тип | Описание |
|---------|-----|----------|
| user_id | int | ID пользователя |
| role_id | int | ID роли |
| created_at | timestamp | Дата создания |
| updated_at | timestamp | Дата обновления |

## Пользователи системы

В системе есть следующие пользователи:

1. Административный пользователь:
   - Email: admin@edfuncontent.com
   - Пароль: password

2. Премиум пользователь:
   - Email: premium@example.com
   - Пароль: premium123

## Конфигурация Nginx

Конфигурация сайта находится в файлах:
- `/etc/nginx/sites-available/edfuncontent.conf` - фронтенд
- `/etc/nginx/sites-available/edfuncontent-backend.conf` - бэкенд

## Текущая функциональность

Сайт представляет собой образовательный портал с контентом:
- Видео материалы
- Музыкальные треки
- Образовательные игры
- Статьи

Реализована система аутентификации с разными уровнями доступа:
- Обычные пользователи - доступ к базовому контенту
- Премиум пользователи - доступ ко всему контенту и функциям
- Администраторы - полный доступ, включая управление пользователями и контентом

### Роли пользователей

В системе определены следующие роли:
| ID | Роль | Описание |
|----|------|----------|
| 1 | admin | Администратор с полным доступом |
| 2 | editor | Редактор контента |
| 3 | user | Базовый пользователь |
| 4 | premium_user | Пользователь с премиум-доступом |

## Управление сервером

### Перезапуск служб:
```bash
# Перезапуск Nginx
systemctl restart nginx

# Перезапуск PHP-FPM
systemctl restart php8.1-fpm

# Перезапуск MySQL
systemctl restart mysql
```

### Просмотр логов:
```bash
# Логи Nginx
tail -f /var/log/nginx/error.log

# Логи Laravel
tail -f /var/www/portal/backend/storage/logs/laravel.log
```

## Важные примечания

1. При изменении пароля пользователя необходимо использовать bcrypt через Laravel:
```php
DB::table('users')->where('email', 'user@example.com')->update(['password' => bcrypt('новый_пароль')]);
```

2. Бэкенд API доступен по адресу: http://localhost:8000/api/

## Структура API

### Основные эндпоинты:

#### Аутентификация:
- `POST /api/auth/login` - Вход в систему
  - Параметры: `email`, `password`
  - Возвращает: JWT токен

- `POST /api/auth/register` - Регистрация нового пользователя
  - Параметры: `name`, `email`, `password`, `password_confirmation`

- `POST /api/auth/logout` - Выход из системы (требует аутентификации)

#### Контент:
- `GET /api/videos` - Получение списка видео
- `GET /api/videos/{id}` - Получение информации о конкретном видео
- `GET /api/music` - Получение списка музыкальных треков
- `GET /api/games` - Получение списка игр
- `GET /api/articles` - Получение списка статей

#### Администрирование (требуют роли admin):
- `POST /api/users` - Создание пользователя
- `PUT /api/users/{id}` - Обновление пользователя
- `DELETE /api/users/{id}` - Удаление пользователя
- `GET /api/roles` - Получение списка ролей

## Регулярное обслуживание

### Резервное копирование

Рекомендуется регулярно создавать резервные копии базы данных:
```bash
mysqldump -u root contenthub > /backup/contenthub_$(date +%Y%m%d).sql
```

### Обновление системы безопасности

Регулярно обновляйте пакеты сервера для обеспечения безопасности:
```bash
apt update && apt upgrade -y
```

## Устранение ошибок

### Решенные проблемы

1. **Проблема с аутентификацией**:
   - Симптом: Ошибка "This password does not use the Bcrypt algorithm" при попытке входа
   - Решение: Обновление паролей с использованием bcrypt через Laravel Tinker
   
2. **Проблема с подключением к MySQL**:
   - Симптом: Ошибка "Access denied for user 'root'@'localhost'"
   - Решение: Изменение метода аутентификации MySQL с caching_sha2_password на mysql_native_password

3. **Отсутствие PHP расширений**:
   - Симптом: Ошибки при запуске Laravel
   - Решение: Установка необходимых пакетов PHP: php8.1-mysql, php8.1-xml, php8.1-mbstring 