import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entites/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { Order } from '../entites/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

    /**
   * Retrieve all orders with their associated products and customer.
   */
  async findAll(): Promise<Order[]> {
    return this.orderRepo.find({ relations: ['products', 'customer'] });
  }

  /**
   * Retrieve a single order by its ID with associated products and customer.
   * @param id The ID of the order to retrieve.
   */
  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['products', 'customer'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  /**
   * Create a new order with the provided input.
   * @param input The data used to create the order.
   */
  async create(input: CreateOrderInput): Promise<Order> {
    const { productIds, customerId, orderDate, ...rest } = input;

    // Fetch products and customer concurrently
    const [products, customer] = await Promise.all([
      this.productRepo.findBy({ id: In(productIds) }), // Use 'In' for multiple IDs
      this.customerRepo.findOneBy({ id: customerId })
    ]);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    // Ensure all products are found
    if (products.length !== productIds.length) {
      throw new NotFoundException('Some products not found');
    }

    // Create and save the order
    const order = this.orderRepo.create({
      ...rest,
      orderDate: new Date(orderDate),
      products,
      customer,
    });

    return this.orderRepo.save(order);
  }

    /**
   * Update an existing order with the provided input.
   * @param id The ID of the order to update.
   * @param updateOrderInput The data used to update the order.
   */
    async update(id: string, updateOrderInput: UpdateOrderInput): Promise<Order> {
      // Fetch the existing order
      const order = await this.orderRepo.findOne({
        where: { id },
        relations: ['products', 'customer'],
      });
  
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
  
      // Update order fields
      const { customerId, productIds, ...rest } = updateOrderInput;
      Object.assign(order, rest);
  
      // Handle customer update
      if (customerId) {
        const customer = await this.customerRepo.findOneBy({ id: customerId });
        if (!customer) {
          throw new NotFoundException(`Customer with ID ${customerId} not found`);
        }
        order.customer = customer;
      }
  
      // Handle product updates
      if (productIds) {
        const products = await this.productRepo.findBy({ id: In(productIds) });
        if (products.length !== productIds.length) {
          throw new NotFoundException('Some products not found');
        }
        order.products = products;
      }
  
      // Save the updated order
      return this.orderRepo.save(order);
    }
  

  /**
   * Remove an order by its ID.
   * @param id The ID of the order to delete.
   */
  async remove(id: string): Promise<string> {
    const result = await this.orderRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return `Order with ID ${id} deleted`;
  }

    /**
   * Add a product to an existing order.
   * @param orderId The ID of the order to update.
   * @param productId The ID of the product to add.
   */
    async addProductToOrder(orderId: string, productId: string): Promise<Order> {
      const order = await this.orderRepo.findOne({
        where: { id: orderId },
        relations: ['products', 'customer'],
      });
      const product = await this.productRepo.findOneBy({ id: productId });
  
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
  
      if (!order.products.some(p => p.id === productId)) {
        order.products.push(product);
        await this.orderRepo.save(order);
      }
  
      return order;
    }


  /**
   * Remove a product from an existing order.
   * @param orderId The ID of the order to update.
   * @param productId The ID of the product to remove.
   */
  async removeProduct(orderId: string, productId: string): Promise<Order> {
    const order = await this.findOne(orderId);

    // Ensure the product exists in the order
    if (!order.products.some(p => p.id === productId)) {
      throw new NotFoundException(`Product with ID ${productId} not found in the order`);
    }

    // Remove product from the order
    order.products = order.products.filter(p => p.id !== productId);
    return this.orderRepo.save(order);
  }
}
