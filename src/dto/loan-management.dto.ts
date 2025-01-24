import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { LoanManagementEnum } from "./../database/entities/entity/loan-management.entity";

@ValidatorConstraint({ name: "DateLoanReturnValidation", async: false })
class DateLoanReturnValidation implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments): boolean {
    const { date_loan, date_return } = args.object as UpdateLoanManagementDTO;

    const isDateLoanEmpty = !date_loan || date_loan.trim() === "";
    const isDateReturnEmpty = !date_return || date_return.trim() === "";

    return (
      (isDateLoanEmpty && isDateReturnEmpty) ||
      (!isDateLoanEmpty && !isDateReturnEmpty)
    );
  }

  defaultMessage(_args: ValidationArguments): string {
    return "Both date_loan and date_return must either be empty or both provided.";
  }
}

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
  @IsOptional()
  @Validate(DateLoanReturnValidation)
  date_loan: string;

  @IsString()
  @IsOptional()
  @Validate(DateLoanReturnValidation)
  date_return: string;

  @IsString()
  @MaxLength(250)
  @IsOptional()
  comment: string;

  @IsOptional()
  @IsEnum(LoanManagementEnum)
  status: keyof typeof LoanManagementEnum;
}
