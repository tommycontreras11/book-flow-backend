import { Request, Response } from "express";
import { getAllPublisherService } from "../../services/publisher/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllPublisherController = async (_req: Request, res: Response) => {
  getAllPublisherService({})
    .then((data) => {
      const publishers = data.map((publisher) => ({
        uuid: publisher.uuid,
        description: publisher.description
      }));

      return res.status(statusCode.OK).json({ data: publishers })
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
