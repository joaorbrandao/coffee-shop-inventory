import { NotFoundException } from '@nestjs/common';

export class CategoryNotFoundException extends NotFoundException {
  constructor(category: number | string) {
    super(`Category '${category}' does not exist!`);
  }
}
