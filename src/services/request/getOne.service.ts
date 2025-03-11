import { FindOneOptions } from "typeorm";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { statusCode } from "../../utils/status.util";

export async function getOneRequestService(
  options: FindOneOptions<RequestEntity>
) {
  const foundRequest = await RequestEntity.findOne(options).catch((e) => {
    console.error("RequestEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRequest)
    return Promise.reject({
      message: "Request not found",
      status: statusCode.BAD_REQUEST,
    });

  return foundRequest;
}
