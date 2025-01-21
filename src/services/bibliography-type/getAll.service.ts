import { BibliographyTypeEntity } from "./../../database/entities/entity/bibliography-type.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getAllBibliographyTypeService(options: FindManyOptions<BibliographyTypeEntity>) {
  const bibliographyType = await BibliographyTypeEntity.find(options).catch((e) => {
    console.error("BibliographyTypeEntity.find: ", e);
    return null;
  });

  if (!bibliographyType)
    return Promise.reject({
      message: "Bibliography types not found",
      status: statusCode.NOT_FOUND,
    });

  return bibliographyType;
}
