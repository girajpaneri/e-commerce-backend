import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';
import { IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * Input type for updating an existing product.
 * Inherits from CreateProductInput with all fields optional.
 */
@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {  
  /**
   * ID of the product to update.
   * This field is optional because the base class already handles other fields.
   */
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUUID()
  productId?: string;
}
