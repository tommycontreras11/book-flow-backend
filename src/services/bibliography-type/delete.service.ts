import { BibliographyTypeEntity } from "../../database/entities/entity/bibliography-type.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteBibliographyTypeService(uuid: string) {
  const foundBibliographyType = await BibliographyTypeEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("BibliographyTypeEntity.findOne: ", e);
    return null;
  });

  if (!foundBibliographyType)
    return Promise.reject({
      message: "Bibliography type not found",
      status: statusCode.NOT_FOUND,
    });

  await foundBibliographyType.softRemove().catch((e) => {
    console.error("BibliographyTypeEntity.softRemove: ", e);
    return null;
  });

  return "Bibliography type deleted successfully";
}
