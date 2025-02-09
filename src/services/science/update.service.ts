import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { UpdateScienceDTO } from "./../../dto/science.dto";
import { statusCode } from "../../utils/status.util";

export async function updateScienceService(
  uuid: string,
  {
    name,
    ...payload
  }: UpdateScienceDTO)  {
  const science = await ScienceEntity.findOneBy({ uuid }).catch((e) => {
    console.error("ScienceEntity.findOne: ", e);
    return null;
  });

  if (!science)
    return Promise.reject({
      message: "Science not found",
      status: statusCode.NOT_FOUND,
    });

  await ScienceEntity.update(
    { uuid },
    { name, ...payload }
  ).catch((e) => {
    console.error("ScienceEntity.update: ", e);
    return null;
  });

  return "Science updated successfully";
}
