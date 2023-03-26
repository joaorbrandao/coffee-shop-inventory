import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('/v1/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  listProducts(): Promise<Product[]> {
    return this.productsService.list();
  }

  @Get(':id')
  findProduct(@Param() id: number): Promise<Product> {
    return this.productsService.find(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  updateProduct(
    @Param() id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  deleteCProduct(@Param() id: number): Promise<DeleteResult> {
    return this.productsService.delete(id);
  }
}
