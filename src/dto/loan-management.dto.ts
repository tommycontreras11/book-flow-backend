import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { LoanManagementEnum } from "./../database/entities/entity/loan-management.entity";

export class CreateLoanManagementDTO {
  @IsString()
  @IsNotEmpty()
  date_loan: string;

  @IsString()
  @IsNotEmpty()
  date_return: string;

  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  comment: string;
}

export class UpdateLoanManagementDTO {
  @IsString()
  @IsNotEmpty()
  date_loan: string;

  @IsString()
  @IsNotEmpty()
  date_return: string;

  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  comment: string;

  @IsOptional()
  @IsEnum(LoanManagementEnum)
  status: keyof typeof LoanManagementEnum;
}
