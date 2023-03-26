import { Injectable } from '@nestjs/common';
import { PaymentProcessor } from './payment.processor';
import { OrderToProcess } from '../../orders/models/order-to-process.model';

/**
 * This class is used as the single entrypoint for all
 * Payment related interaction from other domains.
 */
@Injectable()
export class PaymentsFacade {
  constructor(private paymentProcessor: PaymentProcessor) {}

  /**
   * Process a given Order's payment.
   *
   * @param orderToProcess
   * @return number The payment exchange.
   */
  processOrderPayment(orderToProcess: OrderToProcess): number {
    return this.paymentProcessor.processOrder(orderToProcess);
  }
}
