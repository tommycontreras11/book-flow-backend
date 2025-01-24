import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { deleteBookService } from "../../services/book/delete.service";

export const deleteBookController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  deleteBookService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
