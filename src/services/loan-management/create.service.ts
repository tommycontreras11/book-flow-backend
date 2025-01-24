import { LoanManagementEntity } from "./../../database/entities/entity/loan-management.entity";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { CreateLoanManagementDTO } from "../../dto/loan-management.dto";
import { statusCode } from "../../utils/status.util";

export async function createLoanManagementService(requestUUID: string, {
  date_loan,
  date_return,
  comment
}: CreateLoanManagementDTO) {
  const foundRequest = await RequestEntity.findOneBy({ uuid: requestUUID }).catch((e) => {
    console.error("RequestEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRequest)
    return Promise.reject({
      message: "Request not found",
      status: statusCode.NOT_FOUND,
    });

  await LoanManagementEntity.create({
    date_loan,
    date_return,
    comment,
    request_id: foundRequest.id,
    status: "BORROWED",
  })
    .save()
    .catch((e) => {
      console.error("LoanManagementEntity.create: ", e);
      return null;
    });

  return "Request created successfully";
}
