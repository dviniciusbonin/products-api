import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';
import { ProductsModule } from './resources/products/products.module';
@Module({
  imports: [ConfigModule.forRoot(), ProductsModule],
  providers: [PrismaService],
})
export class AppModule {}
