import { Request, Response } from "express";
import { updateBookService } from "../../services/book/update.service";
import { statusCode } from "../../utils/status.util";

export const updateBookController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  updateBookService(uuid, req.body, req.file)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
