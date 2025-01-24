import { CreatePublisherDTO } from "./../../dto/publisher.dto";
import { statusCode } from "../../utils/statusCode";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";

export async function createPublisherService({
  description,
}: CreatePublisherDTO) {
  const foundPublisher = await PublisherEntity.findOneBy({ description }).catch(
    (e) => {
      console.error("EmployeeEntity.findOneBy: ", e);
      return null;
    }
  );

  if (foundPublisher)
    return Promise.reject({
      message: "Publisher already exists",
      status: statusCode.BAD_REQUEST,
    });

  await PublisherEntity.create({
    description,
    status: "ACTIVE",
  })
    .save()
    .catch((e) => {
      console.error("PublisherEntity.create: ", e);
      return null;
    });

  return "Publisher created successfully";
}
