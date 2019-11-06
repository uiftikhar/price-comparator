import { Injectable } from '@nestjs/common';

import { PriceComparisonDto } from '../price-comparison.dto';
import { TariffCalculatorService } from '../../tariff-calculator/services';
import { Tariff } from '../../tariff-calculator/enums';
import { TariffCalculationResult } from '../../tariff-calculator/interfaces';

@Injectable()
export class PriceComparisonService {
  constructor(
    private readonly tariffCalculationService: TariffCalculatorService,
  ) {}

  compare(consumptionAmount: PriceComparisonDto): TariffCalculationResult[] {
    const basicElectricityTariff = this.tariffCalculationService.basicElectricityTariffCalculation(
      consumptionAmount.consumption,
    );

    const packagedElectricityTariffCalculation = this.tariffCalculationService.packagedElectricityTariffCalculation(
      consumptionAmount.consumption,
    );

    const returnObj = [
      {
        tariffName: Tariff.BASIC,
        ...basicElectricityTariff,
      },
      {
        tariffName: Tariff.PACKAGED,
        ...packagedElectricityTariffCalculation,
      },
    ];
    return returnObj.sort((a, b) =>
      a.annualCost > b.annualCost ? 1 : b.annualCost > a.annualCost ? -1 : 0,
    );
  }
}
