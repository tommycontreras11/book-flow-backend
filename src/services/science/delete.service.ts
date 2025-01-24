import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteScienceService(uuid: string) {
  const foundScience = await ScienceEntity.findOneBy({ uuid }).catch((e) => {
    console.error("ScienceEntity.findOneBy: ", e);
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
