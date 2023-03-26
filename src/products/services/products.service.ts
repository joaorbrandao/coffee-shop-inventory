import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from '../controllers/dtos/create-product.dto';
import { UpdateProductDto } from '../controllers/dtos/update-product.dto';
import { Product } from '../entities/product.entity';
import { DuplicateProductException } from '../exceptions/duplicate-product.exception';
import { CategoriesFacade } from '../../categories/services/categories.facade';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private categoriesFacade: CategoriesFacade,
  ) {}

  list(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  find(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  getProductsByIds(ids: number[]): Promise<Product[]> {
    return this.productsRepository.findBy({
      id: In(ids),
    });
  }

  async allIdsAreExtraProducts(ids: number[]) {
    const extraCategoryId =
      await this.categoriesFacade.getExtraProductCategoryId();

    const nonExtraIds = await this.productsRepository
      .createQueryBuilder()
      .whereInIds(ids)
      .andWhere(`categoryId != ${extraCategoryId}`)
      .getCount();

    if (nonExtraIds > 0) {
      //TODO: Move to a custom exception
      throw new BadRequestException(`Cannot request extras that are drinks!`);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, category: categoryId } = createProductDto;
    const existingProduct = await this.productsRepository.findOneBy({ name });

    if (existingProduct) {
      throw new DuplicateProductException(name);
    }

    const category = await this.categoriesFacade.getOneById(categoryId);

    return this.productsRepository.save({
      ...createProductDto,
      category,
    });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    const { category: categoryId } = updateProductDto;
    const category = await this.categoriesFacade.getOneById(categoryId);

    return this.productsRepository.update(id, {
      ...updateProductDto,
      category,
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.productsRepository.delete(id);
  }
}
