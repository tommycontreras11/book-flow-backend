import { Request, Response } from "express";
import { updateScienceService } from "../../services/science/update.service";
import { statusCode } from "../../utils/statusCode";

export const updateScienceController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  updateScienceService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
