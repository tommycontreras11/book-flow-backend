import { Request, Response } from "express";
import { createAuthorService } from "../../services/author/create.service";
import { statusCode } from "../../utils/status.util";

export const createAuthorController = async (req: Request, res: Response) => {
  createAuthorService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
