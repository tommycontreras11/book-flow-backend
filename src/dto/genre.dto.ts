import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum } from "./../database/entities/base/base.entity";

export class CreateGenreDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateGenreDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum;
}
