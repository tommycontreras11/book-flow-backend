import { FindManyOptions } from "typeorm";
import connection from "./../../database/connection";
import { CommentEntity } from "./../../database/entities/entity/comment.entity";
import { statusCode } from "./../../utils/status.util";

export async function getAllCommentService(
  options?: FindManyOptions<CommentEntity>
) {
  const comments = connection.getTreeRepository(CommentEntity);

  const topLevelComments = await comments.find(options);

  if (!topLevelComments)
    return Promise.reject({
      message: "Comments not found",
      status: statusCode.NOT_FOUND,
    });

  const commentsTree = await Promise.all(
    topLevelComments.map((comment) =>
      comments.findDescendantsTree(comment, {
        relations: ["user", "book"],
      })
    )
  );

  return commentsTree.map(formatComment);
}

export const formatComment = (comment: CommentEntity): any => {
  return {
    uuid: comment.uuid,
    content: comment.content,
    // ...(comment.file_name && { url: await storage.getUrl(comment.file_name) }),
    ...(comment.file_name && { url: comment.file_name }),
    status: comment.status,
    createdAt: comment.createdAt,
    user: {
      uuid: comment.user.uuid,
      name: comment.user.name,
    },
    book: {
      uuid: comment.book.uuid,
      name: comment.book.name,
    },
    replies: comment.replies?.map(formatComment) || [],
  };
};
