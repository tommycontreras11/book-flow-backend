import { Request, Response } from "express";
import { getOneRequestService } from "../../services/request/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneRequestController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneRequestService({ where: { uuid }, relations: { book: true } })
    .then((data) => {
      const request = {
        uuid: data.uuid,
        status: data.status,
        book: {
          uuid: data.book.uuid,
          name: data.book.name,
        },
      };

      return res.status(statusCode.OK).json({ data: request });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
