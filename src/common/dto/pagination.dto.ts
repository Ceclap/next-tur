import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min, IsString } from 'class-validator';
import { Order } from '../enum/order.enum';
import { TravelTypeEnum } from "../enum/travelType.enum";

export class PaginationDto {

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
   readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  @ApiPropertyOptional({
    required: false,
    default: '',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly name?: string = '';

  @ApiPropertyOptional({
    required: false,
    default: '',
  })
  @ApiPropertyOptional({ enum: TravelTypeEnum, default: TravelTypeEnum.litoral })
  @IsEnum(TravelTypeEnum)
  @IsOptional()
  readonly type?: TravelTypeEnum  = TravelTypeEnum.litoral;

  get skip(): number  {
    return (this.page - 1) * this.take;
  }
}
