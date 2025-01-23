import { Not } from "typeorm";
import { BibliographyTypeEntity } from "../../database/entities/entity/bibliography-type.entity";
import { BookEntity } from "../../database/entities/entity/book.entity";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";
import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { UpdateBookDTO } from "../../dto/book.dto";
import { statusCode } from "../../utils/statusCode";

export async function updateBookService(
  uuid: string,
  {
    bibliographyTypeUUID,
    publisherUUID,
    languageUUID,
    scienceUUID,
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
  let bibliographyType: BibliographyTypeEntity | null = null;
  let language: LanguageEntity | null = null;
  let science: ScienceEntity | null = null;
  let publisher: PublisherEntity | null = null;

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

  await BookEntity.update(
    { id: foundBook.id },
    {
      ...(publisher && { publisher_id: publisher.id }),
      ...(bibliographyType && { bibliography_type_id: bibliographyType.id }),
      ...(language && { language_id: language.id }),
      ...(science && { science_id: science.id }),
      ...payload,
      description,
      state: "ACTIVE",
    }
  ).catch((e) => {
    console.error("BookEntity.updated: ", e);
    return null;
  });

  return "Book updated successfully";
}
