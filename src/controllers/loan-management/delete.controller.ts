import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { deleteLoanManagementService } from "../../services/loan-management/delete.service";

export const deleteLoanManagementController = async (req: Request, res: Response) => {
  const { uuid } =  req.params;

  deleteLoanManagementService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
