import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerResolver } from './customer.resolver';
import { Customer } from './entites/customer.entity';
import { CustomerService } from './service/customer.service';

/**
 * The CustomerModule is responsible for managing the customer-related features
 * in the application. It imports the necessary TypeORM module to access the
 * Customer entity and provides the CustomerService and CustomerResolver.
 */
@Module({
  imports: [
    // Import TypeOrmModule with the Customer entity for data access
    TypeOrmModule.forFeature([Customer])]
  ,
  providers: [
    // Register the CustomerService and CustomerResolver for dependency injection
    CustomerService, CustomerResolver
  ],
  exports: [
    // Export CustomerService to make it available for other modules
    CustomerService
  ],
})
export class CustomerModule { }
