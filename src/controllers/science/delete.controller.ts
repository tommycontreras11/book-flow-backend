import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { deleteScienceService } from "../../services/science/delete.service";

export const deleteScienceController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  deleteScienceService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
