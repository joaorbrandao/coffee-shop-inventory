import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderToProcess } from '../../orders/models/order-to-process.model';

@Injectable()
export class PaymentProcessor {
  processOrder({ products, payment }: OrderToProcess): number {
    const totalPrice = products
      .map(({ product, extras }) => {
        const extrasCost = extras.reduce((acc, extra) => acc + extra.price, 0);
        return product.price + extrasCost;
      })
      .reduce((sum, price) => sum + price, 0);

    if (payment < totalPrice) {
      throw new BadRequestException(
        `Insufficient funds - total price is '${totalPrice}'`,
      );
    }

    return Number((payment - totalPrice).toFixed(2));
  }
}
