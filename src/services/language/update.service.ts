import { UpdateLanguageDTO } from "../../dto/language.dto";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { statusCode } from "../../utils/status.util";

export async function updateLanguageService(
  uuid: string,
  { name }: UpdateLanguageDTO
) {
  const foundLanguage = await LanguageEntity.findOneBy({ uuid }).catch((e) => {
    console.error("LanguageEntity.findOneBy: ", e);
    return null;
  });

  if (!foundLanguage)
    return Promise.reject({
      message: "Language not found",
      status: statusCode.NOT_FOUND,
    });

  const foundDescription = await LanguageEntity.findOneBy({
    name,
  }).catch((e) => {
    console.error("LanguageEntity.findOneBy: ", e);
    return null;
  });

  if (foundDescription && foundDescription.uuid != foundLanguage.uuid)
    return Promise.reject({
      message: "Language already exists",
      status: statusCode.BAD_REQUEST,
    });

  await LanguageEntity.update(
    { id: foundLanguage.id },
    { ...(name && { name }) }
  ).catch((e) => {
    console.error("LanguageEntity.update: ", e);
    return null;
  });

  return "Language updated successfully";
}
