import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
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
  @IsUUID("4")
  @IsString()
  @IsOptional()
  bookUUID: string;

  @IsEnum(StatusRequestEnum)
  @IsOptional()
  status: StatusRequestType;
}
