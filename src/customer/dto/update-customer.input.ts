import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCustomerInput } from './create-customer.input';

/**
 * Input type for updating an existing Customer.
 * 
 * This type extends CreateCustomerInput to allow partial updates,
 * meaning that only some fields can be provided. It also includes 
 * a required field for specifying the customer ID to update.
 */
@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  /**
   * The ID of the customer to be updated.
   * This field is required and used to identify which customer to update.
   */
  @Field(() => String, { nullable: true })
  customerId: string;
}
