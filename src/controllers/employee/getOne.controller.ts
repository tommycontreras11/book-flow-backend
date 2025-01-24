import { Request, Response } from "express";
import { getOneEmployeeService } from "../../services/employee/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneEmployeeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneEmployeeService({ where: { uuid } })
    .then((data) => {
      const employee = {
        name: data.name,
        username: data.username,
        identification: data.identification,
        work_shift: data.work_shift,
        commission_percentage: data.commission_percentage,
        entry_date: data.entry_date,
        status: data.status
      };

      return res.status(statusCode.OK).json({ data: employee });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
