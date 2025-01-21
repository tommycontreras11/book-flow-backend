import { UpdateBibliographyTypeDTO } from "./../../dto/bibliography-type.dto";
import { statusCode } from "../../utils/statusCode";
import { BibliographyTypeEntity } from "./../../database/entities/entity/bibliography-type.entity";

export async function updateBibliographyTypeService(
  uuid: string,
  { description, ...payload }: UpdateBibliographyTypeDTO
) {
  const bibliographyType = await BibliographyTypeEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("BibliographyTypeEntity.findOne: ", e);
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
      description,
      ...payload
    }
  ).catch((e) => {
    console.error("BibliographyTypeEntity.create: ", e);
    return null;
  });

  return "Bibliography type created successfully";
}
