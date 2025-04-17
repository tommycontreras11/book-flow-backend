import { Request, Response } from "express";
import { getAllLoanManagementService } from "../../services/loan-management/getAll.service";
import { statusCode } from "../../utils/status.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { retrieveIfUserExists } from "./../../utils/user.util";
import { Between } from "typeorm";
import { ObjectStorage } from "./../../libs/object-storage";

export const getAllLoanManagementController = async (
  req: Request,
  res: Response
) => {
  const { bibliography_type, language, date_loan, date_return } = req.query as {
    bibliography_type?: string;
    language?: string;
    date_loan?: Date;
    date_return?: Date;
  };

  const foundUser = await retrieveIfUserExists(
    UserEntity,
    null,
    null,
    req?.user?.uuid
  );

  const filters = {
    ...(foundUser instanceof UserEntity && {
      request: { user: { id: foundUser.id } },
    }),
    ...(bibliography_type && {
      request: { book: { bibliographyType: { name: bibliography_type } } },
    }),
    ...(language && { request: { book: { language: { name: language } } } }),
    ...(date_loan &&
      date_return && { date_loan: Between(date_loan, date_return) }),
    ...(date_loan && !date_return && { date_loan: date_loan }),
    ...(!date_loan && date_return && { date_return: date_return }),
  };

  await getAllLoanManagementService({
    where: filters,
    relations: {
      request: {
        book: { authors: true, bibliographyType: true, language: true },
        user: true,
      },
    },
  })
    .then(async (data) => {
      const storage = ObjectStorage.instance;

      const loanManagements = await Promise.all(
        data.map(async (loanManagement) => {
          return {
            uuid: loanManagement.uuid,
            loan_number: loanManagement.loan_number,
            date_loan: loanManagement.date_loan,
            date_return: loanManagement.date_return,
            amount_day: loanManagement.amount_day,
            quantity_day: loanManagement.quantity_day,
            comment: loanManagement.comment,
            request: {
              uuid: loanManagement.request.uuid,
              book: {
                uuid: loanManagement.request.book.uuid,
                name: loanManagement.request.book.name,
                language: loanManagement.request.book.language.name,
                publishedDate: loanManagement.request.book.published_date,
                authors: loanManagement.request.book.authors.map(
                  (author) => author.name
                ),
                url: await storage.getUrl(
                  loanManagement.request.book.file_name
                ),
              },
              user: {
                uuid: loanManagement.request.user.uuid,
                name: loanManagement.request.user.name,
              },
            },
            status: loanManagement.status,
          };
        })
      );

      return res.status(statusCode.OK).json({ data: loanManagements });
    })
    .catch((error) => {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error });
    });
};
