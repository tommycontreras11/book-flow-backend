import { Request, Response } from "express";
import { getAllBookService } from "../../services/book/getAll.service";
import { statusCode } from "../../utils/status.util";
import { StatusRequestEnum } from "./../../database/entities/entity/request.entity";
import {
  BookQuickStatsEnum,
  BookRecentActivitiesEnum,
} from "./../../enums/book.enum";
import {
  IQuickStats,
  IRecentActivities,
} from "./../../interfaces/book-stats.interface";
import { getFullDate } from "./../../utils/date.util";
import {
  getLastedBorrowedBook,
  getLastedReturnedOrBorrowedBook,
  getLastedUserRegister,
} from "./../../utils/book.util";

export const getAllStatBookController = async (
  _req: Request,
  res: Response
) => {
  getAllBookService({
    relations: {
      requests: { user: true, loanManagements: true, book: true },
    },
  })
    .then(async (data) => {
      const totalBooks = data.length;
      let borrowedBooks = 0;

      data.map((book) => {
        book?.requests?.map((request) => {
          if (request.status === StatusRequestEnum.BORROWED) {
            borrowedBooks++;
          }
        });
      });

      const quickStats: IQuickStats[] = [
        {
          title: "Total Books",
          value: totalBooks,
          type: BookQuickStatsEnum.TOTAL,
        },
        {
          title: "Available Books",
          value: totalBooks - borrowedBooks,
          type: BookQuickStatsEnum.AVAILABLE,
        },
        {
          title: "Borrowed Books",
          value: borrowedBooks,
          type: BookQuickStatsEnum.BORROWED,
        },
      ];

      const bookBorrowed = getLastedReturnedOrBorrowedBook(
        data,
        StatusRequestEnum.BORROWED
      );

      const bookReturned = getLastedReturnedOrBorrowedBook(
        data,
        StatusRequestEnum.COMPLETED
      );

      const userRegister = await getLastedUserRegister();

      const recentActivities: IRecentActivities[] = [
        {
          title: bookBorrowed?.name ?? null,
          date:
            getFullDate(
              bookBorrowed?.requests[0]?.loanManagements[0]?.createdAt,
              false
            ) || null,
          type: BookRecentActivitiesEnum.BORROWED,
        },
        {
          title: bookReturned?.name ?? null,
          date:
            getFullDate(
              bookReturned?.requests[0]?.loanManagements[0]?.date_return,
              false
            ) || null,
          type: BookRecentActivitiesEnum.RETURNED,
        },
        {
          title: userRegister?.name ?? null,
          date: getFullDate(userRegister?.createdAt, false) || null,
          type: BookRecentActivitiesEnum.REGISTERED,
        },
      ];

      const books = {
        quickStats,
        recentActivities,
        topBorrowedBooks: getLastedBorrowedBook(
          data,
          StatusRequestEnum.BORROWED
        ),
      };

      return res.status(statusCode.OK).json({ data: books });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
