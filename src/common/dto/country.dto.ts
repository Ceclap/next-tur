import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TravelTypeEnum } from "../enum/travelType.enum";

export class CountryDto {
  @ApiProperty({ example: 'Turcia' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Descriere' })
  @IsString()
  @IsOptional()
  description!: string;

  @ApiPropertyOptional({ enum: TravelTypeEnum })
  @IsEnum(TravelTypeEnum)
  @IsOptional()
  travelType!: TravelTypeEnum;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  offers!: boolean;


}