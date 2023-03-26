import { NotFoundException } from '@nestjs/common';

export class ProductOutOfStockException extends NotFoundException {
  constructor(productName: string, stock?: number) {
    const message = stock
      ? `Product '${productName}' is out of stock! Only '${stock}' in stock!`
      : `Product '${productName}' is out of stock!`;
    super(message);
  }
}
