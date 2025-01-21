import { Request, Response } from "express";
import { createEmployeeService } from "../../services/employee/create.service";
import { statusCode } from "../../utils/statusCode";

export const createEmployeeController = async (req: Request, res: Response) => {
  createEmployeeService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
