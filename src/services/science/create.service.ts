import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { CreateScienceDTO } from "./../../dto/science.dto";
import { statusCode } from "../../utils/statusCode";

export async function createScienceService({
  description
}: CreateScienceDTO) {
  const science = await ScienceEntity.findOneBy({ description }).catch((e) => {
    console.error("ScienceEntity.findOne: ", e);
    return null;
  });

  if (!science)
    return Promise.reject({
      message: "Science not found",
      status: statusCode.NOT_FOUND,
    });

  await ScienceEntity.create({
    description,
    state: "ACTIVE"
  })
    .save()
    .catch((e) => {
      console.error("ScienceEntity.create: ", e);
      return null;
    });

  return "Science created successfully";
}
