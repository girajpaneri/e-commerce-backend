import { InputType, Field, OmitType } from '@nestjs/graphql';
import { IsArray, IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Order } from '../entites/order.entity';

/**
 * Input type for creating a new Order.
 * 
 * This type omits fields from the Order entity that should not be set during
 * creation, such as 'id', 'createDate', 'updateDate', 'customer', and 'products'.
 */
@InputType()
export class CreateOrderInput extends OmitType(
  Order,
  [
    'id',
    'createDate',
    'updateDate',
    'customer',
    'products'
  ], // Fields to omit
  InputType
) {
  /**
   * The unique identifier of the customer associated with the order.
   * Must be a non-empty string.
   */
  @Field()
  @IsNotEmpty()
  @IsString()
  customerId: string;

  /**
   * The list of product IDs associated with the order.
   * Must be an array of non-empty UUID strings.
   */
  @Field(() => [String])
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  productIds: string[];
}
