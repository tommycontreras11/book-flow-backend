import { Request, Response } from "express";
import { createCommentService } from "./../../services/comment/create.service";
import { statusCode } from "./../../utils/status.util";

export const createCommentController = async (req: Request, res: Response) => {
  createCommentService(req.body, req.file)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
