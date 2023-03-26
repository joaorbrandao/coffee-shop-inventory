import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('/v1/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  listCategories(): Promise<Category[]> {
    return this.categoriesService.list();
  }

  @Get(':id')
  findCategory(@Param() id: number): Promise<Category> {
    return this.categoriesService.find(id);
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  async updateCategory(
    @Param() id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param() id: number): Promise<DeleteResult> {
    return this.categoriesService.delete(id);
  }
}
