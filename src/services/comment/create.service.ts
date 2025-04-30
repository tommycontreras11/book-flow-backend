import { UserEntity } from "./../../database/entities/entity/user.entity";
import { BookEntity } from "./../../database/entities/entity/book.entity";
import { CreateCommentDTO } from "./../../dto/comment.dto";
import { statusCode } from "./../../utils/status.util";
import { CommentEntity } from "./../../database/entities/entity/comment.entity";
import { uploadFile } from "./../../utils/upload.util";

export async function createCommentService(
  { bookUUID, userUUID, parentCommentUUID, content }: CreateCommentDTO,
  file: Express.Multer.File | undefined
) {
  const foundBook = await BookEntity.findOneBy({ uuid: bookUUID }).catch(
    (e) => {
      console.error("BookEntity.findOneBy: ", e);
      return null;
    }
  );

  if (!foundBook)
    return Promise.reject({
      message: "Book not found",
      status: statusCode.NOT_FOUND,
    });

  const foundUser = await UserEntity.findOneBy({ uuid: userUUID }).catch(
    (e) => {
      console.error("UserEntity.findOneBy: ", e);
      return null;
    }
  );

  if (!foundUser)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

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

  const createdComment = CommentEntity.create({
    content,
    book_id: foundBook.id,
    user_id: foundUser.id,
    ...(parentComment && { parent: parentComment }),
  });

  if (file) {
    createdComment.file_name = await uploadFile<CommentEntity>(
      createdComment,
      file
    );
  }

  await createdComment.save().catch((e) => {
    console.error("CommentEntity.create: ", e);
    return null;
  });

  return "Comment created successfully";
}
