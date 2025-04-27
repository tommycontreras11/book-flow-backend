import { Request, Response } from "express";
import { updateCommentService } from "./../../services/comment/update.service";
import { statusCode } from "../../utils/status.util";

export const updateCommentController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateCommentService(uuid, req.body, req.file)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
