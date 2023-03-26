import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from '../controllers/dtos/create-category.dto';
import { UpdateCategoryDto } from '../controllers/dtos/update-category.dto';
import { Category } from '../entities/category.entity';
import { DuplicateCategoryException } from '../exceptions/duplicate-category.exception';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  private extraCategoryId = 0;

  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getExtraId() {
    if (this.extraCategoryId != 0) return this.extraCategoryId;

    const extraCategory = await this.categoriesRepository.findOneBy({
      name: 'Extras',
    });

    if (!extraCategory) {
      this.logger.warn(`No 'Extras' category in the database!`);
      return this.extraCategoryId;
    }

    this.extraCategoryId = extraCategory.id;
    return this.extraCategoryId;
  }

  list(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  find(id: number): Promise<Category | null> {
    return this.categoriesRepository.findOneBy({ id });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;
    const existingCategory = await this.categoriesRepository.findOneBy({
      name,
    });

    if (existingCategory) {
      throw new DuplicateCategoryException(name);
    }

    return this.categoriesRepository.save({
      ...createCategoryDto,
    });
  }

  update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    if (id === this.extraCategoryId) {
      throw new NotImplementedException(
        `Sorry! It's still not allowed to change the 'Extras' category!`,
      );
    }

    return this.categoriesRepository.update(id, {
      ...updateCategoryDto,
    });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.categoriesRepository.delete(id);
  }
}
