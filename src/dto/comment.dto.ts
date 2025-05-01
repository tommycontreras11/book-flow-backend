import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from "class-validator";

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  bookUUID: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  userUUID: string;

  @ValidateIf((_, value) => !!value)
  @IsUUID("4")
  parentCommentUUID?: string | null;
}

export class UpdateCommentDTO {
  @IsString()
  @IsOptional()
  content: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  bookUUID: string;

  @IsUUID("4")
  @IsString()
  @IsOptional()
  userUUID: string;

  @ValidateIf((_, value) => !!value)
  @IsUUID("4")
  parentCommentUUID?: string | null;
}
