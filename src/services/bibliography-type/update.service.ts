import { UpdateBibliographyTypeDTO } from "./../../dto/bibliography-type.dto";
import { statusCode } from "../../utils/status.util";
import { BibliographyTypeEntity } from "./../../database/entities/entity/bibliography-type.entity";

export async function updateBibliographyTypeService(
  uuid: string,
  { name, ...payload }: UpdateBibliographyTypeDTO
) {
  const bibliographyType = await BibliographyTypeEntity.findOneBy({
    uuid,
  }).catch((e) => {
    console.error("BibliographyTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!bibliographyType)
    return Promise.reject({
      message: "Bibliography type not found",
      status: statusCode.NOT_FOUND,
    });

  await BibliographyTypeEntity.update(
    { uuid },
    {
      name,
      ...payload,
    }
  ).catch((e) => {
    console.error("BibliographyTypeEntity.create: ", e);
    return null;
  });

  return "Bibliography type created successfully";
}
