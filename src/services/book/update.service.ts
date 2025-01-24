import { In, Not } from "typeorm";
import { BibliographyTypeEntity } from "../../database/entities/entity/bibliography-type.entity";
import { BookEntity } from "../../database/entities/entity/book.entity";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";
import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { UpdateBookDTO } from "../../dto/book.dto";
import { statusCode } from "../../utils/statusCode";
import { AuthorEntity } from "./../../database/entities/entity/author.entity";
import { recursiveCreateBookAuthor } from "./../../utils/bookUtil";

export async function updateBookService(
  uuid: string,
  {
    bibliographyTypeUUID,
    publisherUUID,
    languageUUID,
    scienceUUID,
    authorUUIDs,
    description,
    ...payload
  }: UpdateBookDTO
) {
  const foundBook = await BookEntity.findOneBy({ uuid });

  if (!foundBook)
    return Promise.reject({
      message: "Book not found",
      status: statusCode.NOT_FOUND,
    });

  const foundBookByDescription = await BookEntity.findOne({
    where: { description, uuid: Not(uuid) },
  });

  if (foundBookByDescription)
    return Promise.reject({
      message: "Book's description already exists",
      status: statusCode.BAD_REQUEST,
    });

    let foundAuthors: AuthorEntity[] = [];
    if(authorUUIDs.length > 0) {
      foundAuthors = await AuthorEntity.find({
        where: {
          uuid: In(authorUUIDs),
        },
      });
    
      if (foundAuthors.length == 0 || !foundAuthors || foundAuthors.length != authorUUIDs.length)
        return Promise.reject({
          message: "Bibliography Type not found",
          status: statusCode.NOT_FOUND,
        });
    }

  let bibliographyType: BibliographyTypeEntity | null = null;

  if (bibliographyTypeUUID) {
    bibliographyType = await BibliographyTypeEntity.findOne({
      where: { uuid: bibliographyTypeUUID },
    }).catch((e) => {
      console.error("BibliographyTypeEntity.findOne: ", e);
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
    language = await LanguageEntity.findOne({
      where: { uuid: languageUUID },
    }).catch((e) => {
      console.error("LanguageEntity.findOne: ", e);
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
    science = await ScienceEntity.findOne({
      where: { uuid: scienceUUID },
    }).catch((e) => {
      console.error("ScienceEntity.findOne: ", e);
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
    publisher = await PublisherEntity.findOne({
      where: { uuid: publisherUUID },
    }).catch((e) => {
      console.error("PublisherEntity.findOne: ", e);
      return null;
    });

    if (!publisher)
      return Promise.reject({
        message: "Publisher not found",
        status: statusCode.NOT_FOUND,
      });
  }

  foundBook.description = description;
  if (publisher) foundBook.publisher_id = publisher.id;
  if (bibliographyType) foundBook.bibliography_type_id = bibliographyType.id;
  if (language) foundBook.language_id = language.id;
  if (science) foundBook.science_id = science.id;
  
  Object.assign(foundBook, payload);

  foundBook.state = "ACTIVE";

  const bookUpdated = await foundBook.save().catch((e) => {
    console.error("BookEntity.updated: ", e);
    return null;
  });

  if (bookUpdated) await recursiveCreateBookAuthor(foundBook, [...foundAuthors]);

  return "Book updated successfully";
}
