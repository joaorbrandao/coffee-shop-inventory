import { PaymentProcessor } from './payment.processor';
import { OrderToProcessFixture } from '../../orders/models/order-to-process.model.fixture';
import { BadRequestException } from '@nestjs/common';
import { ProductFixture } from '../../products/entities/fixtures/product.entity.fixture';

describe('PaymentProcessor Unit Tests', () => {
  let paymentProcessor: PaymentProcessor;

  beforeEach(() => {
    paymentProcessor = new PaymentProcessor();
  });

  describe('processOrder', () => {
    it('should throw error when client provides insufficient funds for their request', () => {
      const orderToProcess = OrderToProcessFixture.new();

      try {
        paymentProcessor.processOrder(orderToProcess);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        return expect(e.message).toContain('Insufficient funds');
      }

      throw new Error('should not reach here!');
    });

    it('should return 0 when there is no exchange to be returned', () => {
      const product = ProductFixture.new();
      const totalPrice = product.price;
      const orderToProcess = OrderToProcessFixture.new({
        payment: totalPrice,
        products: [{ product, extras: [] }],
      });

      const exchange = paymentProcessor.processOrder(orderToProcess);

      expect(exchange).toEqual(0);
    });

    it('should return exchange when user provides more money than the total price of the order', () => {
      const expectedExchange = 5.3;
      const product = ProductFixture.new();
      const totalPrice = product.price;
      const orderToProcess = OrderToProcessFixture.new({
        payment: totalPrice + expectedExchange,
        products: [{ product, extras: [] }],
      });

      const exchange = paymentProcessor.processOrder(orderToProcess);

      expect(exchange).toEqual(expectedExchange);
    });
  });
});
