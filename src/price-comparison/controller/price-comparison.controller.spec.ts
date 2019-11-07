import { Test, TestingModule } from '@nestjs/testing';

import { PriceComparisonService } from '../service';
import { PriceComparisonController } from './price-comparison.controller';
import { TariffCalculatorService } from '../../tariff-calculator/services';
import { TariffCalculationResult } from '../../tariff-calculator/interfaces';

describe('PriceComparison Controller', () => {
  let controller: PriceComparisonController;
  let priceComparisonService: PriceComparisonService;
  let tariffCalculatorService: TariffCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceComparisonController],
      providers: [
        {
          provide: PriceComparisonService,
          useFactory: () => ({
            compare: jest.fn(() => true),
          }),
        },
        {
          provide: TariffCalculatorService,
          useFactory: () => ({
            basicElectricityTariffCalculation: jest.fn(() => true),
            packagedElectricityTariffCalculation: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    controller = module.get<PriceComparisonController>(
      PriceComparisonController,
    );
    priceComparisonService = module.get<PriceComparisonService>(
      PriceComparisonService,
    );

    tariffCalculatorService = module.get<TariffCalculatorService>(
      TariffCalculatorService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('comparePrices', () => {
    it('should return tariff calculation result', () => {
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

      jest
        .spyOn(priceComparisonService, 'compare')
        .mockImplementation(() => result);

      expect(controller.comparePrices({ consumption: 6000 })).toEqual(result);
    });
  });
});
