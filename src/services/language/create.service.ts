import { CreateLanguageDTO } from "./../../dto/language.dto";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { statusCode } from "../../utils/status.util";

export async function createLanguageService({ name }: CreateLanguageDTO) {
  const foundLanguage = await LanguageEntity.findOneBy({ name }).catch((e) => {
    console.error("LanguageEntity.findOneBy: ", e);
    return null;
  });

  if (foundLanguage)
    return Promise.reject({
      message: "Language's name already exists",
      status: statusCode.BAD_REQUEST,
    });
  
    await LanguageEntity.create({ name })    .save()
    .catch((e) => {
      console.error("LanguageEntity.create: ", e);
      return null;
    });

  return "Language created successfully";
}
