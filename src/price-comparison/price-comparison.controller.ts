import { Body, Controller, Get, Query, UsePipes } from '@nestjs/common';
import { PriceComparisonService } from './price-comparison.service';
import { ValidationPipe } from '../shared/validation.pipe';
import { PriceComparisonDto } from './price-comparison.dto';

@Controller('api/price-comparison')
export class PriceComparisonController {
  constructor(
    private readonly priceComparisonService: PriceComparisonService,
  ) {}

  @Get('/compare')
  @UsePipes(new ValidationPipe())
  async comparePrices(@Body() data: PriceComparisonDto) {
    console.log(123, data);
    return this.priceComparisonService.compare(data);
  }
}
