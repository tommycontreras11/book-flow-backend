import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { getAllRequestService } from "./../../services/request/getAll.service";
import { StatusRequestEnum } from "./../../database/entities/entity/request.entity";
import { retrieveIfUserExists } from "./../../utils/user.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { In } from "typeorm";

export const getAllRequestController = async (req: Request, res: Response) => {
  const { status } = req.query as { status: StatusRequestEnum };
  const foundUser = (await retrieveIfUserExists(null, null, req?.user?.uuid))
    ?.data;

  const statusArray = [status].join(",").split(",") as StatusRequestEnum[];

const filters = {
  ...(foundUser instanceof UserEntity && {
    user: { id: foundUser.id } ,
  }),
  ...(statusArray.length > 0 && { status: In(statusArray) }),
};

  getAllRequestService({ where: filters, relations: { user: true, book: true } })
    .then((data) => {
      const requests = data.map((request) => ({
        uuid: request.uuid,
        user: {
          uuid: request.user.uuid,
          name: request.user.name,
        },
        book: {
          uuid: request.book.uuid,
          name: request.book.name,
        },
        status: request.status,
      }));

      return res.status(statusCode.OK).json({ data: requests });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
