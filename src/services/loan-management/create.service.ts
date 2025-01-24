import { generateLoanNumber } from "./../../utils/loan-management.util";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { CreateLoanManagementDTO } from "../../dto/loan-management.dto";
import { statusCode } from "../../utils/status.util";
import { LoanManagementEntity } from "./../../database/entities/entity/loan-management.entity";
import { getDaysBetweenDates } from "./../../utils/date.util";

export async function createLoanManagementService(
  requestUUID: string,
  { date_loan, date_return, comment }: CreateLoanManagementDTO
) {
  const foundRequest = await RequestEntity.findOne({
    where: { uuid: requestUUID },
    relations: { employees: true },
  }).catch((e) => {
    console.error("RequestEntity.findOne: ", e);
    return null;
  });

  if (!foundRequest)
    return Promise.reject({
      message: "Request not found",
      status: statusCode.NOT_FOUND,
    });

  if (foundRequest.status !== "APPROVAL" && foundRequest.employees.length === 0)
    return Promise.reject({
      message: "Request not approved",
      status: statusCode.BAD_REQUEST,
    });

  await LoanManagementEntity.create({
    loan_number: generateLoanNumber(),
    date_loan,
    date_return,
    comment,
    amount_day: 20,
    quantity_day: getDaysBetweenDates(date_loan, date_return),
    request_id: foundRequest.id,
    status: "BORROWED",
  })
    .save()
    .catch((e) => {
      console.error("LoanManagementEntity.create: ", e);
      return null;
    });

  return "Loan management created successfully";
}
