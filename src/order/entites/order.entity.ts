import { Field, ObjectType } from '@nestjs/graphql';
import { ParentEntity } from 'src/common/model/parent.entity';
import { Customer } from 'src/customer/entites/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { DateTimeScalar } from 'src/utility/date-time.scalar';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';

/**
 * Represents an Order in the system.
 * 
 * This entity captures details about an order, including its associated
 * products and customer.
 */
@ObjectType()
@Entity()
export class Order extends ParentEntity {
  /**
   * Unique identifier for the order.
   */
  @Field(() => String, { name: 'orderId' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The unique order number.
   */
  @Field()
  @Column()
  orderNumber: string;

  /**
   * The date when the order was placed.
   */
  @Field()
  @CreateDateColumn({ type: 'timestamp'})
  orderDate: Date;

  /**
   * List of products included in the order.
   */
  @Field(() => [Product])
  @ManyToMany(() => Product, product => product.orders)
  @JoinTable() // Ensure that a join table is created for the many-to-many relationship
  products: Product[];

  /**
   * The customer who placed the order.
   */
  @Field(() => Customer)
  @ManyToOne(() => Customer, customer => customer.orders, { cascade: true, nullable: false })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
}
