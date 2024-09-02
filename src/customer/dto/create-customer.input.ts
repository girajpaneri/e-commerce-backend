import { InputType, Field, OmitType } from '@nestjs/graphql';
import { AddOrderInput } from 'src/order/dto/add-order.input';
import { Customer } from '../entites/customer.entity';

/**
 * Input type for creating a new Customer.
 * 
 * This type omits fields from the Customer entity that should not be set during creation,
 * such as 'id', 'createDate', 'updateDate', and 'orders'. 
 * It also includes a field for adding related orders if needed.
 */
@InputType()
export class CreateCustomerInput extends OmitType(
  Customer,
  [
    'id', 
    'isActive',
    'createDate', 
    'updateDate', 
    'orders'
  ], // Fields to omit
  InputType
) {
  /**
   * List of orders associated with the new customer.
   * This field is optional and can be provided as an array of AddOrderInput objects.
   */
  @Field(() => [AddOrderInput], { nullable: true })
  orders?: AddOrderInput[]; // Made nullable and optional
}
