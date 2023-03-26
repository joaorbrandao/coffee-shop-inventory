import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { PaymentsFacade } from './payments.facade';
import { PaymentProcessor } from './payment.processor';
import { OrderToProcessFixture } from '../../orders/models/order-to-process.model.fixture';

describe('PaymentsFacade Unit Tests', () => {
  let paymentProcessor: MockProxy<PaymentProcessor>;
  let facade: PaymentsFacade;

  beforeEach(() => {
    paymentProcessor = mock<PaymentProcessor>();
    facade = new PaymentsFacade(paymentProcessor);
  });

  afterEach(() => {
    mockClear(paymentProcessor);
  });

  describe('processOrderPayment', () => {
    it('should call the payment processor to process a given order', async () => {
      facade.processOrderPayment(OrderToProcessFixture.new());
      expect(paymentProcessor.processOrder).toHaveBeenCalledTimes(1);
    });
  });
});
