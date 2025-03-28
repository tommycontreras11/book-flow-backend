import { Request, Response } from "express";
import { meService } from "./../../services/auth/me.service";
import { statusCode } from "../../utils/status.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { UserRoleEnum } from "./../../enums/user.enum";

export const meController = async (req: Request, res: Response) => {
  meService(req?.user?.uuid)
    .then((data) => {
        const user = {
            uuid: data?.uuid,
            name: data?.name,
            email: data?.email,
            status: data?.status,
            role: data instanceof UserEntity ? UserRoleEnum.USER : UserRoleEnum.EMPLOYEE,
        }

        return res.status(statusCode.OK).json({ data: user ?? null });
    })
    .catch((e) => {
      return res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } });
    });
};
