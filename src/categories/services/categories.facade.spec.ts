import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { CategoryNotFoundException } from '../../categories/exceptions/category-not-found.exception';
import { CategoryFixture } from '../../categories/entities/fixtures/category.entity.fixture';
import { CategoriesFacade } from '../../categories/services/categories.facade';
import { CategoriesService } from './categories.service';

describe('CategoriesFacade Unit Tests', () => {
  let categoriesService: MockProxy<CategoriesService>;
  let facade: CategoriesFacade;

  beforeEach(() => {
    categoriesService = mock<CategoriesService>();
    facade = new CategoriesFacade(categoriesService);
  });

  afterEach(() => {
    mockClear(categoriesService);
  });

  describe('getOneById', () => {
    it('should throw error when given category does not exist', async () => {
      categoriesService.find.mockResolvedValue(null);

      await expect(facade.getOneById(1)).rejects.toThrow(
        CategoryNotFoundException,
      );
    });

    it('should return the category by its id', async () => {
      const expected = CategoryFixture.new();
      categoriesService.find.mockResolvedValue(expected);

      const actual = await facade.getOneById(expected.id);

      expect(actual.id).toEqual(expected.id);
    });
  });

  describe('getExtraProductCategoryId', () => {
    it('should call the service to get the extra products category id', async () => {
      facade.getExtraProductCategoryId();
      expect(categoriesService.getExtraId).toHaveBeenCalledTimes(1);
    });
  });
});
