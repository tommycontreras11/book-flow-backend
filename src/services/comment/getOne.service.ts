import { FindOneOptions } from "typeorm";
import { CommentEntity } from "../../database/entities/entity/comment.entity";
import { statusCode } from "../../utils/status.util";
import connection from "./../../database/connection";
import { formatComment } from "./getAll.service";

export async function getOneCommentService(
  option: FindOneOptions<CommentEntity>
) {
  const comment = connection.getTreeRepository(CommentEntity);

  const topLevelComments = await comment.findOne(option);

  if (!topLevelComments)
    return Promise.reject({
      message: "Comments not found",
      status: statusCode.NOT_FOUND,
    });

  const commentsTree = await comment.findDescendantsTree(topLevelComments, {
    relations: ["user", "book"],
  });

  return formatComment(commentsTree);
}
