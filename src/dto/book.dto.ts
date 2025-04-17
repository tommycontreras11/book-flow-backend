import {
  IsArray,
  IsDate,
  IsDateString,
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
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsString()
  topographicalSignature: string;

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => {
    const date = new Date(value);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  })
  publishedDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pages: number;

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
  genreUUIDs: string[];
}

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  @MaxLength(250)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsString()
  topographicalSignature: string;

  @IsOptional()
  @IsString()
  isbn: string;

  @IsDateString()
  @IsOptional()
  publishedDate: Date;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pages: number;

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

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
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
  genreUUIDs: string[];

  @IsOptional()
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum;
}
