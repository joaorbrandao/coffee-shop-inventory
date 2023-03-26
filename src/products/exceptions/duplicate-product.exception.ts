import { BadRequestException } from '@nestjs/common';

export class DuplicateProductException extends BadRequestException {
  constructor(productName: string) {
    super(`Product '${productName}' already exists!`);
  }
}
