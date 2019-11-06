import { Test, TestingModule } from '@nestjs/testing';
import { TariffCalculatorService } from './tariff-calculator.service';

describe('TariffCalculatorService', () => {
  let service: TariffCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TariffCalculatorService],
    }).compile();

    service = module.get<TariffCalculatorService>(TariffCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
