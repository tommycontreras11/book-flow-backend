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
import { Transform } from "class-transformer";

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
  @Transform(({ value }) => Number(value))
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
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [value]; 
      }
    }
    return value;
  })
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
