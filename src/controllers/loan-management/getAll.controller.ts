import { Request, Response } from "express";
import { getAllLoanManagementService } from "../../services/loan-management/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllLoanManagementController = async (_req: Request, res: Response) => {
  getAllLoanManagementService({
    relations: { request: { book: { authors: true }, user: true } },
  })
    .then((data) => {
      const loanManagements = data.map((loanManagement) => ({
        uuid: loanManagement.uuid,
        loan_number: loanManagement.loan_number,
        date_loan: loanManagement.date_loan,
        date_return: loanManagement.date_return,
        amount_day: loanManagement.amount_day,
        quantity_day: loanManagement.quantity_day,
        request: {
          uuid: loanManagement.request.uuid,
          book: {
            uuid: loanManagement.request.book.uuid,
            description: loanManagement.request.book.description,
            language: loanManagement.request.book.language,
            publication_year: loanManagement.request.book.publication_year,
            authors: loanManagement.request.book.authors.map((author) => author.name),
          },
          user: {
            uuid: loanManagement.request.user.uuid,
            name: loanManagement.request.user.name
          },
        },
        status: loanManagement.status,
      }));

      return res.status(statusCode.OK).json({ data: loanManagements });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
