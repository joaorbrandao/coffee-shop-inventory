import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Product } from '../entities/product.entity';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { ProductsService } from './products.service';
import { ProductFixture } from '../entities/fixtures/product.entity.fixture';
import { CreateProductDtoFixture } from '../controllers/dtos/fixtures/create-product.dto.fixture';
import { DuplicateProductException } from '../exceptions/duplicate-product.exception';
import { CategoryFixture } from '../../categories/entities/fixtures/category.entity.fixture';
import { CategoriesFacade } from '../../categories/services/categories.facade';

describe('ProductsService Unit Tests', () => {
  let service: ProductsService;
  let repository: MockProxy<Repository<Product>>;
  let categoriesFacade: MockProxy<CategoriesFacade>;

  beforeEach(() => {
    repository = mock<Repository<Product>>();
    categoriesFacade = mock<CategoriesFacade>();
    service = new ProductsService(repository, categoriesFacade);
  });

  afterEach(() => {
    mockClear(repository);
  });

  describe('list', () => {
    it('should get an empty list when no products exist', async () => {
      repository.find.mockResolvedValue([]);
      const actual = await service.list();
      expect(actual.length).toEqual(0);
    });

    it('should get a list of products', async () => {
      const products = [ProductFixture.new()];
      repository.find.mockResolvedValue(products);

      const actual = await service.list();

      expect(actual.length).toEqual(1);
    });
  });

  describe('find', () => {
    it('should return null when no products exist', async () => {
      repository.findOneBy.mockResolvedValue(null);
      const actual = await service.find(1);
      expect(actual).toBeNull();
    });

    it('should get a product', async () => {
      const product = ProductFixture.new();
      repository.findOneBy.mockResolvedValue(product);

      const actual = await service.find(product.id);

      expect(actual.id).toEqual(product.id);
    });
  });

  describe('create', () => {
    it('should throw error when the product already exists', async () => {
      repository.findOneBy.mockResolvedValue(ProductFixture.new());

      await expect(
        service.create(CreateProductDtoFixture.new()),
      ).rejects.toThrow(DuplicateProductException);
    });

    it('should create a new product', async () => {
      repository.findOneBy.mockResolvedValue(null);
      categoriesFacade.getOneById.mockResolvedValue(CategoryFixture.new());

      const given = CreateProductDtoFixture.new();
      await service.create(given);

      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      categoriesFacade.getOneById.mockResolvedValue(CategoryFixture.new());
      repository.update.mockResolvedValue({} as UpdateResult);

      const given = CreateProductDtoFixture.new();

      await service.update(1, given);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete an existing product', async () => {
      repository.delete.mockResolvedValue({} as DeleteResult);

      await service.delete(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
