import { Request, Response } from "express";
import { statusCode } from "../../utils/statusCode";
import { getOneUserService } from "./../../services/user/getOne.service";

export const getOneUserController = async (_req: Request, res: Response) => {
  getOneUserService({})
    .then((data) => res.status(statusCode.OK).json({ data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
