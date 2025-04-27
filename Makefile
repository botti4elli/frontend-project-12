# Установка зависимостей
install:
	npm ci
	cd frontend && npm ci

# Запуск фронтенда
start-frontend:
	cd frontend && npm run dev

# Запуск бэкенда с указанием пути до статики
start-backend:
	npx @hexlet/chat-server --static ./frontend/dist --port 5001

# Запуск бэкенда и фронтенда одновременно
start:
	make start-backend & make start-frontend

# Сборка фронтенда
build:
	cd frontend && npx vite build

# Остановка процесса на порту 5001 (бэкенд)
stop:
	@echo "Killing process on port 5001 (backend)"
	@lsof -ti :5001 | xargs kill -9 || true

# Превью (для проверки собранного приложения)
preview:
	cd frontend && npm run preview

# Линтинг
lint:
	npx eslint .
