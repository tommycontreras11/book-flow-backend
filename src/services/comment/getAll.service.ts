import { CommentEntity } from "./../../database/entities/entity/comment.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "./../../utils/status.util";

export async function getAllCommentService(
  options?: FindManyOptions<CommentEntity>
) {
  const comments = await CommentEntity.find(options).catch((e) => {
    console.error("CommentEntity.find: ", e);
    return null;
  });

  if (!comments)
    return Promise.reject({
      message: "Comments not found",
      status: statusCode.NOT_FOUND,
    });

  return comments;
}
