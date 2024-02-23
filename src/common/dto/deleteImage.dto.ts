import { IsString, IsUUID } from 'class-validator';

export class DeleteImageDto {
  @IsString()
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;
}
