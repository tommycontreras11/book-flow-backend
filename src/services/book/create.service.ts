import { AuthorEntity } from "./../../database/entities/entity/author.entity";
import { BibliographyTypeEntity } from "../../database/entities/entity/bibliography-type.entity";
import { BookEntity } from "../../database/entities/entity/book.entity";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";
import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { CreateBookDTO } from "../../dto/book.dto";
import { statusCode } from "../../utils/statusCode";
import { In } from "typeorm";
import { recursiveCreateBookAuthor } from "./../../utils/bookUtil";

export async function createBookService({
  bibliographyTypeUUID,
  publisherUUID,
  languageUUID,
  scienceUUID,
  description,
  authorUUIDs,
  ...payload
}: CreateBookDTO) {
  const foundBook = await BookEntity.findOneBy({ description });

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
    bibliography_type_id: bibliographyType.id,
    publisher_id: publisher.id,
    language_id: language.id,
    science_id: science.id,
    description,
    state: "ACTIVE",
  })
    .save()
    .catch((e) => {
      console.error("BookEntity.create: ", e);
      return null;
    });

  book && (await recursiveCreateBookAuthor(book, [...foundAuthors]));

  return "Book created successfully";
}
