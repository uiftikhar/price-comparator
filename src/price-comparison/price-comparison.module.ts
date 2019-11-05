import { Module } from '@nestjs/common';
import { PriceComparisonController } from './price-comparison.controller';
import { PriceComparisonService } from './price-comparison.service';

@Module({
  controllers: [PriceComparisonController],
  providers: [PriceComparisonService],
})
export class PriceComparisonModule {}
