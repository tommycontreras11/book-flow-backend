import { FindManyOptions } from "typeorm";
import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { statusCode } from "../../utils/status.util";

export async function getAllScienceService(options: FindManyOptions<ScienceEntity>) {
  const sciences = await ScienceEntity.find(options).catch((e) => {
    console.error("ScienceEntity.find: ", e);
    return null;
  });

  if (!sciences)
    return Promise.reject({
      message: "Sciences not found",
      status: statusCode.NOT_FOUND,
    });

  return sciences;
}
