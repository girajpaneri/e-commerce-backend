import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entites/customer.entity';
import { CreateCustomerInput } from '../dto/create-customer.input';
import { UpdateCustomerInput } from '../dto/update-customer.input';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) { }

  /**
   * Retrieves all customers from the database.
   * @returns A promise that resolves to an array of Customer entities.
   */
  findAll(): Promise<Customer[]> {
    return this.customerRepo.find();
  }

  /**
   * Retrieves a single customer by ID.
   * @param id The ID of the customer to retrieve.
   * @returns A promise that resolves to the Customer entity if found.
   * @throws NotFoundException if the customer is not found.
   */
  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  /**
   * Creates a new customer.
   * @param input The data to create the customer.
   * @returns A promise that resolves to the newly created Customer entity.
   */
  async create(input: CreateCustomerInput): Promise<Customer> {
    // Set the createDate to the current date
    const customer = this.customerRepo.create({
      ...input,
      createDate: new Date(),
    });
    return await this.customerRepo.save(customer);
  }

  /**
 * Updates an existing customer by ID.
 * @param id The ID of the customer to update.
 * @param input The data to update the customer.
 * @returns A promise that resolves to the updated Customer entity.
 * @throws NotFoundException if the customer is not found.
 */
  async update(id: string, input: UpdateCustomerInput): Promise<Customer> {
    const customer = await this.findOne(id);

    if (!customer) {
      throw new NotFoundException("CustomerUpdateService", "Customer not found for user");
    }

    // Set the updateDate to the current date
    const updatedInput = {
      ...customer,
      ...input,
      updateDate: new Date(),
    };
    await this.customerRepo.update(id, updatedInput);
    return this.findOne(id);
  }

  /**
 * Removes a customer by ID.
 * @param id The ID of the customer to remove.
 * @returns A promise that resolves to a success message.
 * @throws NotFoundException if the customer is not found.
 */
  async remove(id: string): Promise<string> {
    const r = await this.customerRepo.delete({ id: id });
    if (r.affected === 0) {
      throw new NotFoundException('Customer not found');
    }
    return `${r.affected} customers deleted!`;
  }
}
