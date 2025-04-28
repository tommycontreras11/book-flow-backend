import { Request, Response } from "express";
import { getAllCommentService } from "./../../services/comment/getAll.service";
import { statusCode } from "./../../utils/status.util";
import { ObjectStorage } from "./../../libs/object-storage";

export const getAllCommentController = async (_req: Request, res: Response) => {
  getAllCommentService({
    relations: {
      user: true,
      book: true,
      parent: true
    }
  })
    .then(async (data) => {
      const storage = ObjectStorage.instance;
      const comments = await Promise.all(
        data.map(async (comment) => {

          return {
            uuid: comment.uuid,
            content: comment.content,
            book: {
              uuid: comment.book.uuid,
              name: comment.book.name,
            },
            user: {
              uuid: comment.user.uuid,
              name: comment.user.name,
            },
            parentComment: {
              uuid: comment?.parent?.uuid,
              content: comment?.parent?.content,
              user: {
                uuid: comment?.parent?.user?.uuid,
                name: comment?.parent?.user?.name,
              },
              book: {
                uuid: comment?.parent?.book?.uuid,
                name: comment?.parent?.book?.name,
              },
              ...(comment?.parent?.file_name && {
                url: await storage.getUrl(comment?.parent?.file_name),
              }),              
            },
            createdAt: comment.createdAt,
            ...(comment?.file_name && { url: await storage.getUrl(comment?.file_name) })
          };
        })
      );

      return res.status(statusCode.OK).json({ data: comments });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
