import { Request, Response } from "express";
import { statusCode } from "../../utils/statusCode";
import { deletePublisherService } from "../../services/publisher/delete.service";

export const deletePublisherController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  deletePublisherService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
