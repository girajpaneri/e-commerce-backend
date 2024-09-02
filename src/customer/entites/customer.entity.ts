import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ParentEntity } from 'src/common/model/parent.entity';
import { Order } from 'src/order/entites/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

/**
 * Represents a customer in the system.
 * 
 * The Customer entity holds details about a customer including their name,
 * phone number, email, and associated orders. The name is required, while
 * phone and email are optional. Orders are a one-to-many relationship.
 */
@ObjectType({
  description: 'Represents a customer in the system.'
})
@Entity()
export class Customer extends ParentEntity {
  /**
   * The unique identifier for the customer.
   * This field is automatically generated and is required.
   */
  @Field(() => String, { name: 'customerId' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The name of the customer. This field is required and must be a string.
   */
  @Field()
  @Column()
  @IsString() // Validation to ensure name is a string
  name: string;

  /**
   * The phone number of the customer. This field is optional. If provided,
   * it must be a valid phone number format.
   */
  @Field({ description: '10 digit phone number.', nullable: true })
  @Column({ nullable: true })
  @IsOptional() // Optional field
  @IsPhoneNumber(null, { message: 'Invalid phone number format' }) // Validation for phone number format
  phone?: string;

  /**
   * The email address of the customer. This field is optional. If provided,
   * it must be a valid email format.
   */
  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional() // Optional field
  @IsEmail({}, { message: 'Invalid email format' }) // Validation for email format
  email?: string;

  /**
   * The orders associated with the customer. This is a one-to-many relationship.
   * If provided, this field can be an array of Order entities.
   */
  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, order => order.customer)
  orders?: Order[];
}
