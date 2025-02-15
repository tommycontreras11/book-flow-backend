import { ALLOWED_EXTENSION } from "./../constants";
import { AuthorEntity } from "../database/entities/entity/author.entity";
import { BookEntity } from "../database/entities/entity/book.entity";
import { generateUniqueFileName, getExtensionByFileName } from "./dir.util";
import { statusCode } from "./status.util";
import { ObjectStorage } from "./../libs/object-storage";

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
