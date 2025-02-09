import { CreatePublisherDTO } from "./../../dto/publisher.dto";
import { statusCode } from "../../utils/status.util";
import { PublisherEntity } from "../../database/entities/entity/publisher.entity";

export async function createPublisherService({
  name,
}: CreatePublisherDTO) {
  const foundPublisher = await PublisherEntity.findOneBy({ name }).catch(
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
    name,
    status: "ACTIVE",
  })
    .save()
    .catch((e) => {
      console.error("PublisherEntity.create: ", e);
      return null;
    });

  return "Publisher created successfully";
}
