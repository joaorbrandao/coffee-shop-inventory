import { CreateProductDto } from '../create-product.dto';

export class CreateProductDtoFixture {
  static new(partial?: Partial<CreateProductDto>): CreateProductDto {
    return {
      name: 'Espresso Drinks',
      price: 10,
      stock: 1,
      category: 1,
      ...partial,
    };
  }
}
