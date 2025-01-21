import { PublisherEntity } from "../../database/entities/entity/publisher.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/statusCode";

export async function getAllPublisherService(options: FindManyOptions<PublisherEntity>) {
  const publishers = await PublisherEntity.find(options).catch((e) => {
    console.error("PublisherEntity.find: ", e);
    return null;
  });

  if (!publishers)
    return Promise.reject({
      message: "Publishers not found",
      status: statusCode.NOT_FOUND,
    });

  return publishers;
}
