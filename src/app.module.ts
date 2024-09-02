import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CustomerModule } from './customer/customer.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { configService } from './config/config.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
      context: ({ req }) => ({ headers: req.headers }),      
    }),    
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CustomerModule,
    ProductModule,
    OrderModule
  ],
  providers: [],
})
export class AppModule {}
