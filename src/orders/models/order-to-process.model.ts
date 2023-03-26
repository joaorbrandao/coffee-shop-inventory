import { Product } from '../../products/entities/product.entity';

export class OrderToProcess {
  products: ProductsToProcess[];
  payment: number;
}

export class ProductsToProcess {
  product: Product;
  extras: Product[];
}
