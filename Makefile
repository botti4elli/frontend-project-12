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
	cd frontend && npm run build

# Остановка процесса на порту 5001 (бэкенд)
stop:
	@echo "Killing process on port 5001 (backend)"
	@lsof -ti :5001 | xargs kill -9 || true


# Линтинг
lint:
	cd frontend && npx eslint .

