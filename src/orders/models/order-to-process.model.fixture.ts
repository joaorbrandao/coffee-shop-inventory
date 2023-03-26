import { OrderToProcess } from './order-to-process.model';
import { ProductFixture } from '../../products/entities/fixtures/product.entity.fixture';
import { Category } from '../../categories/entities/category.entity';

export class OrderToProcessFixture {
  static new(orderToProcess?: Partial<OrderToProcess>): OrderToProcess {
    return {
      payment: 1,
      products: [
        {
          product: ProductFixture.new({ category: { id: 1 } as Category }),
          extras: [ProductFixture.new({ category: { id: 2 } as Category })],
        },
      ],
      ...orderToProcess,
    };
  }
}
