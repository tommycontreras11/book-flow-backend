import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";
import { LoanManagementEntity } from "../../database/entities/entity/loan-management.entity";

export async function getOneLoanManagementService(options: FindOneOptions<LoanManagementEntity>) {
  const author = await LoanManagementEntity.findOne(options).catch((e) => {
    console.error("LoanManagementEntity.findOne: ", e);
    return null;
  });

  if (!author)
    return Promise.reject({
      message: "LoanManagement not found",
      status: statusCode.NOT_FOUND,
    });

  return author;
}
