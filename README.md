# NovaStore — E-commerce Platform

Monorepo containing the full-stack NovaStore application: a React storefront
frontend, a Spring Boot REST API backend, and project documentation.

## Structure

```
.
├── frontend/   # React 19 + Vite storefront (Redux Toolkit, MUI v9)
├── backend/    # Spring Boot 2.7.18 REST API (Java 11, MySQL 8)
├── docs/       # Integration design spec and implementation plan
└── README.md   # This file
```

## Tech stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, Vite, Redux Toolkit, MUI v9, Axios, React Router 7 |
| Backend  | Spring Boot 2.7.18, Spring Security (JWT), Spring Data JPA, Java 11 |
| Database | MySQL 8 |
| Build    | Maven Wrapper (`backend/mvnw`), npm (`frontend/`) |

## Local development

Prerequisites: Java 11, Node.js 18+, Docker (for MySQL).

### 1. Database

```bash
docker run -d --name novastore-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=novastore \
  -p 3306:3306 mysql:8
```

(On later starts: `docker start novastore-mysql`)

### 2. Backend (port 8080)

```bash
cd backend
./mvnw spring-boot:run
```

On first boot the app creates the schema and seeds it: ~194 products pulled
from the dummyjson API plus 8 categories from `src/main/resources/data.sql`.

### 3. Frontend (port 5173)

```bash
cd frontend
npm ci
npm run dev
```

Open http://localhost:5173

### Test account

```
email:    ada@example.com
password: secret123
```

(Seeded by `DataSeeder`.)

## Configuration (environment variables)

All values have local-dev defaults; set them in production:

| Variable       | Default                                      | Used by  |
|----------------|----------------------------------------------|----------|
| `DB_URL`       | `jdbc:mysql://localhost:3306/novastore`      | backend  |
| `DB_USERNAME`  | `root`                                       | backend  |
| `DB_PASSWORD`  | `root`                                       | backend  |
| `JWT_SECRET`   | dev-only base64 key (change in production!)  | backend  |
| `PORT`         | `8080`                                       | backend  |
| `VITE_API_URL` | `http://localhost:8080` (baked in at build)  | frontend |

> **Production note:** the default `JWT_SECRET` and DB credentials are
> development placeholders only. Provide strong values via the environment.

## Build & test

```bash
# Backend — unit tests
cd backend && ./mvnw test

# Backend — jar
cd backend && ./mvnw package

# Frontend — lint
cd frontend && npx eslint .

# Frontend — production build (outputs to frontend/dist)
cd frontend && npm run build
```

## API overview

Base URL: `http://localhost:8080/api`

| Area       | Endpoints |
|------------|-----------|
| Products   | `GET /products` (search, category, minPrice, maxPrice, rating, sort, page, limit), `GET /products/max-price`, `GET/PUT/DELETE /products/{id}`, `POST /products`, `GET /products/{id}/reviews`, `POST /products/{id}/reviews` |
| Categories | `GET /categories`, `GET /categories/{slug}` |
| Auth       | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` (JWT bearer token) |
| Cart       | `GET/POST/DELETE /cart/items`, `PUT/DELETE /cart/items/{productId}` (user-scoped) |
| Wishlist   | `GET/POST/DELETE /wishlist`, `DELETE /wishlist/{productId}` |
| Orders     | `POST /orders`, `GET /orders`, `GET /orders/{id}` |
| Reviews    | `DELETE /reviews/{id}` |

Unauthenticated requests receive `403` for protected endpoints. The store
supports guest cart/wishlist in localStorage, merged into the server account
on login.


# Docker compose set up

## Prerequisites
- Docker Engine or Docker Desktop
- Docker Compose

# 1. Clone the repository
- git clone <your-repository-url>
- cd ecommerce-store

# 2. Build Docker images and push to Dockerhub with Dockerfile 
```
- cd ~/ecommerce-store/backend
docker build -t novastore-backend .
```
```
cd ~/ecommerce-store/frontend
docker build -t novastore-frontend \
--build-arg VITE_API_URL=http://localhost:8080 . # or save in env
``` 
# Tag the images
```
docker tag novastore-backend YOUR_DOCKERHUB_USERNAME/novastore-backend:latest
docker tag novastore-frontend YOUR_DOCKERHUB_USERNAME/novastore-frontend:latest
```
# Push the images
```
docker push YOUR_DOCKERHUB_USERNAME/novastore-backend:latest
docker push YOUR_DOCKERHUB_USERNAME/novastore-frontend:latest
```
# Confirm
```
docker images | grep novastore
```
# 3. Configure environment variables

# Create a .env file in the project root:

MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=novastore
MYSQL_USER=novastore_app
MYSQL_PASSWORD=your_app_password

Use strong passwords and never commit your .env file.

# Run it!
```Bash
cd ~/ecommerce-store
docker compose up -d
```
# Check status
```Bash
docker compose ps
docker compose logs -f backend
```
