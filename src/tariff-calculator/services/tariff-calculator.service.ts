import { Injectable } from '@nestjs/common';

import { NUMBER_OF_MONTHS } from '../../shared/constants/number-of-months';
import { TariffCalculationResult } from '../interfaces';

@Injectable()
export class TariffCalculatorService {
  basicElectricityTariffCalculation(
    consumptionAmount: number,
  ): TariffCalculationResult {
    const BASE_COST_PER_MONTH = 5;
    const CONSUMPTION_COST_PER_KWH = 0.22;

    const calculationResult =
      BASE_COST_PER_MONTH * NUMBER_OF_MONTHS +
      CONSUMPTION_COST_PER_KWH * consumptionAmount;

    return {
      baseCosts: BASE_COST_PER_MONTH * NUMBER_OF_MONTHS,
      consumptionCosts: CONSUMPTION_COST_PER_KWH * consumptionAmount,
      annualCost: calculationResult,
    };
  }

  packagedElectricityTariffCalculation(
    consumptionAmount: number,
  ): TariffCalculationResult {
    const CONSUMPTION_THRESHOLD = 4000;
    const CONSUMPTION_COST_PER_KWH = 0.3;
    const BASE_COST = 800;
    const isInMinimumThreshold = consumptionAmount < CONSUMPTION_THRESHOLD;
    const basePackage = {
      baseCosts: BASE_COST,
      consumptionCosts: 0,
      annualCost: BASE_COST,
    };

    return isInMinimumThreshold
      ? basePackage
      : this.computePackagedTariff(
          consumptionAmount,
          CONSUMPTION_THRESHOLD,
          BASE_COST,
          CONSUMPTION_COST_PER_KWH,
        );
  }

  private computePackagedTariff(
    consumptionAmount: number,
    consumptionThreshold: number,
    baseCost: number,
    consumptionCostPerKwh: number,
  ): TariffCalculationResult {
    const differenceOfConsumption = consumptionAmount - consumptionThreshold;
    const calculationResult =
      baseCost + differenceOfConsumption * consumptionCostPerKwh;
    return {
      baseCosts: baseCost,
      consumptionCosts: differenceOfConsumption * consumptionCostPerKwh,
      annualCost: calculationResult,
    };
  }
}
