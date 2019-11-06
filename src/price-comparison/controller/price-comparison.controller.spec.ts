import { Test, TestingModule } from '@nestjs/testing';
import { PriceComparisonController } from './price-comparison.controller';

describe('PriceComparison Controller', () => {
  let controller: PriceComparisonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceComparisonController],
    }).compile();

    controller = module.get<PriceComparisonController>(
      PriceComparisonController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
