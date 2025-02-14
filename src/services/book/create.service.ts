import { AuthorEntity } from "./../../database/entities/entity/author.entity";
import { BibliographyTypeEntity } from "../../database/entities/entity/bibliography-type.entity";
import { BookEntity } from "../../database/entities/entity/book.entity";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";
import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { CreateBookDTO } from "../../dto/book.dto";
import { statusCode } from "../../utils/status.util";
import { In } from "typeorm";
import { recursiveCreateBookAuthor } from "../../utils/book.util";
import { generateUniqueFileName, getExtensionByFileName } from "./../../utils/dir.util";
import { ObjectStorage } from "./../../libs/object-storage";
import { ALLOWED_EXTENSION } from "./../../constants/multer.constant";

export async function createBookService({
  bibliographyTypeUUID,
  publisherUUID,
  languageUUID,
  scienceUUID,
  name,
  authorUUIDs,
  ...payload
}: CreateBookDTO, file:
| Express.Multer.File
| undefined) {
  if(file === undefined) return Promise.reject({ message: "File not found", status: statusCode.BAD_REQUEST });

  const foundBook = await BookEntity.findOneBy({ name });

  if (foundBook)
    return Promise.reject({
      message: "Book already exists",
      status: statusCode.BAD_REQUEST,
    });

  const foundAuthors = await AuthorEntity.find({
    where: {
      uuid: In(authorUUIDs),
    },
  });

  if (foundAuthors?.length == 0 || foundAuthors.length != authorUUIDs.length)
    return Promise.reject({
      message: "Bibliography Type not found",
      status: statusCode.NOT_FOUND,
    });

  const bibliographyType = await BibliographyTypeEntity.findOneBy({
    uuid: bibliographyTypeUUID,
  }).catch((e) => {
    console.error("BibliographyTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!bibliographyType)
    return Promise.reject({
      message: "Bibliography Type not found",
      status: statusCode.NOT_FOUND,
    });

  const language = await LanguageEntity.findOneBy({ uuid: languageUUID }).catch(
    (e) => {
      console.error("LanguageEntity.findOneBy: ", e);
      return null;
    }
  );

  if (!language)
    return Promise.reject({
      message: "Language not found",
      status: statusCode.NOT_FOUND,
    });

  const science = await ScienceEntity.findOneBy({ uuid: scienceUUID }).catch(
    (e) => {
      console.error("ScienceEntity.findOneBy: ", e);
      return null;
    }
  );

  if (!science)
    return Promise.reject({
      message: "Science not found",
      status: statusCode.NOT_FOUND,
    });

  const publisher = await PublisherEntity.findOneBy({
    uuid: publisherUUID,
  }).catch((e) => {
    console.error("PublisherEntity.findOneBy: ", e);
    return null;
  });

  if (!publisher)
    return Promise.reject({
      message: "Publisher not found",
      status: statusCode.NOT_FOUND,
    });

  const book = await BookEntity.create({
    ...payload,
    topographical_signature: payload.topographicalSignature,
    publication_year: payload.publicationYear,
    bibliography_type_id: bibliographyType.id,
    publisher_id: publisher.id,
    language_id: language.id,
    science_id: science.id,
    name,
    status: "ACTIVE",
  })
    .save()
    .catch((e) => {
      console.error("BookEntity.create: ", e);
      return null;
    });

  book && (await recursiveCreateBookAuthor(book, [...foundAuthors]));
  
  book && (await uploadFile(book, file));

  return "Book created successfully";
}

async function uploadFile(book: BookEntity, file: Express.Multer.File): Promise<unknown> {
  const extension = getExtensionByFileName(file.originalname)
  if(!extension || !ALLOWED_EXTENSION.includes(extension)) {
      return Promise.reject({ message: "File extension not allowed. Valid extensions are: " + ALLOWED_EXTENSION.join(", ") + "", status: statusCode.BAD_REQUEST })
  }

  const storage = ObjectStorage.instance

  const fileName = await generateUniqueFileName(extension)

  const minio = await storage.uploadDocument(
      fileName,
      file.buffer,
      file.size,
  ).catch(async (e) => {
      console.error("createFileService -> storage.uploadDocument: ", e);
      await book.remove()
      return null;
  })

  if(!minio) return Promise.reject({ message: "File not uploaded to minio", status: statusCode.BAD_REQUEST })

  return fileName;
}