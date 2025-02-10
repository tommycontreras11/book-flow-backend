import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength
} from "class-validator";
import { StatusEnum } from "../database/entities/base/base.entity";

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  name: string;

  @IsNotEmpty()
  @IsString()
  topographicalSignature: string;

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNotEmpty()
  @IsNumber()
  publicationYear: number;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  bibliographyTypeUUID: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  publisherUUID: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  languageUUID: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  scienceUUID: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  authorUUIDs: string[];
}

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  name: string;

  @IsOptional()
  @IsString()
  topographicalSignature: string;

  @IsOptional()
  @IsString()
  isbn: string;

  @IsOptional()
  @IsNumber()
  publicationYear: number;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  bibliographyTypeUUID: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  publisherUUID: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  languageUUID: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  scienceUUID: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  authorUUIDs: string[];

  @IsOptional()
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum;
}
