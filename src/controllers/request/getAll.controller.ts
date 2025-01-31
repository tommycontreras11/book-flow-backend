import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { getAllRequestService } from "./../../services/request/getAll.service";
import { StatusRequestEnum } from "./../../database/entities/entity/request.entity";

export const getAllRequestController = async (req: Request, res: Response) => {
  const { status } = req.query as { status?: StatusRequestEnum };

  const filters = {
    ...(status && { where: { status } }),
  };

  getAllRequestService({ ...filters, relations: { user: true, book: true } })
    .then((data) => {
      const requests = data.map((request) => ({
        uuid: request.uuid,
        user: {
          uuid: request.user.uuid,
          name: request.user.name,
        },
        book: {
          uuid: request.book.uuid,
          description: request.book.description,
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
