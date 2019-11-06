import { Module } from '@nestjs/common';
import { TariffCalculatorService } from './services/tariff-calculator.service';

@Module({
  providers: [TariffCalculatorService],
})
export class TariffCalculatorModule {}
