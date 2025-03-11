import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";
import { LoanManagementEnum } from "./../database/entities/entity/loan-management.entity";

export class CreateLoanManagementDTO {
  @IsString()
  @IsOptional()
  date_return: string;

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
