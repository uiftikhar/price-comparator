import { Body, Controller, Get, UsePipes } from '@nestjs/common';

import { PriceComparisonService } from '../service/price-comparison.service';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { PriceComparisonDto } from '../price-comparison.dto';
import { TariffCalculationResult } from '../../tariff-calculator/interfaces';

@Controller('api/price-comparison')
export class PriceComparisonController {
  constructor(
    private readonly priceComparisonService: PriceComparisonService,
  ) {}

  @Get('/compare')
  @UsePipes(new ValidationPipe())
  comparePrices(@Body() data: PriceComparisonDto): TariffCalculationResult[] {
    return this.priceComparisonService.compare(data);
  }
}
