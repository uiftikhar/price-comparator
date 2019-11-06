import { Body, Controller, Get, Query, UsePipes } from '@nestjs/common';
import { PriceComparisonService } from '../service/price-comparison.service';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { PriceComparisonDto } from '../price-comparison.dto';

@Controller('api/price-comparison')
export class PriceComparisonController {
  constructor(
    private readonly priceComparisonService: PriceComparisonService,
  ) {}

  @Get('/compare')
  @UsePipes(new ValidationPipe())
  async comparePrices(@Body() data: PriceComparisonDto) {
    return this.priceComparisonService.compare(data);
  }
}
