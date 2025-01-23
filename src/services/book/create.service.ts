import { BibliographyTypeEntity } from "../../database/entities/entity/bibliography-type.entity";
import { BookEntity } from "../../database/entities/entity/book.entity";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";
import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { CreateBookDTO } from "../../dto/book.dto";
import { statusCode } from "../../utils/statusCode";

export async function createBookService({
  bibliographyTypeUUID,
  publisherUUID,
  languageUUID,
  scienceUUID,
  description,
  ...payload
}: CreateBookDTO) {
  const foundBook = await BookEntity.findOneBy({ description });

  if (foundBook)
    return Promise.reject({
      message: "Book already exists",
      status: statusCode.BAD_REQUEST,
    });

  const bibliographyType = await BibliographyTypeEntity.findOne({
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

  const language = await LanguageEntity.findOne({
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

  const science = await ScienceEntity.findOne({
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

  const publisher = await PublisherEntity.findOne({
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

  await BookEntity.create({
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

  return "Book created successfully";
}
