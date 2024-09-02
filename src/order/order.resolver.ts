import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderService } from './service/order.service';
import { Order } from './entites/order.entity';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Retrieves all orders.
   * @returns A list of all orders.
   */
  @Query(() => [Order])
  async orders(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  /**
   * Retrieves a single order by its ID.
   * @param id The ID of the order to retrieve.
   * @returns The order with the given ID.
   */
  @Query(() => Order)
  async order(@Args('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  /**
   * Creates a new order.
   * @param input The input data for creating the order.
   * @returns The created order.
   */
  @Mutation(() => Order)
  async createOrder(@Args('input') input: CreateOrderInput): Promise<Order> {
    return this.orderService.create(input);
  }

  /**
   * Updates an existing order.
   * @param id The ID of the order to update.
   * @param input The input data for updating the order.
   * @returns The updated order.
   */
  @Mutation(() => Order)
  async updateOrder(
    @Args('id') id: string,
    @Args('input') input: UpdateOrderInput,
  ): Promise<Order> {
    return this.orderService.update(id, input);
  }

  /**
   * Deletes an order by its ID.
   * @param id The ID of the order to delete.
   * @returns A boolean indicating the success of the operation.
   */
  @Mutation(() => Boolean)
  async deleteOrder(@Args('id') id: string): Promise<boolean> {
    await this.orderService.remove(id);
    return true; // Return true if deletion was successful
  }

  /**
   * Adds a product to an existing order.
   * @param orderId The ID of the order to update.
   * @param productId The ID of the product to add.
   * @returns The updated order with the added product.
   */
  @Mutation(() => Order)
  async addProductToOrder(
    @Args('orderId') orderId: string,
    @Args('productId') productId: string,
  ): Promise<Order> {
    return this.orderService.addProductToOrder(orderId, productId);
  }

  /**
   * Removes a product from an existing order.
   * @param orderId The ID of the order to update.
   * @param productId The ID of the product to remove.
   * @returns The updated order with the product removed.
   */
  @Mutation(() => Order)
  async removeProductFromOrder(
    @Args('orderId') orderId: string,
    @Args('productId') productId: string,
  ): Promise<Order> {
    return this.orderService.removeProduct(orderId, productId);
  }
}
