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
    const isInMinimumThreshold = consumptionAmount < CONSUMPTION_THRESHOLD;
    const CONSUMPTION_COST_PER_KWH = 0.3;
    const BASE_COST = 800;

    if (isInMinimumThreshold) {
      return {
        baseCosts: BASE_COST,
        consumptionCosts: 0,
        annualCost: BASE_COST,
      };
    } else {
      const differenceOfConsumpution =
        consumptionAmount - CONSUMPTION_THRESHOLD;
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
