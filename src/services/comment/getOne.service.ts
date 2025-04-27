import { FindOneOptions } from "typeorm";
import { CommentEntity } from "../../database/entities/entity/comment.entity";
import { statusCode } from "../../utils/status.util";

export async function getOneCommentService(
  option: FindOneOptions<CommentEntity>
) {
  const comment = await CommentEntity.findOne(option).catch((e) => {
    console.error("CommentEntity.findOne: ", e);
    return null;
  });

  if (!comment)
    return Promise.reject({
      message: "Comments not found",
      status: statusCode.NOT_FOUND,
    });

  return comment;
}
