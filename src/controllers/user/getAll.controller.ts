import { Request, Response } from "express";
import { getAllUserService } from "./../../services/user/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllUserController = async (_req: Request, res: Response) => {
  getAllUserService({})
    .then((data) => {
      const users = data.map((user) => ({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        password: user.password.slice(0, 10),
        identification: user.identification,
        carnet_number: user.carnet_number,
        person_type: user.person_type,
        status: user.status
      }));

      return res.status(statusCode.OK).json({ data: users })
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
