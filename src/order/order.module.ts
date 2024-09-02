import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderResolver } from './order.resolver';
import { OrderService } from './service/order.service';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entites/customer.entity';
import { Order } from './entites/order.entity';

@Module({
  imports: [
    // Import TypeORM modules for Order, Product, and Customer entities
    TypeOrmModule.forFeature([Order, Product, Customer]),
  ],
  providers: [
    // Register OrderService and OrderResolver as providers
    OrderService,
    OrderResolver,
  ],
  exports: [
    // Export OrderService to be used in other modules
    OrderService,
  ],
})
export class OrderModule {}
