import { Test, TestingModule } from '@nestjs/testing';
import { TariffCalculatorService } from './tariff-calculator.service';
import { TariffCalculationResult } from '../interfaces';

describe('TariffCalculatorService', () => {
  let service: TariffCalculatorService;
  const basicResult: TariffCalculationResult = {
    baseCosts: 60,
    consumptionCosts: 1320,
    annualCost: 1380,
  };

  const packagedResult: TariffCalculationResult = {
    baseCosts: 800,
    consumptionCosts: 600,
    annualCost: 1400,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TariffCalculatorService],
    }).compile();

    service = module.get<TariffCalculatorService>(TariffCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('basicElectricityTariffCalculation', () => {
    it('should return base electricity cost', () => {
      const consumptionAmount = 6000;
      const mockServiceCall = service.basicElectricityTariffCalculation(
        consumptionAmount,
      );
      expect(mockServiceCall).toEqual(basicResult);
    });
  });

  describe('packagedElectricityTariffCalculation', () => {
    it('should return packaged electricity cost', () => {
      const consumptionAmount = 6000;
      const mockServiceCall = service.packagedElectricityTariffCalculation(
        consumptionAmount,
      );
      expect(mockServiceCall).toEqual(packagedResult);
    });
  });
});
