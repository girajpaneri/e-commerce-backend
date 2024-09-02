import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateOrderInput } from './create-order.input';
import { IsOptional, IsString, IsArray, IsUUID, IsDateString } from 'class-validator';

/**
 * Input type for updating an existing Order.
 * 
 * This type extends the CreateOrderInput type to allow partial updates
 * of an Order. Fields are optional to enable updating specific parts
 * of an Order without providing the entire object.
 */
@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  /**
   * The unique identifier of the order.
   * This field is required to identify which order to update.
   */
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  id?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  orderDate?: Date;

  /**
   * The list of product IDs to be associated with the order.
   * This field is optional and allows updating the products in the order.
   */
  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  productIds?: string[];

  // Optionally include other fields if required for updates
}
