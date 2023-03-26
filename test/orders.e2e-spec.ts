import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { OrderDto } from '../src/orders/controllers/dtos/order.dto';
import { DataSource } from 'typeorm';
import { Category } from '../src/categories/entities/category.entity';
import { Product } from '../src/products/entities/product.entity';

async function resetDatabase(dataSource: DataSource) {
  await dataSource.getRepository(Product).delete({});
  await dataSource.getRepository(Category).delete({});
  await dataSource.query('ALTER TABLE product AUTO_INCREMENT = 1');
  await dataSource.query('ALTER TABLE category AUTO_INCREMENT = 1');
}

describe('Orders (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = await moduleFixture.get<DataSource>(DataSource);
    await app.init();

    await resetDatabase(dataSource);
  });

  beforeEach(async () => {
    await resetDatabase(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/orders', () => {
    it('should throw error when there is no stock', () => {
      const validOrderDto = {
        products: [
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
          { productId: 1 },
        ],
        payment: 10,
      } as OrderDto;

      return request(app.getHttpServer())
        .post('/v1/orders')
        .set('Accept', 'application/json')
        .send(validOrderDto)
        .expect((response) => {
          expect(response.status).toEqual(404);
          expect(response.body.message).toContain('out of stock');
        });
    });

    it('should return a message of error on insufficient funds', async () => {
      await dataSource.query(
        `INSERT IGNORE INTO category (name) VALUES('Espresso Drinks')`,
      );
      await dataSource.query(`
        INSERT IGNORE INTO \`product\`(name, price, stock, categoryId)
        SELECT 'Latte', 9, 10, id FROM category WHERE name = 'Espresso Drinks'
      `);

      const validOrderDto = {
        products: [{ productId: 1 }],
        payment: 1,
      } as OrderDto;

      return request(app.getHttpServer())
        .post('/v1/orders')
        .set('Accept', 'application/json')
        .send(validOrderDto)
        .expect((response) => {
          expect(response.status).toEqual(400);
          expect(response.body.message).toContain('Insufficient funds');
        });
    });

    it('should place order and return the correct exchange', async () => {
      const productPrice = 9;
      const payment = 11;
      const expectedExchange = payment - productPrice;

      await dataSource.query(
        `INSERT IGNORE INTO category (name) VALUES('Espresso Drinks')`,
      );
      await dataSource.query(`
        INSERT IGNORE INTO \`product\`(name, price, stock, categoryId)
        SELECT 'Latte', ${productPrice}, 10, id FROM category WHERE name = 'Espresso Drinks'
      `);

      const validOrderDto = {
        products: [{ productId: 1 }],
        payment: payment,
      } as OrderDto;

      return request(app.getHttpServer())
        .post('/v1/orders')
        .set('Accept', 'application/json')
        .send(validOrderDto)
        .expect((response) => {
          expect(response.status).toEqual(201);
          expect(parseInt(response.text)).toEqual(expectedExchange);
        });
    });
  });
});
