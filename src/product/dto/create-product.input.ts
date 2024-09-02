import { InputType, Field, OmitType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';
import { AddOrderInput } from 'src/order/dto/add-order.input';

/**
 * Input type for creating a new product.
 * It omits fields not required for creation and includes order associations.
 */
@InputType()
export class CreateProductInput extends OmitType(
  Product,
  [
    'id',
    'createDate',
    'updateDate',
    'orders',
  ],  // Fields to omit
  InputType) {

  /**
   * List of orders associated with the product.
   * This field is optional.
   */
  @Field(() => [AddOrderInput], { nullable: true })
  orders?: AddOrderInput[];
}
