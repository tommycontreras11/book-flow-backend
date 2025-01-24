import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";

export async function getOnePublisherService(options: FindOneOptions<PublisherEntity>) {
  const publisher = await PublisherEntity.findOne(options).catch((e) => {
    console.error("PublisherEntity.findOne: ", e);
    return null;
  });

  if (!publisher)
    return Promise.reject({
      message: "Publisher not found",
      status: statusCode.NOT_FOUND,
    });

  return publisher;
}
