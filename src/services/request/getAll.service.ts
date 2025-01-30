import { FindManyOptions } from "typeorm";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { statusCode } from "../../utils/status.util";

export async function getAllRequestService(options: FindManyOptions<RequestEntity>) {
  const requests = await RequestEntity.find(options).catch((e) => {
    console.error("RequestEntity.find: ", e);
    return null;
  });

  if (!requests)
    return Promise.reject({
      message: "Requests not found",
      status: statusCode.BAD_REQUEST,
    });

  return requests;
}
