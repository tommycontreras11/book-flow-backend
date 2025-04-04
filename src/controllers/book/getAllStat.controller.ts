import { BookEntity } from "./../../database/entities/entity/book.entity";
import { StatusRequestEnum } from "./../../database/entities/entity/request.entity";
import { Request, Response } from "express";
import { getFullDate } from "./../../utils/date.util";
import { getAllBookService } from "../../services/book/getAll.service";
import { statusCode } from "../../utils/status.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import {
  IQuickStats,
  IRecentActivities,
  ITopBorrowedBooks,
} from "./../../interfaces/book-stats.interface";
import {
  BookQuickStatsEnum,
  BookRecentActivitiesEnum,
} from "./../../enums/book.enum";

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

const getFilteredBookByStatusAndDate = (
  books: BookEntity[],
  status: StatusRequestEnum
) => {
  const date = getFullDate();

  const booksFiltered = books?.filter(
    (book) =>
      book.requests.length > 0 &&
      book.requests.every(
        (request) =>
          request.status === status &&
          request.loanManagements &&
          request.loanManagements.every(
            (loanManagement) =>
              getFullDate(loanManagement?.createdAt ?? null, true) === date
          )
      )
  );

  return booksFiltered;
};

const getLastedReturnedOrBorrowedBook = (
  books: BookEntity[],
  status: StatusRequestEnum
) => {
  const booksFiltered = getFilteredBookByStatusAndDate(books, status);
  return booksFiltered[booksFiltered?.length - 1] ?? null;
};

const getLastedBorrowedBook = (
  books: BookEntity[],
  status: StatusRequestEnum
) => {
  const booksFiltered = getFilteredBookByStatusAndDate(books, status);

  const booksSaved: string[] = [];
  const data: ITopBorrowedBooks[] = [];

  if (booksFiltered.length === 0) {
    return [{
      title: null,
      count: 0
    }];
  }

  booksFiltered.map((book) => {
    const name = book.name;

    if (!booksSaved.includes(name)) {
      booksSaved.push(name);
    }

    if (booksSaved.length > 0) {
      data.push({
        title: name,
        count: booksSaved.filter((book) => book === name).length,
      });
    }
  });
  return data;
};

const getLastedUserRegister = async () => {
  const usersOrderByDesc = await UserEntity.find({
    order: { createdAt: "DESC" },
  });

  const date = getFullDate();

  const users = usersOrderByDesc?.filter(
    (user) => getFullDate(user?.createdAt) === date
  );

  return users[users?.length - 1] ?? null;
};
