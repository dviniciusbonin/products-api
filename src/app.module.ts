import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './resources/products/products.module';
@Module({
  imports: [ConfigModule.forRoot(), ProductsModule],
})
export class AppModule {}
