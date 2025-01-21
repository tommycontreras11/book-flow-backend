import { NextFunction, Request, Response } from "express";
import { statusCode } from "../../utils/statusCode";
import { getOneUserService } from "./../../services/user/getOne.service";

export const getOneUserController = async (req: Request, res: Response, _next: NextFunction) => {
  const { uuid } = req.params;

  getOneUserService({ where: { uuid } })
    .then((data) => {
      const user = {
        name: data.name,
        username: data.username,
        identification: data.identification,
        carnet_number: data.carnet_number,
        person_type: data.person_type,
        state: data.state,
      };

      return res.status(statusCode.OK).json({ data: user });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
