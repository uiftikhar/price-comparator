import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceComparisonModule } from './price-comparison/price-comparison.module';
import { TariffCalculatorModule } from './tariff-calculator/tariff-calculator.module';

@Module({
  imports: [PriceComparisonModule, TariffCalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
