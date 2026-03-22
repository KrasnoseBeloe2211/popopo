# Docker развёртывание

## Быстрый старт

### 1. Сборка и запуск через Docker Compose (рекомендуется)

```bash
# Сборка и запуск
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

Приложение будет доступно по адресу: http://localhost:3000

### 2. Сборка и запуск через Docker

```bash
# Сборка образа
docker build -t popopo-app .

# Запуск контейнера
docker run -d -p 3000:3000 --name popopo-app popopo-app

# Просмотр логов
docker logs -f popopo-app

# Остановка
docker stop popopo-app
docker rm popopo-app
```

## Переменные окружения

Для настройки приложения создайте файл `.env.production`:

```env
# Порт приложения
PORT=3000

# API базовый URL
NEXT_PUBLIC_API_URL=http://your-api-url.com

# Другие переменные окружения
...
```

И подключите его при запуске:

```bash
docker run -d -p 3000:3000 --env-file .env.production popopo-app
```

Или в docker-compose.yml добавьте секцию `env_file`:

```yaml
services:
  app:
    env_file:
      - .env.production
```

## Команды управления

### Docker Compose

```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Просмотр логов
docker-compose logs -f

# Масштабирование (если нужно несколько экземпляров)
docker-compose up -d --scale app=3

# Обновление образа и перезапуск
docker-compose pull
docker-compose up -d --force-recreate
```

### Docker

```bash
# Сборка
docker build -t popopo-app .

# Запуск
docker run -d -p 3000:3000 popopo-app

# Остановка
docker stop <container_id>

# Удаление
docker rm <container_id>

# Удаление образа
docker rmi popopo-app
```

## Мониторинг

```bash
# Статус контейнера
docker-compose ps

# Использование ресурсов
docker stats popopo-app

# Логи
docker-compose logs -f app
```

## Продакшн рекомендации

1. **Безопасность**:
   - Не используйте `--network=host` в продакшене
   - Настройте firewall для ограничения доступа
   - Используйте secrets для чувствительных данных

2. **Производительность**:
   - Настройте лимиты памяти и CPU в docker-compose.yml
   - Используйте reverse proxy (nginx, traefik)
   - Настройте кэширование статики

3. **Масштабирование**:
   - Используйте Docker Swarm или Kubernetes для оркестрации
   - Настройте health checks для мониторинга
   - Используйте external volumes для персистентных данных

## Troubleshooting

### Контейнер не запускается

```bash
# Проверка логов
docker-compose logs app

# Проверка состояния
docker-compose ps

# Попытка запуска в foreground для отладки
docker-compose up
```

### Проблемы с памятью

```bash
# Проверка использования памяти
docker stats popopo-app

# Увеличьте лимиты в docker-compose.yml
```

### Ошибки сборки

```bash
# Очистка кэша Docker
docker builder prune -a

# Пересборка без кэша
docker-compose build --no-cache
```
