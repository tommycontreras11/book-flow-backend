import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { StatusRequestEnum, StatusRequestType } from "./../database/entities/entity/request.entity";

export class CreateRequestDTO {
  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  userUUID: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  bookUUID: string;
}

export class UpdateRequestEmployeeStatusDTO {
  @IsEnum(StatusRequestEnum)
  @IsNotEmpty()
  status: StatusRequestType;
}

export class UpdateRequestDTO {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  description: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  userUUID: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  bookUUID: string;
}
