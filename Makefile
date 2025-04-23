lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx @hexlet/chat-server --static ./frontend/dist

start:
	make start-backend & make start-frontend

build:
	cd frontend && npm run build
