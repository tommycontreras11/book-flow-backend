import { ALLOWED_EXTENSION } from "./../constants";
import { AuthorEntity } from "../database/entities/entity/author.entity";
import { BookEntity } from "../database/entities/entity/book.entity";
import { generateUniqueFileName, getExtensionByFileName } from "./dir.util";
import { statusCode } from "./status.util";
import { ObjectStorage } from "./../libs/object-storage";
import { getFullDate } from "./date.util";
import { UserEntity } from "./../database/entities/entity/user.entity";
import { StatusRequestEnum } from "./../database/entities/entity/request.entity";
import { ITopBorrowedBooks } from "./../interfaces/book-stats.interface";

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

export async function uploadFile(
  book: BookEntity,
  file: Express.Multer.File
): Promise<string> {
  const extension = getExtensionByFileName(file.originalname);
  if (!extension || !ALLOWED_EXTENSION.includes(extension)) {
    return Promise.reject({
      message:
        "File extension not allowed. Valid extensions are: " +
        ALLOWED_EXTENSION.join(", ") +
        "",
      status: statusCode.BAD_REQUEST,
    });
  }

  const storage = ObjectStorage.instance;

  const fileName = await generateUniqueFileName(extension);

  const minio = await storage
    .uploadDocument(fileName, file.buffer, file.size)
    .catch(async (e) => {
      console.error("createFileService -> storage.uploadDocument: ", e);
      await book.remove();
      return null;
    });

  if (!minio)
    return Promise.reject({
      message: "File not uploaded to minio",
      status: statusCode.BAD_REQUEST,
    });

  return fileName;
}

export async function deleteFile(fileName: string) {
  const storage = ObjectStorage.instance;

  await storage.deleteDocument(fileName).catch(async (e) => {
    console.error("deleFile -> storage.deleteDocument: ", e);
    return null;
  });
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
