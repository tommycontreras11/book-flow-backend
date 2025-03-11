import { BookEntity } from "./../../database/entities/entity/book.entity";
import { StatusRequestEnum } from "./../../database/entities/entity/request.entity";
import { Request, Response } from "express";
import { getFullDate } from "./../../utils/date.util";
import { getAllBookService } from "../../services/book/getAll.service";
import { statusCode } from "../../utils/status.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";

export const getAllStatBookController = async (
  _req: Request,
  res: Response
) => {
  getAllBookService({
    relations: {
      requests: { loanManagements: true, book: true },
    },
  })
    .then(async (data) => {
      const totalBooks = data.length;
      const borrowedBooks = data.filter((book) =>
        book.requests.filter(
          (request) => request.status === StatusRequestEnum.BORROWED
        )
      ).length;
      const availableBooks = totalBooks - borrowedBooks;

      const books = {
        quickStats: {
          totalBooks,
          availableBooks,
          borrowedBooks,
        },
        recentActivities: {
          bookBorrowed: getLastedReturnedOrBorrowedBook(
            data,
            StatusRequestEnum.BORROWED
          ),
          bookReturned: getLastedReturnedOrBorrowedBook(
            data,
            StatusRequestEnum.COMPLETED
          ),
          userRegister: await getLastedUserRegister(),
        },
        topBorrowedBooks: getLastedBorrowedBook(data, StatusRequestEnum.BORROWED),
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

  const booksFiltered = books?.filter((book) =>
    book.requests.every(
      (request) =>
        request.status === status &&
        request.loanManagements.every(
          (loanManagement) => getFullDate(loanManagement?.createdAt ?? null, true) === date
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
  return booksFiltered[booksFiltered?.length - 1]?.name ?? null;
};

const getLastedBorrowedBook = (
  books: BookEntity[],
  status: StatusRequestEnum
) => {
  const booksFiltered = getFilteredBookByStatusAndDate(books, status);

  const booksSaved: string[] = [];
  const data: { name: string; count: number }[] = [];

  booksFiltered.map((book) => {
    const name = book.name;

    if (!booksSaved.includes(name)) {
      booksSaved.push(name);
    }

    if (booksSaved.length > 0) {
      data.push({
        name: name,
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

  return users[users?.length - 1]?.name ?? null;
};
