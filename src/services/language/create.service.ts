import { CreateLanguageDTO } from "./../../dto/language.dto";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { statusCode } from "../../utils/status.util";

export async function createLanguageService({ description }: CreateLanguageDTO) {
  const foundLanguage = await LanguageEntity.findOneBy({ description }).catch((e) => {
    console.error("LanguageEntity.findOneBy: ", e);
    return null;
  });

  if (foundLanguage)
    return Promise.reject({
      message: "Language already exists",
      status: statusCode.BAD_REQUEST,
    });
  
    await LanguageEntity.create({ description })    .save()
    .catch((e) => {
      console.error("LanguageEntity.create: ", e);
      return null;
    });

  return "Language created successfully";
}
