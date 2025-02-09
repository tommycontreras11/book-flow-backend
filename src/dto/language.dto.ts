import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLanguageDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateLanguageDTO {
  @IsOptional()
  @IsString()
  name: string;
}