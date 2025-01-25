import { Request, Response } from "express";
import { getAllLoanManagementService } from "../../services/loan-management/getAll.service";
import { statusCode } from "../../utils/status.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { retrieveIfUserExists } from "./../../utils/user.util";
import { Between } from "typeorm";

export const getAllLoanManagementController = async (req: Request, res: Response) => {
  const { bibliographyType, language, dateLoan, dateReturn } = req.query as {
    bibliographyType?: string;
    language?: string;
    dateLoan?: string;
    dateReturn?: string;
  };
      
    const foundUser = (await retrieveIfUserExists(null, null, req?.user?.uuid))?.data;

    const filters = {
      ...(foundUser instanceof UserEntity && {
        where: { request: { user: { id: foundUser.id } } },
      }),
      ...(bibliographyType && {
        where: { request: { book: { bibliographyType: { description: bibliographyType } } }},
      }),
      ...(language && { where: { request: { book: { language: { description: language } } } }}),
      ...(dateLoan && dateReturn && { where: { date_loan: Between(dateLoan, dateReturn) } }), 
    };
    
    await getAllLoanManagementService({
      ...filters,
      relations: { request: { book: { authors: true, bibliographyType: true, language: true }, user: true } },
    }).then((data) => {
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
            language: loanManagement.request.book.language.description,
            publication_year: loanManagement.request.book.publication_year,
            authors: loanManagement.request.book.authors.map((author) => author.name),
          },
          user: {
            uuid: loanManagement.request.user.uuid,
            name: loanManagement.request.user.name,
          },
        },
        status: loanManagement.status,
      }));
  
      return res.status(statusCode.OK).json({ data: loanManagements });
    }).catch((error) => {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error });
    });
};
