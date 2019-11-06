import { Injectable } from '@nestjs/common';
import { PriceComparisonDto } from '../price-comparison.dto';
import { NUMBER_OF_MONTHS } from '../../shared/constants/number-of-months';
import { TariffCalculatorService } from '../../tariff-calculator/services';
import { Tariff } from '../../tariff-calculator/enums';

@Injectable()
export class PriceComparisonService {
  constructor(
    private readonly tariffCalculationService: TariffCalculatorService,
  ) {}

  async compare(consumtionAmount: PriceComparisonDto) {
    const basicElectricityTarrif = this.tariffCalculationService.basicElectricityTariffCalculation(
      consumtionAmount.consumption,
    );

    const packagedElectricityTariffCalculation = this.tariffCalculationService.packagedElectricityTariffCalculation(
      consumtionAmount.consumption,
    );

    const returnObj = [
      {
        tariffName: Tariff.BASIC,
        ...basicElectricityTarrif,
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
