import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationDTO } from './dto/pagination.input';
import { FilterDTO } from './dto/filter.input';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() params: PaginationDTO & FilterDTO) {
    return this.productsService.findAll(params);
  }
}
