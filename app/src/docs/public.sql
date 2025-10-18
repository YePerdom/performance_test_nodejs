/*
 Navicat Premium Dump SQL

 Source Server         : desempeño
 Source Server Type    : PostgreSQL
 Source Server Version : 150014 (150014)
 Source Host           : localhost:5432
 Source Catalog        : fhl_management_delivery_system
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150014 (150014)
 File Encoding         : 65001

 Date: 18/10/2025 12:28:13
*/


-- ----------------------------
-- Type structure for enum_orders_status
-- ----------------------------
DROP TYPE IF EXISTS "public"."enum_orders_status";
CREATE TYPE "public"."enum_orders_status" AS ENUM (
  'pending',
  'in transit',
  'delivered'
);
ALTER TYPE "public"."enum_orders_status" OWNER TO "postgres";

-- ----------------------------
-- Type structure for enum_users_rol
-- ----------------------------
DROP TYPE IF EXISTS "public"."enum_users_rol";
CREATE TYPE "public"."enum_users_rol" AS ENUM (
  'admin',
  'analista'
);
ALTER TYPE "public"."enum_users_rol" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for addresses_id_address_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."addresses_id_address_seq";
CREATE SEQUENCE "public"."addresses_id_address_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."addresses_id_address_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for customers_id_customer_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."customers_id_customer_seq";
CREATE SEQUENCE "public"."customers_id_customer_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."customers_id_customer_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for orderDetail_id_detail_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orderDetail_id_detail_seq";
CREATE SEQUENCE "public"."orderDetail_id_detail_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."orderDetail_id_detail_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for orders_id_order_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orders_id_order_seq";
CREATE SEQUENCE "public"."orders_id_order_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."orders_id_order_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for products_id_product_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."products_id_product_seq";
CREATE SEQUENCE "public"."products_id_product_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."products_id_product_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for stock_id_stock_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."stock_id_stock_seq";
CREATE SEQUENCE "public"."stock_id_stock_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."stock_id_stock_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for storehouses_id_storehouse_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."storehouses_id_storehouse_seq";
CREATE SEQUENCE "public"."storehouses_id_storehouse_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."storehouses_id_storehouse_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for users_id_user_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_user_seq";
CREATE SEQUENCE "public"."users_id_user_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "public"."users_id_user_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for addresses
-- ----------------------------
DROP TABLE IF EXISTS "public"."addresses";
CREATE TABLE "public"."addresses" (
  "id_address" int4 NOT NULL DEFAULT nextval('addresses_id_address_seq'::regclass),
  "customer_id" int4,
  "address" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "city" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."addresses" OWNER TO "postgres";

-- ----------------------------
-- Records of addresses
-- ----------------------------
BEGIN;
INSERT INTO "public"."addresses" ("id_address", "customer_id", "address", "city", "is_active", "createdAt", "updatedAt") VALUES (1, 1, 'Calle 45 #67-89', 'Bogotá', 't', '2025-10-18 17:26:56.753+00', '2025-10-18 17:26:56.753+00');
INSERT INTO "public"."addresses" ("id_address", "customer_id", "address", "city", "is_active", "createdAt", "updatedAt") VALUES (2, 1, 'Carrera 12 #34-56', 'Medellín', 't', '2025-10-18 17:26:56.753+00', '2025-10-18 17:26:56.753+00');
INSERT INTO "public"."addresses" ("id_address", "customer_id", "address", "city", "is_active", "createdAt", "updatedAt") VALUES (3, 2, 'Calle 80 #90-12', 'Barranquilla', 't', '2025-10-18 17:26:56.753+00', '2025-10-18 17:26:56.753+00');
INSERT INTO "public"."addresses" ("id_address", "customer_id", "address", "city", "is_active", "createdAt", "updatedAt") VALUES (4, 3, 'Av. Bolívar #199', 'Cartagena', 't', '2025-10-18 17:26:56.753+00', '2025-10-18 17:26:56.753+00');
COMMIT;

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS "public"."customers";
CREATE TABLE "public"."customers" (
  "id_customer" int4 NOT NULL DEFAULT nextval('customers_id_customer_seq'::regclass),
  "identification" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."customers" OWNER TO "postgres";

-- ----------------------------
-- Records of customers
-- ----------------------------
BEGIN;
INSERT INTO "public"."customers" ("id_customer", "identification", "name", "email", "is_active", "createdAt", "updatedAt") VALUES (1, '10100100', 'Logística SAS', 'contacto@logisticasas.com', 't', '2025-10-18 17:26:56.75+00', '2025-10-18 17:26:56.75+00');
INSERT INTO "public"."customers" ("id_customer", "identification", "name", "email", "is_active", "createdAt", "updatedAt") VALUES (2, '10100101', 'Comercial del Norte', 'norte@comercial.com', 't', '2025-10-18 17:26:56.75+00', '2025-10-18 17:26:56.75+00');
INSERT INTO "public"."customers" ("id_customer", "identification", "name", "email", "is_active", "createdAt", "updatedAt") VALUES (3, '10100102', 'Express Solutions', 'ventas@express.com', 't', '2025-10-18 17:26:56.75+00', '2025-10-18 17:26:56.75+00');
COMMIT;

-- ----------------------------
-- Table structure for orderDetail
-- ----------------------------
DROP TABLE IF EXISTS "public"."orderDetail";
CREATE TABLE "public"."orderDetail" (
  "id_detail" int4 NOT NULL DEFAULT nextval('"orderDetail_id_detail_seq"'::regclass),
  "order_id" int4,
  "product_id" int4,
  "quantity" numeric(10,2) NOT NULL,
  "subtotal" numeric(10,2) NOT NULL,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."orderDetail" OWNER TO "postgres";

-- ----------------------------
-- Records of orderDetail
-- ----------------------------
BEGIN;
INSERT INTO "public"."orderDetail" ("id_detail", "order_id", "product_id", "quantity", "subtotal", "createdAt", "updatedAt") VALUES (1, 1, 1, 5.00, 22500.00, '2025-10-18 17:26:56.765+00', '2025-10-18 17:26:56.765+00');
INSERT INTO "public"."orderDetail" ("id_detail", "order_id", "product_id", "quantity", "subtotal", "createdAt", "updatedAt") VALUES (2, 1, 3, 10.00, 35000.00, '2025-10-18 17:26:56.765+00', '2025-10-18 17:26:56.765+00');
INSERT INTO "public"."orderDetail" ("id_detail", "order_id", "product_id", "quantity", "subtotal", "createdAt", "updatedAt") VALUES (3, 2, 2, 3.00, 84000.00, '2025-10-18 17:26:56.765+00', '2025-10-18 17:26:56.765+00');
INSERT INTO "public"."orderDetail" ("id_detail", "order_id", "product_id", "quantity", "subtotal", "createdAt", "updatedAt") VALUES (4, 3, 4, 2.00, 16000.00, '2025-10-18 17:26:56.765+00', '2025-10-18 17:26:56.765+00');
INSERT INTO "public"."orderDetail" ("id_detail", "order_id", "product_id", "quantity", "subtotal", "createdAt", "updatedAt") VALUES (5, 3, 3, 5.00, 17500.00, '2025-10-18 17:26:56.765+00', '2025-10-18 17:26:56.765+00');
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS "public"."orders";
CREATE TABLE "public"."orders" (
  "id_order" int4 NOT NULL DEFAULT nextval('orders_id_order_seq'::regclass),
  "customer_id" int4,
  "address_id" int4,
  "storehouse_id" int4,
  "created_by" int4,
  "status" "public"."enum_orders_status" NOT NULL DEFAULT 'pending'::enum_orders_status,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."orders" OWNER TO "postgres";

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
INSERT INTO "public"."orders" ("id_order", "customer_id", "address_id", "storehouse_id", "created_by", "status", "createdAt", "updatedAt") VALUES (1, 1, 1, 1, 1, 'pending', '2025-10-18 17:26:56.763+00', '2025-10-18 17:26:56.763+00');
INSERT INTO "public"."orders" ("id_order", "customer_id", "address_id", "storehouse_id", "created_by", "status", "createdAt", "updatedAt") VALUES (2, 2, 3, 3, 2, 'in transit', '2025-10-18 17:26:56.763+00', '2025-10-18 17:26:56.763+00');
INSERT INTO "public"."orders" ("id_order", "customer_id", "address_id", "storehouse_id", "created_by", "status", "createdAt", "updatedAt") VALUES (3, 3, 4, 2, 1, 'delivered', '2025-10-18 17:26:56.763+00', '2025-10-18 17:26:56.763+00');
COMMIT;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS "public"."products";
CREATE TABLE "public"."products" (
  "id_product" int4 NOT NULL DEFAULT nextval('products_id_product_seq'::regclass),
  "code" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "description" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "price" numeric(10,2) NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."products" OWNER TO "postgres";

-- ----------------------------
-- Records of products
-- ----------------------------
BEGIN;
INSERT INTO "public"."products" ("id_product", "code", "name", "description", "price", "is_active", "createdAt", "updatedAt") VALUES (1, 'P001', 'Caja de cartón', 'Caja resistente para embalaje', 4500.00, 't', '2025-10-18 17:26:56.758+00', '2025-10-18 17:26:56.758+00');
INSERT INTO "public"."products" ("id_product", "code", "name", "description", "price", "is_active", "createdAt", "updatedAt") VALUES (2, 'P002', 'Palé plástico', 'Palé reutilizable para transporte', 28000.00, 't', '2025-10-18 17:26:56.758+00', '2025-10-18 17:26:56.758+00');
INSERT INTO "public"."products" ("id_product", "code", "name", "description", "price", "is_active", "createdAt", "updatedAt") VALUES (3, 'P003', 'Cinta adhesiva', 'Ancho 5cm x 50m', 3500.00, 't', '2025-10-18 17:26:56.758+00', '2025-10-18 17:26:56.758+00');
INSERT INTO "public"."products" ("id_product", "code", "name", "description", "price", "is_active", "createdAt", "updatedAt") VALUES (4, 'P004', 'Empaque burbuja', 'Rollo 10m', 8000.00, 't', '2025-10-18 17:26:56.758+00', '2025-10-18 17:26:56.758+00');
COMMIT;

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS "public"."stock";
CREATE TABLE "public"."stock" (
  "id_stock" int4 NOT NULL DEFAULT nextval('stock_id_stock_seq'::regclass),
  "storehouse_id" int4,
  "product_id" int4,
  "quantity" int4 NOT NULL,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."stock" OWNER TO "postgres";

-- ----------------------------
-- Records of stock
-- ----------------------------
BEGIN;
INSERT INTO "public"."stock" ("id_stock", "storehouse_id", "product_id", "quantity", "createdAt", "updatedAt") VALUES (1, 1, 1, 120, '2025-10-18 17:26:56.76+00', '2025-10-18 17:26:56.76+00');
INSERT INTO "public"."stock" ("id_stock", "storehouse_id", "product_id", "quantity", "createdAt", "updatedAt") VALUES (2, 1, 2, 45, '2025-10-18 17:26:56.76+00', '2025-10-18 17:26:56.76+00');
INSERT INTO "public"."stock" ("id_stock", "storehouse_id", "product_id", "quantity", "createdAt", "updatedAt") VALUES (3, 1, 3, 200, '2025-10-18 17:26:56.76+00', '2025-10-18 17:26:56.76+00');
INSERT INTO "public"."stock" ("id_stock", "storehouse_id", "product_id", "quantity", "createdAt", "updatedAt") VALUES (4, 2, 1, 80, '2025-10-18 17:26:56.76+00', '2025-10-18 17:26:56.76+00');
INSERT INTO "public"."stock" ("id_stock", "storehouse_id", "product_id", "quantity", "createdAt", "updatedAt") VALUES (5, 2, 3, 100, '2025-10-18 17:26:56.76+00', '2025-10-18 17:26:56.76+00');
INSERT INTO "public"."stock" ("id_stock", "storehouse_id", "product_id", "quantity", "createdAt", "updatedAt") VALUES (6, 3, 4, 60, '2025-10-18 17:26:56.76+00', '2025-10-18 17:26:56.76+00');
INSERT INTO "public"."stock" ("id_stock", "storehouse_id", "product_id", "quantity", "createdAt", "updatedAt") VALUES (7, 3, 2, 25, '2025-10-18 17:26:56.76+00', '2025-10-18 17:26:56.76+00');
COMMIT;

-- ----------------------------
-- Table structure for storehouses
-- ----------------------------
DROP TABLE IF EXISTS "public"."storehouses";
CREATE TABLE "public"."storehouses" (
  "id_storehouse" int4 NOT NULL DEFAULT nextval('storehouses_id_storehouse_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "address" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."storehouses" OWNER TO "postgres";

-- ----------------------------
-- Records of storehouses
-- ----------------------------
BEGIN;
INSERT INTO "public"."storehouses" ("id_storehouse", "name", "address", "is_active", "createdAt", "updatedAt") VALUES (1, 'Bodega Central', 'Bogotá', 't', '2025-10-18 17:26:56.755+00', '2025-10-18 17:26:56.755+00');
INSERT INTO "public"."storehouses" ("id_storehouse", "name", "address", "is_active", "createdAt", "updatedAt") VALUES (2, 'Bodega Norte', 'Medellín', 't', '2025-10-18 17:26:56.755+00', '2025-10-18 17:26:56.755+00');
INSERT INTO "public"."storehouses" ("id_storehouse", "name", "address", "is_active", "createdAt", "updatedAt") VALUES (3, 'Bodega Caribe', 'Barranquilla', 't', '2025-10-18 17:26:56.755+00', '2025-10-18 17:26:56.755+00');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id_user" int4 NOT NULL DEFAULT nextval('users_id_user_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "rol" "public"."enum_users_rol" NOT NULL,
  "is_active" bool NOT NULL DEFAULT true,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;
ALTER TABLE "public"."users" OWNER TO "postgres";

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO "public"."users" ("id_user", "name", "email", "password", "rol", "is_active", "createdAt", "updatedAt") VALUES (1, 'Admin User', 'admin@fhl.com', '$2a$10$Kj8b0pae123456789exampleHash', 'admin', 't', '2025-10-18 17:26:56.744+00', '2025-10-18 17:26:56.744+00');
INSERT INTO "public"."users" ("id_user", "name", "email", "password", "rol", "is_active", "createdAt", "updatedAt") VALUES (2, 'Analyst User', 'analyst@fhl.com', '$2a$10$Kj8b0pae987654321exampleHash', 'analista', 't', '2025-10-18 17:26:56.744+00', '2025-10-18 17:26:56.744+00');
COMMIT;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."addresses_id_address_seq"
OWNED BY "public"."addresses"."id_address";
SELECT setval('"public"."addresses_id_address_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."customers_id_customer_seq"
OWNED BY "public"."customers"."id_customer";
SELECT setval('"public"."customers_id_customer_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."orderDetail_id_detail_seq"
OWNED BY "public"."orderDetail"."id_detail";
SELECT setval('"public"."orderDetail_id_detail_seq"', 5, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."orders_id_order_seq"
OWNED BY "public"."orders"."id_order";
SELECT setval('"public"."orders_id_order_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."products_id_product_seq"
OWNED BY "public"."products"."id_product";
SELECT setval('"public"."products_id_product_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."stock_id_stock_seq"
OWNED BY "public"."stock"."id_stock";
SELECT setval('"public"."stock_id_stock_seq"', 7, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."storehouses_id_storehouse_seq"
OWNED BY "public"."storehouses"."id_storehouse";
SELECT setval('"public"."storehouses_id_storehouse_seq"', 3, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_user_seq"
OWNED BY "public"."users"."id_user";
SELECT setval('"public"."users_id_user_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table addresses
-- ----------------------------
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id_address");

-- ----------------------------
-- Uniques structure for table customers
-- ----------------------------
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_identification_key" UNIQUE ("identification");
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table customers
-- ----------------------------
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id_customer");

-- ----------------------------
-- Primary Key structure for table orderDetail
-- ----------------------------
ALTER TABLE "public"."orderDetail" ADD CONSTRAINT "orderDetail_pkey" PRIMARY KEY ("id_detail");

-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id_order");

-- ----------------------------
-- Primary Key structure for table products
-- ----------------------------
ALTER TABLE "public"."products" ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id_product");

-- ----------------------------
-- Primary Key structure for table stock
-- ----------------------------
ALTER TABLE "public"."stock" ADD CONSTRAINT "stock_pkey" PRIMARY KEY ("id_stock");

-- ----------------------------
-- Primary Key structure for table storehouses
-- ----------------------------
ALTER TABLE "public"."storehouses" ADD CONSTRAINT "storehouses_pkey" PRIMARY KEY ("id_storehouse");

-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id_user");

-- ----------------------------
-- Foreign Keys structure for table addresses
-- ----------------------------
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers" ("id_customer") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table orderDetail
-- ----------------------------
ALTER TABLE "public"."orderDetail" ADD CONSTRAINT "orderDetail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id_order") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."orderDetail" ADD CONSTRAINT "orderDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id_product") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses" ("id_address") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."users" ("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers" ("id_customer") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_storehouse_id_fkey" FOREIGN KEY ("storehouse_id") REFERENCES "public"."storehouses" ("id_storehouse") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table stock
-- ----------------------------
ALTER TABLE "public"."stock" ADD CONSTRAINT "stock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products" ("id_product") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."stock" ADD CONSTRAINT "stock_storehouse_id_fkey" FOREIGN KEY ("storehouse_id") REFERENCES "public"."storehouses" ("id_storehouse") ON DELETE CASCADE ON UPDATE CASCADE;
