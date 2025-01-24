import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { getOneLoanManagementService } from "../../services/loan-management/getOne.service";

export const getOneLoanManagementController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneLoanManagementService({
    where: { uuid },
    relations: { request: { book: { authors: true }, user: true } },
  })
    .then((data) => {
      const author = {
        uuid: data.uuid,
        loan_number: data.loan_number,
        date_loan: data.date_loan,
        date_return: data.date_return,
        amount_day: data.amount_day,
        quantity_day: data.quantity_day,
        request: {
          uuid: data.request.uuid,
          book: {
            uuid: data.request.book.uuid,
            description: data.request.book.description,
            language: data.request.book.language,
            publication_year: data.request.book.publication_year,
            authors: data.request.book.authors.map((author) => author.name),
          },
          user: {
            uuid: data.request.user.uuid,
            name: data.request.user.name
          },
        },
        status: data.status,
      };

      return res.status(statusCode.OK).json({ data: author });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
