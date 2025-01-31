import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { updateRequestEmployeeStatusService } from "./../../services/request/update-request-employee-status.service";

export const updateRequestEmployeeStatusController = async (req: Request, res: Response) => {
  const { requestUUID, employeeUUID } = req.params;

  updateRequestEmployeeStatusService(requestUUID, employeeUUID, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
