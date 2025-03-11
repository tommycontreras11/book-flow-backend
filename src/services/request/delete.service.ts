import { RequestEntity } from "../../database/entities/entity/request.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteRequestService(uuid: string) {
  const foundRequest = await RequestEntity.findOneBy({ uuid }).catch((e) => {
    console.error("RequestEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRequest)
    return Promise.reject({
      message: "Request not found",
      status: statusCode.BAD_REQUEST,
    });

  await foundRequest.softRemove().catch((e) => {
    console.error("RequestEntity.softRemove: ", e);
    return null;
  });

  return "Request deleted successfully";
}
