import { Request, Response } from "express";
import { getAllEmployeeService } from "../../services/employee/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllEmployeeController = async (_req: Request, res: Response) => {
  getAllEmployeeService({})
    .then((data) => {
      const users = data.map((employee) => ({
        uuid: employee.uuid,
        name: employee.name,
        email: employee.email,
        identification: employee.identification,
        work_shift: employee.work_shift,
        commission_percentage: employee.commission_percentage,
        entry_date: employee.entry_date,
        status: employee.status
      }));

      return res.status(statusCode.OK).json({ data: users })
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
