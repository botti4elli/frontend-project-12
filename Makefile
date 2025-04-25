install:
	npm ci
	cd frontend && npm ci

start-frontend:
	cd frontend && npm run dev

start-backend:
	npx @hexlet/chat-server --static ./frontend/dist

start:
	make start-backend & make start-frontend

build:
	cd frontend && npx vite build

stop:
	@echo "Killing process on port 5001 (backend)"
	@lsof -ti :5001 | xargs kill -9 || true
preview:
	cd frontend && npm run preview

lint:
	npx eslint .
