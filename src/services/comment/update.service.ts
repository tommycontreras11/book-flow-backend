import { statusCode } from "./../../utils/status.util";
import { BookEntity } from "./../../database/entities/entity/book.entity";
import { UpdateCommentDTO } from "./../../dto/comment.dto";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { CommentEntity } from "./../../database/entities/entity/comment.entity";
import { deleteFile, uploadFile } from "./../../utils/upload.util";

export async function updateCommentService(
  uuid: string,
  { bookUUID, userUUID, parentCommentUUID, content }: UpdateCommentDTO,
  file: Express.Multer.File | undefined
) {
  const foundComment = await CommentEntity.findOneBy({ uuid }).catch((e) => {
    console.error("CommentEntity.findOneBy: ", e);
    return null;
  });

  if (!foundComment)
    return Promise.reject({
      message: "Comment not found",
      status: statusCode.NOT_FOUND,
    });

  let foundBook: BookEntity | null = null;
  if (bookUUID) {
    foundBook = await BookEntity.findOneBy({ uuid: bookUUID }).catch((e) => {
      console.error("BookEntity.findOneBy: ", e);
      return null;
    });

    if (!foundBook)
      return Promise.reject({
        message: "Book not found",
        status: statusCode.NOT_FOUND,
      });
  }

  let foundUser: UserEntity | null = null;
  if (userUUID) {
    foundUser = await UserEntity.findOneBy({ uuid: userUUID }).catch((e) => {
      console.error("UserEntity.findOneBy: ", e);
      return null;
    });

    if (!foundUser)
      return Promise.reject({
        message: "User not found",
        status: statusCode.NOT_FOUND,
      });
  }

  let parentComment: CommentEntity | null = null;
  if (parentCommentUUID) {
    parentComment = await CommentEntity.findOneBy({
      uuid: parentCommentUUID,
    }).catch((e) => {
      console.error("CommentEntity.findOneBy: ", e);
      return null;
    });

    if (!parentComment)
      return Promise.reject({
        message: "Parent comment not found",
        status: statusCode.NOT_FOUND,
      });
  }

  foundComment.book_id = foundBook?.id ?? foundComment.book_id;
  foundComment.user_id = foundUser?.id ?? foundComment.user_id;
  foundComment.parent_comment_id =
    parentComment?.id ?? foundComment?.parent_comment_id ?? null;
  foundComment.content = content ?? foundComment.content;

  if (file) {
    await deleteFile(foundComment.file_name);
    foundComment.file_name = await uploadFile<CommentEntity>(
      foundComment,
      file
    );
  }
  await foundComment.save().catch((e) => {
    console.error("CommentEntity.updated: ", e);
    return null;
  });

  return "Comment updated successfully";
}
