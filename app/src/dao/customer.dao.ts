// src/dao/customer.dao.ts

import { CreateCustomerDto, UpdateCustomerDto } from "../dto/customer.dto";
import { Customer } from "../models";

/**
 * Data Access Object (DAO) for handling Customer database operations.
 */
export class CustomerDAO {
  /**
   * Retrieves all customers from the database.
   *
   * @returns {Promise<Customer[]>} A promise that resolves with a list of customer records.
   *
   * This method:
   * - Selects only specific columns to avoid sending unnecessary data.
   * - Orders the results by `id_customer` in ascending order.
   * - Wraps the database call in a try/catch for robust error handling.
   */
  static async getAllCustomers(): Promise<Customer[]> {
    try {
      const customers = await Customer.findAll({
        attributes: [
          "id_customer",
          "identification",
          "name",
          "email",
          "is_active",
          "createdAt",
        ],
        order: [["id_customer", "ASC"]], // Sort results by customer ID
        where: { is_active: true },
      });

      return customers;
    } catch (error) {
      // Log the detailed error for debugging
      console.error("Error fetching customers:", error);

      // Throw a generic error to avoid leaking database details to clients
      throw new Error("Database error while fetching customers.");
    }
  }

  /**
   * Creates a new customer in the database.
   *
   * @param data - Object containing the customer's creation attributes (e.g., name, email, identification).
   * @returns The newly created customer record.
   * @throws Error if a customer with the same email already exists or if a database operation fails.
   */
  static async createCustomer(data: CreateCustomerDto) {
    try {
      // Check if there is already a customer registered with the provided email
      const existing = await Customer.findOne({
        where: { email: data.email },
      });

      // If found, throw an error to prevent duplicate registration
      if (existing) throw new Error("Customer with this email already exists.");

      // Create a new customer record with the provided data
      const newCustomer = await Customer.create(data);

      // Return the newly created customer
      return newCustomer;
    } catch (error) {
      // Log the error for debugging and rethrow it to be handled by the controller
      console.error("Error creating customer:", error);
      throw error;
    }
  }

  static async updateCustomer(id: number, data: Partial<UpdateCustomerDto>) {
    // Search for an active customer by primary key (ID)
    const customer = await Customer.findOne({
      where: { id_customer: id, is_active: true },
    });

    // If no customer is found, throw an error
    if (!customer) throw new Error("Customer not found.");

    // Update the customer record with the provided data (only specified fields)
    await customer.update(data);

    // Return the updated customer object
    return customer;
  }

  static async deactivateCustomer(id: number) {
    // Search for an active customer by their ID
    // The condition ensures that only customers currently active (is_active = true) can be deactivated.
    const customer = await Customer.findOne({
      where: { id_customer: id, is_active: true },
    });

    // If the customer doesn't exist or is already inactive, throw an error
    if (!customer) throw new Error("Customer not found or already inactive.");

    // Set the customer's active status to false (deactivate)
    customer.is_active = false;

    // Save the updated status to the database
    await customer.save();

    // Return the updated customer object
    return customer;
  }

  static async findCustomerByIdentification(identification: string) {
    // Search for an active customer in the database by their unique identification number.
    // The query ensures that only active customers (is_active = true) are considered.
    const customer = await Customer.findOne({
      where: { identification, is_active: true },
      attributes: [
        "id_customer",
        "identification",
        "name",
        "email",
        "is_active",
        "createdAt",
      ],
    });

    // If no matching record is found, throw an error.
    // This helps the controller return a clear and meaningful message to the client.
    if (!customer) throw new Error("Customer not found or inactive.");

    // Return the customer data if found.
    return customer;
  }
}
