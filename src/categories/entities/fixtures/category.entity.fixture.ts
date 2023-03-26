import { Category } from '../category.entity';
import { Product } from '../../../products/entities/product.entity';

export class CategoryFixture {
  static new(partial?: Partial<Category>): Category {
    return {
      id: 1,
      name: 'Espresso Drinks',
      products: [{} as Product],
      ...partial,
    };
  }
}
