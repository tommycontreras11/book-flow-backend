import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteLanguageService(uuid: string) {
  const foundLanguage = await LanguageEntity.findOneBy({ uuid }).catch((e) => {
    console.error("LanguageEntity.findOneBy: ", e);
    return null;
  });

  if (!foundLanguage)
    return Promise.reject({
      message: "Language not found",
      status: statusCode.NOT_FOUND,
    });

  await foundLanguage.softRemove().catch((e) => {
    console.error("LanguageEntity.softRemove: ", e);
    return null;
  });

  return "Language deleted successfully";
}
