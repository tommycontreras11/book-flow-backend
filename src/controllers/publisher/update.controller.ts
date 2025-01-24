import { Request, Response } from "express";
import { updatePublisherService } from "./../../services/publisher/update.service";
import { statusCode } from "../../utils/status.util";

export const updatePublisherController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  updatePublisherService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
