import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDTO {
  @IsUUID("4")
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

  @IsUUID("4")
  @IsString()
  @IsOptional()
  parentCommentUUID?: string | null;
}

export class UpdateCommentDTO {
  @IsUUID("4")
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

  @IsUUID("4")
  @IsString()
  @IsOptional()
  parentCommentUUID?: string | null;
}
