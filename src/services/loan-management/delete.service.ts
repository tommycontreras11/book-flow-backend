import { LoanManagementEntity } from "../../database/entities/entity/loan-management.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteLoanManagementService(uuid: string) {
  const foundLoanManagement = await LoanManagementEntity.findOneBy({ uuid }).catch((e) => {
    console.error("LoanManagementEntity.findOneBy: ", e);
    return null;
  });

  if (!foundLoanManagement)
    return Promise.reject({
      message: "LoanManagement not found",
      status: statusCode.NOT_FOUND,
    });

  await foundLoanManagement.softRemove().catch((e) => {
    console.error("LoanManagementEntity.softRemove: ", e);
    return null;
  });

  return "LoanManagement deleted successfully";
}
