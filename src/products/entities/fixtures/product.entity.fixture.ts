import { Product } from '../product.entity';
import { Category } from '../../../categories/entities/category.entity';

export class ProductFixture {
  static new(partial?: Partial<Product>): Product {
    return {
      id: 1,
      name: 'Espresso Drinks',
      price: 10,
      stock: 1,
      category: {} as Category,
      ...partial,
    };
  }
}
