import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/common/prisma.service';

describe('Products (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', () => {
    request(app.getHttpServer())
      .get('/products')
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('/products?days_to_expiration=0 (GET)', () => {
    request(app.getHttpServer())
      .get('/products?days_to_expiration=0')
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('/products?days_to_expiration=1 (GET)', () => {
    request(app.getHttpServer())
      .get('/products?days_to_expiration=1')
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
