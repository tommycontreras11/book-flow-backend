import { Request, Response } from "express";
import { getAllCountryService } from "../../services/country/getAll.service";
import { statusCode } from "../../utils/statusCode";

export const getAllCountryController = async (_req: Request, res: Response) => {
  getAllCountryService({})
    .then((data) => {
      const users = data.map((country) => ({
        name: country.name
      }));

      return res.status(statusCode.OK).json({ data: users })
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
