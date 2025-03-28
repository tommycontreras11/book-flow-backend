import { UpdateAuthorDTO } from "./../../dto/author.dto";
import { statusCode } from "../../utils/status.util";
import { AuthorEntity } from "../../database/entities/entity/author.entity";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { LanguageEntity } from "./../../database/entities/entity/language.entity";

export async function updateAuthorService(
  uuid: string,
  { name, birthCountryUUID, nativeLanguageUUID, ...payload }: UpdateAuthorDTO
) {
  const author = await AuthorEntity.findBy({ uuid }).catch((e) => {
    console.error("AuthorEntity.findBy: ", e);
    return null;
  });

  if (!author)
    return Promise.reject({
      message: "Author not found",
      status: statusCode.NOT_FOUND,
    });

  if (name) {
    const findAuthorByName = await AuthorEntity.findOneBy({
      name,
    }).catch((e) => {
      console.error("AuthorEntity.findBy: ", e);
      return null;
    });

    if (findAuthorByName && findAuthorByName?.uuid !== uuid) {
      return Promise.reject({
        message: "Author already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  let country: CountryEntity | null = null;
  let language: LanguageEntity | null = null;

  if (birthCountryUUID) {
    country = await CountryEntity.findOneBy({ uuid: birthCountryUUID }).catch(
      (e) => {
        console.error("CountryEntity.findOneBy: ", e);
        return null;
      }
    );

    if (!country)
      return Promise.reject({
        message: "Country not found",
        status: statusCode.NOT_FOUND,
      });
  }

  if (nativeLanguageUUID) {
    language = await LanguageEntity.findOneBy({
      uuid: nativeLanguageUUID,
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

  await AuthorEntity.update(
    { uuid },
    {
      name,
      ...(country && { birth_country_id: country.id }),
      ...(language && { native_language_id: language.id }),
      ...payload,
      status: "ACTIVE",
    }
  ).catch((e) => {
    console.error("AuthorEntity.update: ", e);
    return null;
  });

  return "Author updated successfully";
}
