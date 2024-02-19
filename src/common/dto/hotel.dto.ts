import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransportEnum } from "../enum/transport.enum";
import { FoodEnum } from "../enum/food.enum";

export class HotelDto {
  @ApiProperty({ example: 'Hotel Moldova' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Moldova' })
  @IsString()
  @IsNotEmpty()
  country!: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsNotEmpty()
  persons!: number;

  @ApiPropertyOptional({ enum: TransportEnum })
  @IsEnum(TransportEnum)
  @IsNotEmpty()
  transport!: TransportEnum;

  @ApiProperty({ example: '20.03.2024' })
  @IsString()
  @IsNotEmpty()
  startDate!: string;


  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsNotEmpty()
  period!: number;

  @ApiPropertyOptional({ enum: FoodEnum })
  @IsEnum(FoodEnum)
  @IsNotEmpty()
  food!: FoodEnum;

}