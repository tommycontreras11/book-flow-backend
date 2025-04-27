import { CommentEntity } from "./../../database/entities/entity/comment.entity";
import { statusCode } from "./../../utils/status.util";

export async function deleteCommentService(uuid: string) {
  const foundComment = await CommentEntity.findOneBy({ uuid }).catch((e) => {
    console.error("CommentEntity.findOneBy: ", e);
    return null;
  });

  if (!foundComment)
    return Promise.reject({
      message: "Comment not found",
      status: statusCode.NOT_FOUND,
    });

  await foundComment.softRemove().catch((e) => {
    console.error("CommentEntity.softRemove: ", e);
    return null;
  });

  return "Comment deleted successfully";
}
