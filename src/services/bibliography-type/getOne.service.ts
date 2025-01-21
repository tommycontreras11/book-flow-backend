import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";
import { BibliographyTypeEntity } from "./../../database/entities/entity/bibliography-type.entity";

export async function getOneBibliographyTypeService(options: FindOneOptions<BibliographyTypeEntity>) {
  const bibliographyType = await BibliographyTypeEntity.findOne(options).catch((e) => {
    console.error("BibliographyTypeEntity.findOne: ", e);
    return null;
  });

  if (!bibliographyType)
    return Promise.reject({
      message: "Bibliography type not found",
      status: statusCode.NOT_FOUND,
    });

  return bibliographyType;
}
