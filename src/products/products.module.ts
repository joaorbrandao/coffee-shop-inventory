import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products.service';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsFacade } from './services/products.facade';
import { StockValidator } from './services/stock.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService, StockValidator, ProductsFacade],
  exports: [TypeOrmModule, ProductsFacade],
})
export class ProductsModule {}
