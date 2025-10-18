// src/controllers/customer.controller.ts

import { Request, Response } from "express";
import { CustomerDAO } from "../dao/customer.dao";
import { CreateCustomerDto, SearchCustomerDto, UpdateCustomerDto } from "../dto/customer.dto";

/**
 * Controller function to handle HTTP GET requests for retrieving all customers.
 *
 * This function acts as the communication bridge between the API route
 * and the data access layer (DAO). It focuses purely on handling
 * HTTP-specific logic — validating the request, managing response structure,
 * and returning appropriate HTTP status codes.
 *
 * @route GET /api/customers
 * @returns {JSON} A JSON response with the list of customers and a success message.
 */
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    // Call the DAO layer to retrieve all customers from the database
    const customers = await CustomerDAO.getAllCustomers();

    // Send success response with count and data
    return res.status(200).json({
      message: "Customers fetched successfully.",
      total: customers.length, // Total number of customers found
      data: customers,         // Actual customer records
    });
  } catch (error) {
    // Log detailed error for server-side debugging
    console.error("Error in getAllCustomers controller:", error);

    // Send a safe and user-friendly response
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

/**
 * Controller for creating a new customer (POST /customers)
 * 
 * This controller:
 *  - Validates the request body against the CreateCustomerDto structure.
 *  - Calls the DAO layer to insert a new customer into the database.
 *  - Handles and returns appropriate HTTP responses.
 */
export const createCustomer = async (req: Request, res: Response) => {
  try {
    // Cast and validate the incoming request body as a CreateCustomerDto object
    const dto: CreateCustomerDto = req.body;

    // Call the DAO method to handle business logic and database insertion
    const customer = await CustomerDAO.createCustomer(dto);

    // Respond with status 201 (Created) and the new customer data
    return res.status(201).json({
      message: "Customer created successfully.",
      data: customer,
    });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Error in createCustomer controller:", error);

    // Return a 400 (Bad Request) if a known validation or creation error occurs
    // or a generic message otherwise
    return res.status(400).json({
      message: error.message || "Error creating customer.",
    });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    // Convert the "id" parameter from the request URL to an integer
    const id = parseInt(req.params.id);

    // Cast the request body to the UpdateCustomerDto type for validation
    const dto: UpdateCustomerDto = req.body;

    // Validate that the ID is a valid number
    if (isNaN(id)) return res.status(400).json({ message: "Invalid customer ID." });

    // 🧠 Call the DAO method to update the customer with the provided data
    const updated = await CustomerDAO.updateCustomer(id, dto);

    // Return success response with updated customer data
    return res.status(200).json({
      message: "Customer updated successfully.",
      data: updated,
    });
  } catch (error: any) {
    // Log and return an error message if the update fails
    console.error("Error updating customer:", error);
    return res.status(400).json({ message: error.message || "Error updating customer." });
  }
};

export const deactivateCustomer = async (req: Request, res: Response) => {
  try {
    // Extract and convert the "id" parameter from the request URL to a number
    const id = parseInt(req.params.id);

    // Validate the ID — ensure it’s a number
    if (isNaN(id)) return res.status(400).json({ message: "Invalid customer ID." });

    // Call the DAO method to deactivate the customer
    const customer = await CustomerDAO.deactivateCustomer(id);

    // Return a success response with the updated customer data
    return res.status(200).json({
      message: "Customer deactivated successfully.",
      data: customer,
    });
  } catch (error: any) {
    // Log and handle any error that occurs during the process
    console.error("Error deactivating customer:", error);

    // Send an error response with a descriptive message
    return res.status(400).json({ message: error.message || "Error deactivating customer." });
  }
};

export const searchCustomerByIdentification = async (req: Request, res: Response) => {
  try {
    // Extract the 'identification' field from the request body
    // and cast the request body to the SearchCustomerDto type for validation.
    const { identification }: SearchCustomerDto = req.body ;

    // Call the DAO method to search for a customer by identification.
    // This encapsulates the database logic and ensures the controller remains clean.
    const customer = await CustomerDAO.findCustomerByIdentification(identification);

    // If the customer is found, return a success response with the customer data.
    return res.status(200).json({
      message: "Customer found successfully.",
      data: customer,
    });
  } catch (error: any) {
    // Log the error for debugging purposes (useful for server-side logs).
    console.error("Error searching customer:", error);

    // Return a 404 response if the customer was not found,
    // or a general fallback message if no specific error message exists.
    return res.status(404).json({
      message: error.message || "Customer not found.",
    });
  }
};
