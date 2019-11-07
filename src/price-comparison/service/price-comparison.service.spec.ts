import { Test, TestingModule } from '@nestjs/testing';
import { PriceComparisonService } from './price-comparison.service';
import { TariffCalculatorService } from '../../tariff-calculator/services';
import { TariffCalculationResult } from '../../tariff-calculator/interfaces';
import { PriceComparisonDto } from '../price-comparison.dto';

describe('PriceComparisonService', () => {
  const basicResult: TariffCalculationResult = {
    tariffName: 'basic electricity tariff',
    baseCosts: 60,
    consumptionCosts: 1320,
    annualCost: 1380,
  };

  const packagedResult: TariffCalculationResult = {
    tariffName: 'packaged electricity tariff',
    baseCosts: 800,
    consumptionCosts: 600,
    annualCost: 1400,
  };

  let service: PriceComparisonService;
  let tariffCalculatorService: TariffCalculatorService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceComparisonService,
        {
          provide: TariffCalculatorService,
          useFactory: () => ({
            basicElectricityTariffCalculation: jest.fn(() => basicResult),
            packagedElectricityTariffCalculation: jest.fn(() => packagedResult),
          }),
        },
      ],
    }).compile();

    service = module.get<PriceComparisonService>(PriceComparisonService);
    tariffCalculatorService = module.get<TariffCalculatorService>(
      TariffCalculatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('compare', () => {
    it('should get the tariffs from TariffCalculatorService and sort them ', () => {
      const priceConsumption: PriceComparisonDto = { consumption: 6000 };
      const result: TariffCalculationResult[] = [
        {
          tariffName: 'basic electricity tariff',
          baseCosts: 60,
          consumptionCosts: 1320,
          annualCost: 1380,
        },
        {
          tariffName: 'packaged electricity tariff',
          baseCosts: 800,
          consumptionCosts: 600,
          annualCost: 1400,
        },
      ];
      const mockServiceCall = service.compare(priceConsumption);

      jest
        .spyOn(tariffCalculatorService, 'basicElectricityTariffCalculation')
        .mockImplementation(() => {
          return basicResult;
        });

      jest
        .spyOn(tariffCalculatorService, 'packagedElectricityTariffCalculation')
        .mockImplementation(() => basicResult);

      expect(
        tariffCalculatorService.basicElectricityTariffCalculation,
      ).toHaveBeenCalledWith(priceConsumption.consumption);
      expect(
        tariffCalculatorService.packagedElectricityTariffCalculation,
      ).toHaveBeenCalledWith(priceConsumption.consumption);

      expect(mockServiceCall).toEqual(result);
    });
  });
});
