import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { StatusEnum } from "./../database/entities/base/base.entity";

export class CreateAuthorDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  birthCountryUUID: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  nativeLanguageUUID: string;
}

export class UpdateAuthorDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  birthCountryUUID: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  nativeLanguageUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  state: keyof typeof StatusEnum;
}
