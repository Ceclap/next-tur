import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min, IsString, IsBoolean } from "class-validator";
import { Order } from '../enum/order.enum';
import { TravelTypeEnum } from "../enum/travelType.enum";

export class PaginationCDto {

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
    default: TravelTypeEnum.top,
  })
  @ApiPropertyOptional({ enum: TravelTypeEnum, default: TravelTypeEnum.litoral })
  @IsEnum(TravelTypeEnum)
  @IsOptional()
  readonly type?: TravelTypeEnum  = undefined;

  @ApiPropertyOptional({
    required: false,
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  readonly offer?: boolean;

}
