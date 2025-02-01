import { Request, Response } from "express";
import { meService } from "./../../services/auth/me.service";
import { statusCode } from "../../utils/status.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";

export const meController = async (req: Request, res: Response) => {
  meService(req?.user?.uuid)
    .then((data) => {
        const user = {
            uuid: data.uuid,
            name: data.name,
            status: data.status,
            role: data instanceof UserEntity ? 'user' : 'employee',
        }

        return res.status(statusCode.OK).json({ data: user });
    })
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
