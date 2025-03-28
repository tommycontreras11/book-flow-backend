import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { UpdateScienceDTO } from "./../../dto/science.dto";
import { statusCode } from "../../utils/status.util";
import { Not } from "typeorm";

export async function updateScienceService(
  uuid: string,
  { name, ...payload }: UpdateScienceDTO
) {
  const science = await ScienceEntity.findOneBy({ uuid }).catch((e) => {
    console.error("ScienceEntity.findOne: ", e);
    return null;
  });

  if (!science)
    return Promise.reject({
      message: "Science not found",
      status: statusCode.NOT_FOUND,
    });

  if (name) {
    const foundScienceByName = await ScienceEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("ScienceEntity.findOne: ", e);
      return null;
    });

    if (foundScienceByName)
      return Promise.reject({
        message: "Science's name already exists",
        status: statusCode.BAD_REQUEST,
      });
  }

  await ScienceEntity.update({ uuid }, { name, ...payload }).catch((e) => {
    console.error("ScienceEntity.update: ", e);
    return null;
  });

  return "Science updated successfully";
}
