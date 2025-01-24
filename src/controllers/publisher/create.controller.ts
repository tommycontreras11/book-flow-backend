import { Request, Response } from "express";
import { createPublisherService } from "../../services/publisher/create.service";
import { statusCode } from "../../utils/status.util";

export const createPublisherController = async (req: Request, res: Response) => {
  createPublisherService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
