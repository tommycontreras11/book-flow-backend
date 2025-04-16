import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGenreDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateGenreDTO {
  @IsOptional()
  @IsString()
  name: string;
}
