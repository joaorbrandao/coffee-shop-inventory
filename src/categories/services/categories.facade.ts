import { Injectable } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../entities/category.entity';
import { CategoryNotFoundException } from '../exceptions/category-not-found.exception';

/**
 * This class is used as the single entrypoint for all
 * Category related interaction from other domains.
 */
@Injectable()
export class CategoriesFacade {
  constructor(private categoriesService: CategoriesService) {}

  /**
   * Get a full Category entity by its id.
   *
   * @param id
   * @throws CategoryNotFoundException
   * @return Promise<Category>
   */
  async getOneById(id: number): Promise<Category> {
    const category = await this.categoriesService.find(id);

    if (!category) {
      throw new CategoryNotFoundException(id);
    }

    return category;
  }

  /**
   * Get the category ID that represents an "extra" product.
   * A product that can be combined with others.
   *
   * @return Promise<number>
   */
  async getExtraProductCategoryId(): Promise<number> {
    return this.categoriesService.getExtraId();
  }
}
