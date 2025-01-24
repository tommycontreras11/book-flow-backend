import { ScienceEntity } from "../../database/entities/entity/science.entity";
import { CreateScienceDTO } from "./../../dto/science.dto";
import { statusCode } from "../../utils/status.util";

export async function createScienceService({
  description
}: CreateScienceDTO) {
  const science = await ScienceEntity.findOneBy({ description }).catch((e) => {
    console.error("ScienceEntity.findOneBy: ", e);
    return null;
  });

  if (science)
    return Promise.reject({
      message: "Science already exists",
      status: statusCode.BAD_REQUEST,
    });

  await ScienceEntity.create({
    description,
    status: "ACTIVE"
  })
    .save()
    .catch((e) => {
      console.error("ScienceEntity.create: ", e);
      return null;
    });

  return "Science created successfully";
}
