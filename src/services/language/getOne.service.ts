import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";

export async function getOneLanguageService(options: FindOneOptions<LanguageEntity>) {
  const language = await LanguageEntity.findOne(options).catch((e) => {
    console.error("LanguageEntity.findOne: ", e);
    return null;
  });

  if (!language)
    return Promise.reject({
      message: "Language not found",
      status: statusCode.NOT_FOUND,
    });

  return language;
}
