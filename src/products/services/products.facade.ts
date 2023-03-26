import { Injectable } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';
import { StockValidator } from './stock.validator';

/**
 * This class is used as the single entrypoint for all
 * Product related interaction from other domains.
 */
@Injectable()
export class ProductsFacade {
  constructor(
    private productsService: ProductsService,
    private stockValidator: StockValidator,
  ) {}

  /**
   * Get a list of Product entities by their ids.
   *
   * @param ids
   * @return Promise<Product[]>
   */
  getByIds(ids: number[]): Promise<Product[]> {
    return this.productsService.getProductsByIds(ids);
  }

  /**
   * Validate if a given list of Product ids bellow to products which
   * Category is Extras.
   *
   * @param ids
   */
  validateAllIdsAreExtraProducts(ids: number[]) {
    return this.productsService.allIdsAreExtraProducts(ids);
  }

  /**
   * Validate stock for a given list of Product ids.
   * Nothing happens if there is stock.
   *
   * @param products
   */
  validateStock(products: number[]) {
    return this.stockValidator.validateProductsStock(products);
  }
}
