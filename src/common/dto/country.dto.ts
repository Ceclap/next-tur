import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CountryDto {
  @ApiProperty({ example: 'Turcia' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}