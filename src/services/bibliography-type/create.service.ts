import { CreateBibliographyTypeDTO } from "./../../dto/bibliography-type.dto";
import { statusCode } from "../../utils/statusCode";
import { BibliographyTypeEntity } from "./../../database/entities/entity/bibliography-type.entity";

export async function createBibliographyTypeService({
  description
}: CreateBibliographyTypeDTO) {
  const foundBibliographyType = await BibliographyTypeEntity.findOneBy({ description });

  if (foundBibliographyType)
    return Promise.reject({
      message: "Bibliography type already exists",
      status: statusCode.BAD_REQUEST,
    });

  await BibliographyTypeEntity.create({
    description,
    state: "ACTIVE"
  })
    .save()
    .catch((e) => {
      console.error("BibliographyTypeEntity.create: ", e);
      return null;
    });

  return "Bibliography type created successfully";
}
