import { FindManyOptions, TreeRepository } from "typeorm";
import connection from "./../../database/connection";
import { CommentEntity } from "./../../database/entities/entity/comment.entity";
import { statusCode } from "./../../utils/status.util";
import { ObjectStorage } from "./../../libs/object-storage";

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

  return await Promise.all(commentsTree.map(formatComment));
}
  export const formatComment = async (comment: CommentEntity): Promise<any> => {
  const storage = ObjectStorage.instance;

  const repository = connection.getTreeRepository(CommentEntity);

  return {
    uuid: comment.uuid,
    content: comment.content,
    ...(comment.file_name && { url: await storage.getUrl(comment.file_name) }),
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
    totalComments: await repository.countDescendants(comment),
    replies: await Promise.all(comment.replies?.map(formatComment) || []),
  };
};
