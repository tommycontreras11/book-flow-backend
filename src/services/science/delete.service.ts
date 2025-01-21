import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { statusCode } from "../../utils/statusCode";

export async function deleteScienceService(uuid: string) {
  const foundScience = await ScienceEntity.findOne({ where: { uuid } }).catch((e) => {
    console.error("ScienceEntity.findOne: ", e);
    return null;
  });

  if (!foundScience)
    return Promise.reject({
      message: "Science not found",
      status: statusCode.NOT_FOUND,
    });

  await foundScience.softRemove().catch((e) => {
    console.error("ScienceEntity.softRemove: ", e);
    return null;
  });

  return "Science deleted successfully";
}
