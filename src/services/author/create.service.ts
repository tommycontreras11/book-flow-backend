import { AuthorEntity } from "../../database/entities/entity/author.entity";
import { CreateAuthorDTO } from "./../../dto/author.dto";
import { statusCode } from "../../utils/statusCode";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { LanguageEntity } from "./../../database/entities/entity/language.entity";

export async function createAuthorService({
  name,
  birthCountryUUID,
  nativeLanguageUUID,
  ...payload
}: CreateAuthorDTO) {
  const foundAuthor = await AuthorEntity.findOneBy({ name }).catch((e) => {
    console.error("AuthorEntity.findOneBy: ", e);
    return null;
  });

  if (foundAuthor)
    return Promise.reject({
      message: "Author already exists",
      status: statusCode.BAD_REQUEST,
    });

  const country = await CountryEntity.findOneBy({
    uuid: birthCountryUUID,
  }).catch((e) => {
    console.error("CountryEntity.findOneBy: ", e);
    return null;
  });

  if (!country)
    return Promise.reject({
      message: "Country not found",
      status: statusCode.NOT_FOUND,
    });

  const language = await LanguageEntity.findOneBy({
    uuid: nativeLanguageUUID,
  }).catch((e) => {
    console.error("LanguageEntity.findOne: ", e);
    return null;
  });

  if (!language)
    return Promise.reject({
      message: "Language not found",
      status: statusCode.NOT_FOUND,
    });

  await AuthorEntity.create({
    name,
    birth_country_id: country.id,
    native_language_id: language.id,
    ...payload,
    state: "ACTIVE",
  })
    .save()
    .catch((e) => {
      console.error("AuthorEntity.create: ", e);
      return null;
    });

  return "Author created successfully";
}
