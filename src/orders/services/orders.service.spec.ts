import { OrdersService } from './orders.service';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { PaymentsFacade } from '../../payments/services/payments.facade';
import { ProductsFacade } from '../../products/services/products.facade';
import { OrderDto } from '../controllers/dtos/order.dto';
import { ProductFixture } from '../../products/entities/fixtures/product.entity.fixture';

describe('OrdersService Unit Tests', () => {
  let service: OrdersService;
  let paymentsFacade: MockProxy<PaymentsFacade>;
  let productsFacade: MockProxy<ProductsFacade>;

  const validOrderDto = {
    products: [{ productId: 1, extrasIds: [2, 3] }],
    payment: 10,
  } as OrderDto;

  beforeEach(() => {
    paymentsFacade = mock<PaymentsFacade>();
    productsFacade = mock<ProductsFacade>();
    service = new OrdersService(paymentsFacade, productsFacade);
  });

  afterEach(() => {
    mockClear(paymentsFacade);
    mockClear(productsFacade);
  });

  describe('handleOrder', () => {
    it('should throw error when user requests products as extras', async () => {
      const order = {
        products: [{ productId: 1, extrasIds: [1] }],
        payment: 10,
      } as OrderDto;

      productsFacade.validateAllIdsAreExtraProducts.mockImplementation(() => {
        throw new Error();
      });

      await expect(service.handleOrder(order)).rejects.toThrow(Error);
    });

    it('should throw error when there is no stock', async () => {
      productsFacade.validateStock.mockImplementation(() => {
        throw new Error();
      });

      await expect(service.handleOrder(validOrderDto)).rejects.toThrow(Error);
      expect(
        productsFacade.validateAllIdsAreExtraProducts,
      ).toHaveBeenCalledTimes(1);
    });

    it('should throw error when user provides insufficient funds', async () => {
      paymentsFacade.processOrderPayment.mockImplementation(() => {
        throw new Error();
      });

      await expect(service.handleOrder(validOrderDto)).rejects.toThrow(Error);
      expect(
        productsFacade.validateAllIdsAreExtraProducts,
      ).toHaveBeenCalledTimes(1);
      expect(productsFacade.validateStock).toHaveBeenCalledTimes(1);
      expect(productsFacade.getByIds).toHaveBeenCalledTimes(1);
    });

    it('should handle order with success and return no exchange', async () => {
      productsFacade.getByIds.mockResolvedValue([ProductFixture.new()]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      paymentsFacade.processOrderPayment.mockResolvedValue(0);

      const result = await service.handleOrder(validOrderDto);

      expect(result).toEqual(0);
      expect(
        productsFacade.validateAllIdsAreExtraProducts,
      ).toHaveBeenCalledTimes(1);
      expect(productsFacade.validateStock).toHaveBeenCalledTimes(1);
    });

    it('should handle order with success and return correct exchange', async () => {
      productsFacade.getByIds.mockResolvedValue([ProductFixture.new()]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      paymentsFacade.processOrderPayment.mockResolvedValue(2);

      const result = await service.handleOrder(validOrderDto);

      expect(result).toEqual(2);
      expect(
        productsFacade.validateAllIdsAreExtraProducts,
      ).toHaveBeenCalledTimes(1);
      expect(productsFacade.validateStock).toHaveBeenCalledTimes(1);
    });
  });
});
