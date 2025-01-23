import { PublisherEntity } from "../../database/entities/entity/publisher.entity";
import { statusCode } from "../../utils/statusCode";

export async function deletePublisherService(uuid: string) {
  const foundPublisher = await PublisherEntity.findOneBy({ uuid }).catch((e) => {
    console.error("PublisherEntity.findOne: ", e);
    return null;
  });

  if (!foundPublisher)
    return Promise.reject({
      message: "Publisher not found",
      status: statusCode.NOT_FOUND,
    });

  await foundPublisher.softRemove().catch((e) => {
    console.error("PublisherEntity.softRemove: ", e);
    return null;
  });

  return "Publisher deleted successfully";
}
