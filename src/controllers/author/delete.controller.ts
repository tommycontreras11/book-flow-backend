import { Request, Response } from "express";
import { statusCode } from "../../utils/statusCode";
import { deleteAuthorService } from "../../services/author/delete.service";

export const deleteAuthorController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  deleteAuthorService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
