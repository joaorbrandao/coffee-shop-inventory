import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { ProductsFacade } from './products.facade';
import { ProductsService } from './products.service';
import { StockValidator } from './stock.validator';

describe('ProductsFacade Unit Tests', () => {
  let productsService: MockProxy<ProductsService>;
  let stockValidator: MockProxy<StockValidator>;
  let facade: ProductsFacade;

  beforeEach(() => {
    productsService = mock<ProductsService>();
    stockValidator = mock<StockValidator>();
    facade = new ProductsFacade(productsService, stockValidator);
  });

  afterEach(() => {
    mockClear(productsService);
    mockClear(stockValidator);
  });

  describe('getByIds', () => {
    it('should call the products service to get a list of products for the given ids', async () => {
      await facade.getByIds([1, 2, 3]);
      expect(productsService.getProductsByIds).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateAllIdsAreExtraProducts', () => {
    it('should call the products service to validate a list of given ids', async () => {
      await facade.validateAllIdsAreExtraProducts([1, 2, 3]);
      expect(productsService.allIdsAreExtraProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe('validateStock', () => {
    it('should call the stock validator to validate the stock for the given ids', async () => {
      await facade.validateStock([1, 2, 3]);
      expect(stockValidator.validateProductsStock).toHaveBeenCalledTimes(1);
    });
  });
});
