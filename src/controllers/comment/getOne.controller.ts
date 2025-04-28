import { Request, Response } from "express";
import { getOneCommentService } from "../../services/comment/getOne.service";
import { statusCode } from "../../utils/status.util";
import { ObjectStorage } from "./../../libs/object-storage";

export const getOneCommentController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneCommentService({ where: { uuid } })
    .then(async (data) => {
      const storage = ObjectStorage.instance;

      const comment = {
        uuid: data.uuid,
        content: data.content,
        book: {
          uuid: data.book.uuid,
          name: data.book.name,
        },
        user: {
          uuid: data.user.uuid,
          name: data.user.name,
        },
        parentComment: {
          uuid: data?.parent?.uuid,
          content: data?.parent?.content,
          user: {
            uuid: data?.parent?.user?.uuid,
            name: data?.parent?.user?.name,
          },
          book: {
            uuid: data?.parent?.book?.uuid,
            name: data?.parent?.book?.name,
          },
          ...(data?.parent?.file_name && {
            url: await storage.getUrl(data?.parent?.file_name),
          }),
        },
        createdAt: data.createdAt,
        ...(data?.file_name && {
          url: await storage.getUrl(data.file_name),
        }),
      };

      return res.status(statusCode.OK).json({ data: comment });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
