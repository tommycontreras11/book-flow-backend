import { Request, Response } from "express";
import { getOneCommentService } from "../../services/comment/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCommentController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneCommentService({
    where: { uuid },
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
