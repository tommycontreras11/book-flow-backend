import { Request, Response } from "express";
import { createUserService } from "./../../services/user/create.service";
import { statusCode } from "./../../utils/statusCode";

export const createUserController = async (req: Request, res: Response) => {
  createUserService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
