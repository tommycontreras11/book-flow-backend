import { AuthorEntity } from "../database/entities/entity/author.entity";
import { BookEntity } from "../database/entities/entity/book.entity";
import { GenreEntity } from "./../database/entities/entity/genre.entity";
import { StatusRequestEnum } from "./../database/entities/entity/request.entity";
import { UserEntity } from "./../database/entities/entity/user.entity";
import { ITopBorrowedBooks } from "./../interfaces/book-stats.interface";
import { getFullDate } from "./date.util";

export const recursiveCreateBookAuthor = async (
  book: BookEntity,
  authors: AuthorEntity[]
): Promise<unknown> => {
  const payload = authors.pop();

  if (!payload) return;

  book.authors = [...(book.authors || []), payload];

  await book.save().catch((e) => {
    console.error("BookEntity.create: ", e);
    return null;
  });
  return recursiveCreateBookAuthor(book, authors);
};

export const recursiveCreateBookGenre = async (book: BookEntity, genres: GenreEntity[]): Promise<unknown> => {
  const payload = genres.pop()

  if(!payload) return 

  book.genres = [...(book.genres || []), payload]

  await book.save().catch((e) => {
    console.error("BookEntity.create: ", e);
    return null;
  });

  return recursiveCreateBookGenre(book, genres);
}

export const getFilteredBookByStatusAndDate = (
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

export const getLastedReturnedOrBorrowedBook = (
  books: BookEntity[],
  status: StatusRequestEnum
) => {
  const booksFiltered = getFilteredBookByStatusAndDate(books, status);
  return booksFiltered[booksFiltered?.length - 1] ?? null;
};

export const getLastedBorrowedBook = (
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

export const getLastedUserRegister = async () => {
  const usersOrderByDesc = await UserEntity.find({
    order: { createdAt: "DESC" },
  });

  const date = getFullDate();

  const users = usersOrderByDesc?.filter(
    (user) => getFullDate(user?.createdAt) === date
  );

  return users[users?.length - 1] ?? null;
};
