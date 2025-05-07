import { UserEntity } from "./../../database/entities/entity/user.entity";
import { CreateCommentInteractionDTO } from "./../../dto/comment-interaction.dto";
import { statusCode } from "./../../utils/status.util";
import { CommentEntity } from "./../../database/entities/entity/comment.entity";
import { CommentInteractionEntity } from "database/entities/entity/comment-interaction.entity";

export async function createCommentInteractionService({
  userUUID,
  commentUUID,
  type
}: CreateCommentInteractionDTO) {
  const foundUser = await UserEntity.findOneBy({ uuid: userUUID }).catch(
    (e) => {
      console.error("UserEntity.findOneBy: ", e);
      return null;
    }
  );

  if (!foundUser)
    return Promise.reject({
      message: "User not found",
      status: statusCode.BAD_REQUEST,
    });

  const foundComment = await CommentEntity.findOneBy({
    uuid: commentUUID,
  }).catch((e) => {
    console.error("CommentEntity.findOneBy: ", e);
    return null;
  });

  if (!foundComment)
    return Promise.reject({
      message: "Comment not found",
      status: statusCode.BAD_REQUEST,
    });

  const foundCommentInteraction = await CommentInteractionEntity.findOneBy({
    user_id: foundUser.id,
    comment_id: foundComment.id,
  }).catch((e) => {
    console.error("CommentInteractionEntity.findOneBy: ", e);
    return null;
  });

  let message = "";

  if (foundCommentInteraction) {
    foundCommentInteraction.type = type;

    await foundCommentInteraction.save().catch((e) => {
      console.error("CommentInteractionEntity.save: ", e);
      return null;
    });

    message = "Comment interaction updated successfully";

  } else {
    await CommentInteractionEntity.create({
        user_id: foundUser.id,
        comment_id: foundComment.id,
        type
      })
        .save()
        .catch((e) => {
          console.error("CommentInteractionEntity.create: ", e);
          return null;
        });

    message = "Comment interaction created successfully";
  }

  return message;
}
