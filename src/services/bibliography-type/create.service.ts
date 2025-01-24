import { CreateBibliographyTypeDTO } from "./../../dto/bibliography-type.dto";
import { statusCode } from "../../utils/status.util";
import { BibliographyTypeEntity } from "./../../database/entities/entity/bibliography-type.entity";

export async function createBibliographyTypeService({
  description,
}: CreateBibliographyTypeDTO) {
  const foundBibliographyType = await BibliographyTypeEntity.findOneBy({
    description,
  }).catch((e) => {
    console.error("BibliographyTypeEntity.findOneBy: ", e);
    return null;
  });

  if (foundBibliographyType)
    return Promise.reject({
      message: "Bibliography type already exists",
      status: statusCode.BAD_REQUEST,
    });

  await BibliographyTypeEntity.create({
    description,
    status: "ACTIVE",
  })
    .save()
    .catch((e) => {
      console.error("BibliographyTypeEntity.create: ", e);
      return null;
    });

  return "Bibliography type created successfully";
}
