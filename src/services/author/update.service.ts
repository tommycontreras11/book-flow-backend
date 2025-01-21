import { UpdateAuthorDTO } from "./../../dto/author.dto";
import { statusCode } from "../../utils/statusCode";
import { AuthorEntity } from "../../database/entities/entity/author.entity";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { LanguageEntity } from "./../../database/entities/entity/language.entity";

export async function updateAuthorService(
  uuid: string,
  { name, birthCountryUUID, nativeLanguageUUID, ...payload }: UpdateAuthorDTO
) {
  const author = await AuthorEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("AuthorEntity.findOne: ", e);
    return null;
  });

  if (!author)
    return Promise.reject({
      message: "Author not found",
      status: statusCode.NOT_FOUND,
    });

    const country = await CountryEntity.findOne({
      where: { uuid: birthCountryUUID },
    }).catch((e) => {
      console.error("CountryEntity.findOne: ", e);
      return null;
    });
  
    if (!country)
      return Promise.reject({
        message: "Country not found",
        status: statusCode.NOT_FOUND,
      });

      const language = await LanguageEntity.findOne({
      where: { uuid: nativeLanguageUUID },
    }).catch((e) => {
      console.error("LanguageEntity.findOne: ", e);
      return null;
    });
  
    if (!language)
      return Promise.reject({
        message: "Language not found",
        status: statusCode.NOT_FOUND,
      });

  await AuthorEntity.update(
    { uuid },
    {
      name,
      birth_country_id: country.id,
      native_language_id: language.id,
      ...payload,
      state: "ACTIVE",
    }
  ).catch((e) => {
    console.error("AuthorEntity.create: ", e);
    return null;
  });

  return "Author updated successfully";
}
