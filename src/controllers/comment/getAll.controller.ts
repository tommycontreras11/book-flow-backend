import { Request, Response } from "express";
import { IsNull } from "typeorm";
import { getAllCommentService } from "./../../services/comment/getAll.service";
import { statusCode } from "./../../utils/status.util";

export const getAllCommentController = async (req: Request, res: Response) => {
  const { bookUUID } = req.query as { bookUUID?: string };

  getAllCommentService({
    where: { 
      parent: IsNull(), 
      ...(bookUUID && { book: { uuid: bookUUID } }) 
    },
    relations: {
      user: true,
      book: true,
    },
  })
    .then(async (data) => {
      return res.status(statusCode.OK).json({ data: data });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
