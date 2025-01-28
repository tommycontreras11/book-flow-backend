import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLanguageDTO {
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateLanguageDTO {
  @IsOptional()
  @IsString()
  description: string;
}