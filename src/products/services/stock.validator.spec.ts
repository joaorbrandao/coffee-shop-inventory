import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { ProductFixture } from '../entities/fixtures/product.entity.fixture';
import { StockValidator } from './stock.validator';
import { ProductOutOfStockException } from '../exceptions/product-out-of-stock.exception';

describe('StockValidator Unit Tests', () => {
  let stockValidator: StockValidator;
  let productsRepository: MockProxy<Repository<Product>>;

  beforeEach(() => {
    productsRepository = mock<Repository<Product>>();
    stockValidator = new StockValidator(productsRepository);
  });

  afterEach(() => {
    mockClear(productsRepository);
  });

  describe('validateProductsStock', () => {
    it('should throw error when there is no stock for the product', async () => {
      const requestedProducts = [1, 1];
      productsRepository.findOneBy.mockResolvedValue(
        ProductFixture.new({ stock: 1 }),
      );

      await expect(
        stockValidator.validateProductsStock(requestedProducts),
      ).rejects.toThrow(ProductOutOfStockException);
    });

    it('should throw error when there is no stock to fulfill a user request', async () => {
      const requestedProducts = [1];
      productsRepository.findOneBy.mockResolvedValue(null);

      await expect(
        stockValidator.validateProductsStock(requestedProducts),
      ).rejects.toThrow(ProductOutOfStockException);
    });

    it('should do nothing when there is enough stock to fulfill user order', async () => {
      const requestedProducts = [1];
      productsRepository.findOneBy.mockResolvedValue(
        ProductFixture.new({ stock: 1 }),
      );

      await stockValidator.validateProductsStock(requestedProducts);

      expect(true).toBeTruthy();
    });
  });
});
