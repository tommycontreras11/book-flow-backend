import { In, Not } from "typeorm";
import { BibliographyTypeEntity } from "../../database/entities/entity/bibliography-type.entity";
import { BookEntity } from "../../database/entities/entity/book.entity";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";
import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { UpdateBookDTO } from "../../dto/book.dto";
import { deleteFile, recursiveCreateBookAuthor, uploadFile } from "../../utils/book.util";
import { statusCode } from "../../utils/status.util";
import { AuthorEntity } from "./../../database/entities/entity/author.entity";

export async function updateBookService(
  uuid: string,
  {
    bibliographyTypeUUID,
    publisherUUID,
    languageUUID,
    scienceUUID,
    authorUUIDs,
    name,
    isbn,
    topographicalSignature,
    publicationYear,
    status
  }: UpdateBookDTO, file: Express.Multer.File | null
) {
  const foundBook = await BookEntity.findOneBy({ uuid });

  if (!foundBook)
    return Promise.reject({
      message: "Book not found",
      status: statusCode.NOT_FOUND,
    });

  if(name) {
    const foundBookByName = await BookEntity.findOne({
      where: { name, uuid: Not(uuid) },
    });
  
    if (foundBookByName)
      return Promise.reject({
        message: "Book's name already exists",
        status: statusCode.BAD_REQUEST,
      });
  }

  let foundAuthors: AuthorEntity[] = [];
  if (authorUUIDs.length > 0) {
    foundAuthors = await AuthorEntity.find({
      where: {
        uuid: In(authorUUIDs),
      },
    });

    if (foundAuthors?.length == 0 || foundAuthors.length != authorUUIDs.length)
      return Promise.reject({
        message: "Bibliography Type not found",
        status: statusCode.NOT_FOUND,
      });
  }

  let bibliographyType: BibliographyTypeEntity | null = null;

  if (bibliographyTypeUUID) {
    bibliographyType = await BibliographyTypeEntity.findOneBy({
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
  }

  let language: LanguageEntity | null = null;

  if (languageUUID) {
    language = await LanguageEntity.findOneBy({
      uuid: languageUUID,
    }).catch((e) => {
      console.error("LanguageEntity.findOneBy: ", e);
      return null;
    });

    if (!language)
      return Promise.reject({
        message: "Language not found",
        status: statusCode.NOT_FOUND,
      });
  }

  let science: ScienceEntity | null = null;

  if (scienceUUID) {
    science = await ScienceEntity.findOneBy({
      uuid: scienceUUID,
    }).catch((e) => {
      console.error("ScienceEntity.findOneBy: ", e);
      return null;
    });

    if (!science)
      return Promise.reject({
        message: "Science not found",
        status: statusCode.NOT_FOUND,
      });
  }

  let publisher: PublisherEntity | null = null;

  if (publisherUUID) {
    publisher = await PublisherEntity.findOneBy({
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
  }

  foundBook.name = name;
  if (publisher) foundBook.publisher_id = publisher.id;
  if (bibliographyType) foundBook.bibliography_type_id = bibliographyType.id;
  if (language) foundBook.language_id = language.id;
  if (science) foundBook.science_id = science.id;

  foundBook.status = status ?? foundBook.status;
  foundBook.publication_year = publicationYear ?? foundBook.publication_year;
  foundBook.isbn = isbn ?? foundBook.isbn;
  foundBook.topographical_signature = topographicalSignature ?? foundBook.topographical_signature;
  
  const bookUpdated = await foundBook.save().catch((e) => {
    console.error("BookEntity.updated: ", e);
    return null;
  });

  if(file) {
    await deleteFile(foundBook.file_name);
    foundBook.file_name = await uploadFile(foundBook, file)
  };

  if (bookUpdated) await recursiveCreateBookAuthor(foundBook, [...foundAuthors]);

  return "Book updated successfully";
}
