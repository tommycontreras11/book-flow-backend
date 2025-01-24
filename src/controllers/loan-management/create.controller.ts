import { Request, Response } from "express";
import { createLoanManagementService } from "../../services/loan-management/create.service";
import { statusCode } from "../../utils/status.util";

export const createLoanManagementController = async (req: Request, res: Response) => {
  const { requestUUID } = req.params;

  createLoanManagementService(requestUUID, req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
