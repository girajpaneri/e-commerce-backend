import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ParentEntity } from 'src/common/model/parent.entity';
import { Order } from 'src/order/entites/order.entity';

/**
 * Represents a product in the system.
 * Extends ParentEntity to include common fields like creation and update dates.
 */
@ObjectType()
@Entity()
export class Product extends ParentEntity {
  
  /**
   * Unique identifier for the product.
   * Automatically generated UUID.
   */
  @Field(() => String, { name: 'productId' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Name of the product.
   */
  @Field()
  @Column()
  name: string;

  /**
   * Price of the product.
   */
  @Field()
  @Column('float')
  price: number;

  /**
   * Orders that include this product.
   * Many-to-many relationship with the Order entity.
   */
  @Field(() => [Order], { nullable: true })
  @ManyToMany(() => Order, (order) => order.products)
  orders?: Order[];
}
