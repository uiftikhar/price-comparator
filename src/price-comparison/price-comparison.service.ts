import { Injectable } from '@nestjs/common';
import { PriceComparisonDto } from './price-comparison.dto';

@Injectable()
export class PriceComparisonService {
  async compare(consumtionAmount: PriceComparisonDto) {
    return consumtionAmount;
  }
}
