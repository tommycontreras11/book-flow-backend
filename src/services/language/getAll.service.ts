import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";

export async function getAllLanguageService(options: FindManyOptions<LanguageEntity>) {
  const languages = await LanguageEntity.find(options).catch((e) => {
    console.error("LanguageEntity.find: ", e);
    return null;
  });

  if (!languages)
    return Promise.reject({
      message: "Languages not found",
      status: statusCode.NOT_FOUND,
    });

  return languages;
}
