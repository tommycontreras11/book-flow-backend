import { FindManyOptions } from "typeorm";
import { LoanManagementEntity } from "../../database/entities/entity/loan-management.entity";
import { statusCode } from "../../utils/status.util";

export async function getAllLoanManagementService(options: FindManyOptions<LoanManagementEntity>) {
  const loanManagements = await LoanManagementEntity.find(options).catch((e) => {
    console.error("LoanManagementEntity.find: ", e);
    return null;
  });

  if (!loanManagements)
    return Promise.reject({
      message: "Loans management not found",
      status: statusCode.NOT_FOUND,
    });

  return loanManagements;
}
