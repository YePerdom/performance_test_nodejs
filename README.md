# 🚚 FHL Management Delivery System

A **delivery order management system** for the logistics company **FHL**, developed using **Node.js**, **Express**, **Sequelize ORM**, and **PostgreSQL**.  
It allows managing customers, addresses, products, warehouses, stock, and delivery orders with full traceability, data validation, and API documentation.

---

## 📁 Project Structure

```
src/
 ├── config/               # Database and environment configuration
 ├── controllers/          # Business logic per entity
 ├── dao/                  # Data access objects (Sequelize queries)
 ├── data/                 # CSV sample data files
 ├── dto/                  # Data Transfer Objects with validations (class-validator)
 ├── middlewares/          # Global validation and middleware functions
 ├── models/               # Sequelize models and associations
 ├── routes/               # Express routes (endpoints)
 ├── seeds/                # Initial seeding scripts (CSV data)
 ├── index.ts              # Main entry point
 └── server.ts             # Express server setup
```

---

## ⚙️ Technologies Used

| Category | Technologies |
|-----------|---------------|
| **Backend** | Node.js, Express |
| **ORM / DB** | Sequelize, PostgreSQL |
| **Containers** | Docker, Docker Compose |
| **Validation** | class-validator, class-transformer |
| **API Documentation** | Swagger (OpenAPI 3.0) |
| **Seed Data** | CSV parse + bulkCreate (Sequelize) |
| **Authentication** | JWT + bcrypt |

---

## 🚀 Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YePerdom/performance_test_nodejs.git
cd performance_test_nodejs
```

### 2️⃣ Configure environment variables

Create a `.env` file based on `.env.template`:

```bash
APP_CONTAINER_NAME=your_app_container_name
APP_PORT=your_app_port
APP_HOST=your_app_host
NODE_ENV=your_node_env
APP_CPU_LIMIT=your_app_cpu_limit
APP_MEM_LIMIT=your_app_mem_limit

DB_CONTAINER_NAME=your_db_container_name
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_HOST=your_postgres_host
POSTGRES_DB=your_postgres_db
POSTGRES_PORT=your_postgres_port
POSTGRES_LOCAL=your_postgres_local_port
DB_CPU_LIMIT=your_db_cpu_limit
DB_MEM_LIMIT=your_db_mem_limit

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=your_jwt_expiration_time
```

---

## 🐳 Run with Docker

### 🔹 Start containers

```bash
docker compose up --build
```

This will start:
- `db`: PostgreSQL database container  
- `app`: Node.js backend (Express API)

---

## 🧾 Database Seeding (Initial Data)

The project includes **seed scripts** to populate the database from CSV files.  

### 📂 CSV file structure

All seed files are located in `src/data/`:

```
src/data/
 ├── user.csv
 ├── customer.csv
 ├── address.csv
 ├── storehouse.csv
 ├── product.csv
 ├── stock.csv
 ├── order.csv
 └── orderDetail.csv
```

### ▶️ Run seeds

```bash
docker exec -it fhl_node_app npm run seed
```

📍 The process:
1. Authenticates and syncs the database.  
2. Inserts base data (`users`, `customers`, `products`, etc.).  
3. Logs each successful insert in the console.

---

## 📚 API Documentation (Swagger)

Once the app is running, access Swagger at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 🧩 Main Sections

- **Auth**: Login and user management  
- **Customers**: Customer CRUD operations  
- **Addresses**: Address CRUD operations  
- **Storehouses**: Warehouse management  
- **Products**: Product CRUD  
- **Stock**: Inventory control  
- **Orders**: Create and track delivery orders  

---

## 🧱 Main Entities

| Entity | Description |
|---------|--------------|
| **User** | System users (admin or analyst). |
| **Customer** | Customers placing orders. |
| **Address** | Customer delivery addresses. |
| **Storehouse** | Warehouses managing inventory. |
| **Product** | Available products for delivery. |
| **Stock** | Product availability per warehouse. |
| **Order** | Customer order record. |
| **OrderDetail** | Product details within each order. |

---

## 🧩 DTO Example (User)

```ts
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty() @IsString() name!: string;
  @IsEmail() email!: string;
  @IsNotEmpty() @IsString() password!: string;
  @IsEnum(['admin', 'analyst']) role!: 'admin' | 'analyst';
}
```

---

## 🔐 Authentication

- Login via `/auth/login`  
- Returns a **JWT Token**  
- Include in request headers:
  ```
  Authorization: Bearer <token>
  ```

---

## 🧰 Useful Commands

| Action | Command |
|--------|----------|
| Run in dev mode | `npm run dev` |
| Run database seeds | `npm run seed` |
| Compile TypeScript | `npm run build` |
| Start compiled app | `npm start` |
| Rebuild containers | `docker compose down && docker compose up --build` |

---

## 👨‍💻 Author

**Yoelmis Perdomo - clan:Node.js**