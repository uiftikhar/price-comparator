import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PriceComparisonModule } from './price-comparison/price-comparison.module';
import { TariffCalculatorModule } from './tariff-calculator/tariff-calculator.module';
import { HttpErrorFilter } from './shared/filter/http-error.filter';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';

@Module({
  imports: [PriceComparisonModule, TariffCalculatorModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
