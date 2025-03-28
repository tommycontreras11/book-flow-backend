import { UpdatePublisherDTO } from "./../../dto/publisher.dto";
import { statusCode } from "../../utils/status.util";
import { PublisherEntity } from "./../../database/entities/entity/publisher.entity";
import { Not } from "typeorm";

export async function updatePublisherService(
  uuid: string,
  { name, ...payload }: UpdatePublisherDTO
) {
  const publisher = await PublisherEntity.findOneBy({ uuid }).catch((e) => {
    console.error("PublisherEntity.findOneBy: ", e);
    return null;
  });

  if (!publisher)
    return Promise.reject({
      message: "Publisher not found",
      status: statusCode.NOT_FOUND,
    });

  if (name) {
    const findPublisherByName = await PublisherEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("PublisherEntity.findOne: ", e);
      return null;
    });

    if (findPublisherByName)
      return Promise.reject({
        message: "Publisher's name already exists",
        status: statusCode.BAD_REQUEST,
      });
  }

  await PublisherEntity.update(
    { uuid },
    {
      name,
      ...payload,
    }
  ).catch((e) => {
    console.error("PublisherEntity.update: ", e);
    return null;
  });

  return "Publisher updated successfully";
}
