import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from '../entities/category.entity';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { CategoriesService } from './categories.service';
import { CategoryFixture } from '../entities/fixtures/category.entity.fixture';
import { CreateCategoryDtoFixture } from '../controllers/dtos/fixtures/create-category.dto.fixture';
import { DuplicateCategoryException } from '../exceptions/duplicate-category.exception';
import { UpdateCategoryDto } from '../controllers/dtos/update-category.dto';
import { NotImplementedException } from '@nestjs/common';

describe('CategoriesService Unit Tests', () => {
  let service: CategoriesService;
  let repository: MockProxy<Repository<Category>>;

  beforeEach(() => {
    repository = mock<Repository<Category>>();
    service = new CategoriesService(repository);
  });

  afterEach(() => {
    mockClear(repository);
  });

  describe('list', () => {
    it('should get an empty list when no categories exist', async () => {
      repository.find.mockResolvedValue([]);
      const actual = await service.list();
      expect(actual.length).toEqual(0);
    });

    it('should get a list of categories', async () => {
      const categories = [CategoryFixture.new()];
      repository.find.mockResolvedValue(categories);

      const actual = await service.list();

      expect(actual.length).toEqual(1);
    });
  });

  describe('find', () => {
    it('should return null when no categories exist', async () => {
      repository.findOneBy.mockResolvedValue(null);
      const actual = await service.find(1);
      expect(actual).toBeNull();
    });

    it('should get a category', async () => {
      const category = CategoryFixture.new();
      repository.findOneBy.mockResolvedValue(category);

      const actual = await service.find(category.id);

      expect(actual.id).toEqual(category.id);
    });
  });

  describe('create', () => {
    it('should throw error when the category already exists', async () => {
      repository.findOneBy.mockResolvedValue(CategoryFixture.new());

      await expect(
        service.create(CreateCategoryDtoFixture.new()),
      ).rejects.toThrow(DuplicateCategoryException);
    });

    it('should create a new category', async () => {
      const expectedCategory = CategoryFixture.new();
      repository.findOneBy.mockResolvedValue(null);
      repository.save.mockResolvedValue(expectedCategory);

      const given = CreateCategoryDtoFixture.new();
      await service.create(given);

      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should throw an error when user tries to update the Extras category', async () => {
      try {
        await service.update(0, { name: 'asd' });
      } catch (e) {
        return expect(e).toBeInstanceOf(NotImplementedException);
      }

      throw new Error('Should not get here!');
    });

    it('should update an existing category', async () => {
      const expectedCategory = CategoryFixture.new();
      repository.update.mockResolvedValue({} as UpdateResult);

      const given = CreateCategoryDtoFixture.new();

      await service.update(1, given);
      expect(repository.update).toHaveBeenCalledWith(expectedCategory.id, {
        ...given,
      });
    });
  });

  describe('delete', () => {
    it('should delete an existing category', async () => {
      repository.delete.mockResolvedValue({} as DeleteResult);

      await service.delete(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
