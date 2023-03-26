import { Injectable } from '@nestjs/common';
import { OrderDto, ProductWithExtras } from '../controllers/dtos/order.dto';
import { Product } from '../../products/entities/product.entity';
import { ProductsToProcess } from '../models/order-to-process.model';
import { ProductsFacade } from '../../products/services/products.facade';
import { PaymentsFacade } from '../../payments/services/payments.facade';

@Injectable()
export class OrdersService {
  constructor(
    private paymentsFacade: PaymentsFacade,
    private productsFacade: ProductsFacade,
  ) {}

  async handleOrder({ products, payment }: OrderDto): Promise<number> {
    const [productsIds, extrasIds] =
      this.extractIdsFromProductsAndExtras(products);

    await this.productsFacade.validateAllIdsAreExtraProducts(extrasIds);

    const productsAndExtrasIds = [...productsIds, ...extrasIds];

    await this.productsFacade.validateStock(productsAndExtrasIds);

    const productsAndExtras = await this.productsFacade.getByIds(
      productsAndExtrasIds,
    );

    return this.paymentsFacade.processOrderPayment({
      payment,
      products: this.adaptOrderToBeProcessed(products, productsAndExtras),
    });
  }

  private extractIdsFromProductsAndExtras(products: ProductWithExtras[]) {
    const productsIds = products.map((product) => product.productId);
    const extrasIds = products
      .flatMap((product) => product.extrasIds)
      .filter(Number);

    return [productsIds, extrasIds];
  }

  private adaptOrderToBeProcessed(
    productsWithExtras: ProductWithExtras[],
    products: Product[],
  ): ProductsToProcess[] {
    return productsWithExtras.map(({ productId, extrasIds: extrasIds }) => {
      const product = products.find((prd) => prd.id === productId);
      const extras = products.filter(
        (prd) => extrasIds?.includes(prd.id) || false,
      );

      return {
        product,
        extras,
      };
    });
  }
}
