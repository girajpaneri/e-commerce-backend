import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductService } from './service/product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of Product entities.
   */
  @Query(() => [Product], { description: 'Get all products' })
  async products(): Promise<Product[]> {
    return this.productService.findAll();
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns A promise that resolves to the Product entity, or null if not found.
   */
  @Query(() => Product, { nullable: true, description: 'Get a product by ID' })
  async product(@Args('id', { type: () => String }) id: string): Promise<Product | null> {
    return this.productService.findOne(id);
  }

  /**
   * Creates a new product.
   * @param input - The data to create the new product.
   * @returns A promise that resolves to the created Product entity.
   */
  @Mutation(() => Product, { description: 'Create a new product' })
  async createProduct(
    @Args('input') input: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(input);
  }

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param input - The data to update the product with.
   * @returns A promise that resolves to the updated Product entity.
   */
  @Mutation(() => Product, { description: 'Update an existing product' })
  async updateProduct(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(id, input);
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves to a confirmation message.
   */
  @Mutation(() => String, { description: 'Delete a product by ID' })
  async deleteProduct(@Args('id', { type: () => String }) id: string): Promise<string> {
    return this.productService.remove(id);
  }
}
