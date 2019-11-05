import { IsNumber } from 'class-validator';

export class PriceComparisonDto {
  @IsNumber()
  consumption: number;
}
