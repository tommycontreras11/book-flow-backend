import { FindOneOptions } from "typeorm";
import { CommentEntity } from "../../database/entities/entity/comment.entity";
import { statusCode } from "../../utils/status.util";
import connection from "./../../database/connection";
import { formatComment } from "./getAll.service";

export async function getOneCommentService(
  option: FindOneOptions<CommentEntity>
) {
  const comment = connection.getTreeRepository(CommentEntity);

  const foundComment = await comment.findOne(option);

  if (!foundComment)
    return Promise.reject({
      message: "Comment not found",
      status: statusCode.NOT_FOUND,
    });

  const tree = await comment.findDescendantsTree(foundComment, {
    relations: ["user", "book"],
  });

  return await formatComment(tree);
}
