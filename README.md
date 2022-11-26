# Crypto Wallet Project

> Crypto Asset Management

## required technologies

-  Node.js
-  NPM
-  Express
-  Typescript
-  Jest
-  Supertest
-  Artillery
-  Swagger
-  PostgreSQL
-  Docker
-  Conventional Commits

## :warning: Permission for directory infra (for GNU/Linux user)

```bash
chmod -R 777 ./infra
```

## :information_source: Install all dependencies

```bash
npm install
```

## :green_book: Provision the infrastructure with docker

```bash
docker-compose -f ./infra/docker-compose.yaml up -d
```

## :dart: Create a env file

```bash
cp example.env .env
```

## :construction: Development server

```bash
Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/api-docs/`.
The application will automatically reload if you change any of the source files.
```

## :black_joker: Run tests with jest and supertest

```bash
npm run test
```

## :gun: Run load tests with artillery

```bash
npm run artillery
```
