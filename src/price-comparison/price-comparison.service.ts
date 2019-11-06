import { Injectable } from '@nestjs/common';
import { PriceComparisonDto } from './price-comparison.dto';

@Injectable()
export class PriceComparisonService {
  NUMBER_OF_MONTHS = 12;
  async compare(consumtionAmount: PriceComparisonDto) {
    const basicElectricityTarrif = this.basicElectricityTariffCalculation(
      consumtionAmount.consumption,
    );
    const packagedElectricityTariffCalculation = this.packagedElectricityTariffCalculation(
      consumtionAmount.consumption,
    );
    const returnObj = [
      {
        tariffName: 'basic electricity tariff',
        ...basicElectricityTarrif,
      },
      {
        tariffName: 'packaged electricity tariff',
        ...packagedElectricityTariffCalculation,
      },
    ];
    return returnObj.sort((a, b) =>
      a.annualCost > b.annualCost ? 1 : b.annualCost > a.annualCost ? -1 : 0,
    );
  }

  private basicElectricityTariffCalculation(consumptionAmount: number) {
    const BASE_COST_PER_MONTH = 5;
    const CONSUMPTION_COST_PER_KWH = 0.22;
    const calculationResult =
      BASE_COST_PER_MONTH * this.NUMBER_OF_MONTHS +
      CONSUMPTION_COST_PER_KWH * consumptionAmount;
    return {
      baseCosts: BASE_COST_PER_MONTH * this.NUMBER_OF_MONTHS,
      consumptionCosts: CONSUMPTION_COST_PER_KWH * consumptionAmount,
      annualCost: calculationResult,
    };
  }

  private packagedElectricityTariffCalculation(consumptionAmount: number) {
    const abc = 4000;
    const isLessThan4000 = consumptionAmount < abc;
    const CONSUMPTION_COST_PER_KWH = 0.3;
    const BASE_COST = 800;

    if (isLessThan4000) {
      return {
        baseCosts: BASE_COST,
        consumptionCosts: 0,
        annualCost: BASE_COST,
      };
    } else {
      const differenceOfConsumpution = consumptionAmount - abc;
      const calculationResult =
        BASE_COST + differenceOfConsumpution * CONSUMPTION_COST_PER_KWH;
      return {
        baseCosts: BASE_COST,
        consumptionCosts: differenceOfConsumpution * CONSUMPTION_COST_PER_KWH,
        annualCost: calculationResult,
      };
    }
  }
}
