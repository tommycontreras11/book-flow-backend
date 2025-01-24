import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { StatusEnum } from "./../database/entities/base/base.entity";

export class CreateEmployeeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  identification: string;

  @IsNotEmpty()
  @IsString()
  work_shift: string;

  @IsNotEmpty()
  @IsNumber()
  commission_percentage: number;

  @IsNotEmpty()
  @IsString()
  entry_date: string;
}

export class UpdateEmployeeDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  identification: string;

  @IsOptional()
  @IsString()
  work_shift: string;

  @IsOptional()
  @IsNumber()
  commission_percentage: number;

  @IsOptional()
  @IsString()
  entry_date: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: keyof typeof StatusEnum;
}
