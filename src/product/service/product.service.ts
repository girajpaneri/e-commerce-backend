import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

    /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of Product entities.
   */
  findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

    /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product.
   * @returns A promise that resolves to the Product entity.
   * @throws NotFoundException if the product is not found.
   */
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOneBy({id});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

    /**
   * Creates a new product.
   * @param input - The data to create the new product.
   * @returns A promise that resolves to the created Product entity.
   */
  async create(input: CreateProductInput): Promise<Product> {
    const product = this.productRepo.create(input);
    return this.productRepo.save(product);
  }

  /**
   * Updates an existing product.
   * @param id - The ID of the product to update.
   * @param input - The data to update the product with.
   * @returns A promise that resolves to the updated Product entity.
   * @throws NotFoundException if the product is not found.
   */
  async update(id: string, input: UpdateProductInput): Promise<Product> {
    const product = await this.findOne(id);
    const updatedProduct = Object.assign(product, input);

    // Save and return the updated product
    return this.productRepo.save(updatedProduct);
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns A promise that resolves to a confirmation message.
   * @throws NotFoundException if the product is not found.
   */
  async remove(id: string): Promise<string> {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return `Product with ID ${id} deleted`;
  }
}
