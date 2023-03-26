import { CreateCategoryDto } from '../create-category.dto';

export class CreateCategoryDtoFixture {
  static new(partial?: Partial<CreateCategoryDto>): CreateCategoryDto {
    return {
      name: 'Espresso Drinks',
      ...partial,
    };
  }
}
