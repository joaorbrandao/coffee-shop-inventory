import { Module } from '@nestjs/common';
import { PaymentProcessor } from './services/payment.processor';
import { PaymentsFacade } from './services/payments.facade';

@Module({
  providers: [PaymentProcessor, PaymentsFacade],
  exports: [PaymentsFacade],
})
export class PaymentsModule {}
