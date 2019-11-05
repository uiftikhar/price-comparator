import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceComparisonModule } from './price-comparison/price-comparison.module';
import { PriceComparisonService } from './price-comparison/price-comparison.service';

@Module({
  imports: [PriceComparisonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
