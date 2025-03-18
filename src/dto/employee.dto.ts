import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";
import { StatusEnum } from "./../database/entities/base/base.entity";
import { WorkShiftEnum, WorkShiftType } from "./../database/entities/entity/employee.entity";

export class CreateEmployeeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  identification: string;

  @IsEnum(WorkShiftEnum)
  @IsNotEmpty()
  work_shift: WorkShiftType;

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
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  identification: string;

  @IsEnum(WorkShiftEnum)
  @IsOptional()
  work_shift: WorkShiftType;

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
