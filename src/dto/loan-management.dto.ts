import {
  IsDate,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";
import { LoanManagementEnum } from "./../database/entities/entity/loan-management.entity";

export class CreateLoanManagementDTO {
  @IsDateString()
  @IsOptional()
  date_return: Date;

  @IsString()
  @MaxLength(250)
  @IsOptional()
  comment: string;
}

export class UpdateLoanManagementDTO {
  @IsString()
  @IsOptional()
  date_loan: string;

  @IsString()
  @IsOptional()
  date_return: string;

  @IsString()
  @MaxLength(250)
  @IsOptional()
  comment: string;

  @IsOptional()
  @IsEnum(LoanManagementEnum)
  status: keyof typeof LoanManagementEnum;
}
