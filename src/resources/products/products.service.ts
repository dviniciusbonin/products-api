import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { PaginationDTO } from './dto/pagination.input';
import { FilterDTO } from './dto/filter.input';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async findAll({
    days_to_expiration,
    limit = 10,
    page = 1,
  }: PaginationDTO & FilterDTO) {
    page <= 0 ? (page = 1) : page;
    limit <= 0 ? (limit = 10) : limit;

    const products = await this.prismaService.product.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        days_to_expiration: {
          equals: +days_to_expiration,
        },
      },
      skip: (+page - 1) * +limit,
      take: +limit,
    });

    return products;
  }
}
