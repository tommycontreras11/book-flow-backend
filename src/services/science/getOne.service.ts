import { FindOneOptions } from "typeorm";
import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { statusCode } from "../../utils/statusCode";

export async function getOneScienceService(options: FindOneOptions<ScienceEntity>) {
  const science = await ScienceEntity.findOne(options).catch((e) => {
    console.error("ScienceEntity.findOne: ", e);
    return null;
  });

  if (!science)
    return Promise.reject({
      message: "Science not found",
      status: statusCode.NOT_FOUND,
    });

  return science;
}
