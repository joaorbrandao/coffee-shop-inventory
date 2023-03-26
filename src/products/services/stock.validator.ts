import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOutOfStockException } from '../exceptions/product-out-of-stock.exception';

@Injectable()
export class StockValidator {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async validateProductsStock(products: number[]) {
    const productIdToAmountMap = this.mapProductIdToRequestedAmount(products);

    for (const productId in productIdToAmountMap) {
      const product = await this.productsRepository.findOneBy({
        id: parseInt(productId),
      });
      const requestedAmount = productIdToAmountMap[productId];
      const productStock = product?.stock ?? 0;

      if (requestedAmount > productStock) {
        throw new ProductOutOfStockException(productId, productStock);
      }
    }
  }

  private mapProductIdToRequestedAmount(
    productsIds: number[],
  ): Record<string, number> {
    return productsIds.reduce(
      (cnt, productId) => ((cnt[productId] = cnt[productId] + 1 || 1), cnt),
      {},
    );
  }
}
