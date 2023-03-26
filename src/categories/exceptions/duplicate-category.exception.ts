import { BadRequestException } from '@nestjs/common';

export class DuplicateCategoryException extends BadRequestException {
  constructor(category: number | string) {
    super(`Category '${category}' already exists!`);
  }
}
