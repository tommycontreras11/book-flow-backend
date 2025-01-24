import { Request, Response } from "express";
import { updateUserService } from "../../services/user/update.service";
import { statusCode } from "../../utils/status.util";

export const updateUserController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  updateUserService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
