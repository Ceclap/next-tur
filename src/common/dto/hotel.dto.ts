import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransportEnum } from "../enum/transport.enum";
import { FoodEnum } from "../enum/food.enum";

export class HotelDto {
  @ApiProperty({ example: 'Hotel Moldova' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '9c02d733-5381-486c-ac84-abcb7d645d72' })
  @IsUUID()
  @IsNotEmpty()
  country_id!: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  stars!: number;

  @ApiProperty({ example: 'Pamporovo' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ example: '20.03.2024' })
  @IsString()
  @IsNotEmpty()
  startDate!: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsNotEmpty()
  period!: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  toHotel!: boolean;

  @ApiPropertyOptional({ enum: TransportEnum })
  @IsEnum(TransportEnum)
  @IsNotEmpty()
  transport!: TransportEnum;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsNotEmpty()
  persons!: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  insurance!: boolean;

  @ApiPropertyOptional({ enum: FoodEnum })
  @IsEnum(FoodEnum)
  @IsNotEmpty()
  food!: FoodEnum;

  @ApiProperty({ example: 'Descriere' })
  @IsString()
  @IsNotEmpty()
  description1!: string;

  @ApiProperty({ example: 'Descriere2' })
  @IsString()
  @IsNotEmpty()
  description2!: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive!: boolean;

}