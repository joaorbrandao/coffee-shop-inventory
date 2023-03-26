import { IsNumber, Min } from 'class-validator';

export class OrderDto {
  products: ProductWithExtras[];

  @IsNumber()
  @Min(0)
  payment: number;
}

export class ProductWithExtras {
  @IsNumber()
  @Min(0)
  productId: number;

  extrasIds?: number[];
}
