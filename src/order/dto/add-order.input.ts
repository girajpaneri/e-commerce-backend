import { InputType, Field } from '@nestjs/graphql';

/**
 * Input type for adding an order reference.
 * 
 * This type is used when an order ID needs to be referenced or associated
 * with another entity or input. For example, it could be used to add an
 * existing order to a customer's list of orders.
 */
@InputType({ description: 'Input type for referencing an order by its ID.' })
export class AddOrderInput {
  /**
   * The unique identifier of the order.
   */
  @Field(() => String, { description: 'The unique identifier of the order.' })
  id: string;
}
