import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './service/customer.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { Customer } from './entites/customer.entity';

/**
 * Resolver to handle GraphQL queries and mutations for the Customer entity.
 * 
 * This resolver exposes endpoints to perform CRUD operations on Customer records,
 * including creating, reading, updating, and deleting customers.
 */
@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Retrieves all customers.
   * @returns A promise resolving to an array of Customer entities.
   */
  @Query(() => [Customer])
  async customers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  /**
   * Retrieves a single customer by their ID.
   * @param id The ID of the customer to retrieve.
   * @returns A promise resolving to the Customer entity if found, or null if not found.
   * @throws NotFoundException if the customer is not found.
   */
  @Query(() => Customer, { nullable: true })
  async customer(@Args('id') id: string): Promise<Customer | null> {
    return this.customerService.findOne(id);
  }

  /**
   * Creates a new customer with the provided input.
   * @param input The data to create a new customer.
   * @returns A promise resolving to the newly created Customer entity.
   */
  @Mutation(() => Customer)
  async createCustomer(@Args('input') input: CreateCustomerInput): Promise<Customer> {
    return this.customerService.create(input);
  }

  /**
   * Updates an existing customer identified by their ID.
   * @param id The ID of the customer to update.
   * @param input The data to update the customer.
   * @returns A promise resolving to the updated Customer entity, or null if not found.
   * @throws NotFoundException if the customer to update is not found.
   */
  @Mutation(() => Customer, { nullable: true })
  async updateCustomer(
    @Args('id') id: string, 
    @Args('input') input: UpdateCustomerInput
  ): Promise<Customer | null> {
    return this.customerService.update(id, input);
  }

  /**
   * Deletes a customer by their ID.
   * @param id The ID of the customer to delete.
   * @returns A promise resolving to a success message indicating the deletion result.
   * @throws NotFoundException if the customer to delete is not found.
   */
  @Mutation(() => String)
  async deleteCustomer(@Args('id') id: string): Promise<string> {
    return this.customerService.remove(id);
  }
}
