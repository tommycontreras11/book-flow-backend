import { NextFunction, Request, Response } from "express";
import { statusCode } from "../../utils/statusCode";
import { getOneEmployeeService } from "../../services/employee/getOne.service";

export const getOneEmployeeController = async (req: Request, res: Response, _next: NextFunction) => {
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
        state: data.state
      };

      return res.status(statusCode.OK).json({ data: employee });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
