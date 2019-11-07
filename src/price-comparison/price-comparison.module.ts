import { Module } from '@nestjs/common';

import { PriceComparisonController } from './controller';
import { PriceComparisonService } from './service';
import { TariffCalculatorService } from '../tariff-calculator/services';

@Module({
  controllers: [PriceComparisonController],
  providers: [PriceComparisonService, TariffCalculatorService],
})
export class PriceComparisonModule {}
