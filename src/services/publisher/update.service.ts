import { UpdatePublisherDTO } from "./../../dto/publisher.dto";
import { statusCode } from "../../utils/status.util";
import { PublisherEntity } from "./../../database/entities/entity/publisher.entity";

export async function updatePublisherService(
  uuid: string,
  { description, ...payload }: UpdatePublisherDTO
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

  await PublisherEntity.update(
    { uuid },
    {
      description,
      ...payload,
    }
  ).catch((e) => {
    console.error("PublisherEntity.update: ", e);
    return null;
  });

  return "Publisher updated successfully";
}
