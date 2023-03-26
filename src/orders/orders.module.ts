import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { OrdersController } from './controllers/orders.controller';
import { StockValidator } from '../products/services/stock.validator';
import { PaymentsModule } from '../payments/payments.module';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [ProductsModule, PaymentsModule],
  controllers: [OrdersController],
  providers: [OrdersService, StockValidator],
  exports: [],
})
export class OrdersModule {}
