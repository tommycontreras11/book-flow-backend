import { Request, Response } from "express";
import { getAllUserService } from "services/user/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllUserController = async (_req: Request, res: Response) => {
  getAllUserService({})
    .then((data) => res.status(statusCode.OK).json({ data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
