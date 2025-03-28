import { LoanManagementEntity } from "../../database/entities/entity/loan-management.entity";
import { FindManyOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";

export async function getAllLoanManagementService(userLogged: UserEntity | EmployeeEntity | null, options: FindManyOptions<LoanManagementEntity>) {
  if (!userLogged) return [];

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
