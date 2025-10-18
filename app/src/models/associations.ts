// app/src/models/associations.ts

// Import all models to define their relationships
import User from "./user.model";
import Customer from "./customer.model";
import Address from "./address.model";
import Storehouse from "./storehouse.model";
import Product from "./product.model";
import Order from "./order.model";
import OrderDetail from "./orderDetail.model";
import Stock from "./stock.model";

// Function to define all model associations (relationships)
export const associations = () => {
    // One Customer can have many Addresses
    Customer.hasMany(Address, { foreignKey: "customer_id", as: "addresses" });
    Address.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

    // One Customer can have many Orders
    Customer.hasMany(Order, { foreignKey: "customer_id", as: "orders" });
    Order.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });

    // One Address can have many Orders (shipping address)
    Address.hasMany(Order, { foreignKey: "address_id", as: "orders" });
    Order.belongsTo(Address, { foreignKey: "address_id", as: "address" });

    // One Storehouse can have many Orders
    Storehouse.hasMany(Order, { foreignKey: "storehouse_id", as: "orders" });
    Order.belongsTo(Storehouse, { foreignKey: "storehouse_id", as: "storehouse" });

    // One User can create many Orders
    User.hasMany(Order, { foreignKey: "created_by", as: "createdOrders" });
    Order.belongsTo(User, { foreignKey: "created_by", as: "creator" });

    // One Storehouse can have many Stocks
    Storehouse.hasMany(Stock, { foreignKey: "storehouse_id", as: "stocks" });
    Stock.belongsTo(Storehouse, { foreignKey: "storehouse_id", as: "storehouse" });

    // One Product can have many Stocks
    Product.hasMany(Stock, { foreignKey: "product_id", as: "stocks" });
    Stock.belongsTo(Product, { foreignKey: "product_id", as: "product" });

    // One Order can have many OrderDetails
    Order.hasMany(OrderDetail, { foreignKey: "order_id", as: "details" });
    OrderDetail.belongsTo(Order, { foreignKey: "order_id", as: "order" });

    // One Product can have many OrderDetails
    Product.hasMany(OrderDetail, { foreignKey: "product_id", as: "orderDetails" });
    OrderDetail.belongsTo(Product, { foreignKey: "product_id", as: "product" });
}
