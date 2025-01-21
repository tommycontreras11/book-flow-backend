import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { UpdateScienceDTO } from "./../../dto/science.dto";
import { statusCode } from "../../utils/statusCode";

export async function updateScienceService(
  uuid: string,
  {
    description,
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
    { description, ...payload }
  ).catch((e) => {
    console.error("ScienceEntity.update: ", e);
    return null;
  });

  return "Science updated successfully";
}
