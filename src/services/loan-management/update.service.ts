import { UpdateLoanManagementDTO } from "../../dto/loan-management.dto";
import { statusCode } from "../../utils/status.util";
import { LoanManagementEntity } from "./../../database/entities/entity/loan-management.entity";
import { getDaysBetweenDates } from "./../../utils/date.util";

export async function updateLoanManagementService(
  uuid: string,
  { date_loan, date_return, status, comment }: UpdateLoanManagementDTO
) {
  const foundLoanManagement = await LoanManagementEntity.findOneBy({
    uuid,
  }).catch((e) => {
    console.error("LoanManagementEntity.findOneBy: ", e);
    return null;
  });

  if (!foundLoanManagement)
    return Promise.reject({
      message: "LoanManagement not found",
      status: statusCode.NOT_FOUND,
    });

  await LoanManagementEntity.update(
    { id: foundLoanManagement.id },
    {
      ...(date_loan && { date_loan }),
      ...(date_return && { date_return }),
      ...(comment && { comment }),
      ...(status && { status }),
      ...(date_loan &&
        date_return && {
          quantity_day: getDaysBetweenDates(date_loan.toLocaleDateString(), date_return.toLocaleDateString()),
        }),
    }
  ).catch((e) => {
    console.error("LoanManagementEntity.update: ", e);
    return null;
  });

  return "Loan management updated successfully";
}
