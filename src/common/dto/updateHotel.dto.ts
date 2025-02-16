import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransportEnum } from "../enum/transport.enum";
import { FoodEnum } from "../enum/food.enum";

export class UpdateHotelDto {
  @ApiProperty({ example: 'Hotel Moldova' })
  @IsString()
  @IsOptional()
  name!: string;

  @ApiProperty({ example: '9c02d733-5381-486c-ac84-abcb7d645d72' })
  @IsUUID()
  @IsOptional()
  country!: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsOptional()
  stars!: number;

  @ApiProperty({ example: 'Pamporovo' })
  @IsString()
  @IsOptional()
  city!: string;

  @ApiProperty({ example: '20.03.2024' })
  @IsString()
  @IsOptional()
  startDate!: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsOptional()
  period!: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  toHotel!: boolean;

  @ApiPropertyOptional({ enum: TransportEnum })
  @IsEnum(TransportEnum)
  @IsOptional()
  transport!: TransportEnum;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsOptional()
  persons!: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  insurance!: boolean;

  @ApiPropertyOptional({ enum: FoodEnum })
  @IsEnum(FoodEnum)
  @IsOptional()
  food!: FoodEnum;

  @ApiProperty({ example: 'Descriere' })
  @IsString()
  @IsOptional()
  description1!: string;

  @ApiProperty({ example: 'Descriere2' })
  @IsString()
  @IsOptional()
  description2!: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive!: boolean;
}