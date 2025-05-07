import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID
} from "class-validator";
import { CommentInteractionType, CommentInteractionTypeEnum } from "database/entities/entity/comment-interaction.entity";

export class CreateCommentInteractionDTO {
  @IsEnum(CommentInteractionTypeEnum)
  @IsNotEmpty()
  type: CommentInteractionType;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  userUUID: string;

  @IsUUID("4")
  @IsString()
  @IsNotEmpty()
  commentUUID: string;
}
