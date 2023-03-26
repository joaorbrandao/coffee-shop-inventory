import { UpdateProductDto } from '../update-product.dto';

export class UpdateProductDtoFixture {
  static new(partial?: Partial<UpdateProductDto>): UpdateProductDto {
    return {
      name: 'Espresso Drinks',
      price: 10,
      stock: 1,
      category: 1,
      ...partial,
    };
  }
}
