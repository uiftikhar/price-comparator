import { Injectable } from '@nestjs/common';
import { PriceComparisonDto } from './price-comparison.dto';

@Injectable()
export class PriceComparisonService {
  async compare(consumtionAmount: PriceComparisonDto) {
    // Product A
    // Name: “basic electricity tariff”
    // Calculation model: base costs per month 5 € + consumption costs 22 cent/kWh Examples:
    //  Name: “Packaged tariff”
    // Calculation model: 800 € for up to 4000 kWh/year and above 4000 kWh/year additionally 30 cent/kWh.
    return consumtionAmount;
  }
}
