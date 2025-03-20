import { generateRandomCode } from "../../utils/common.util";
import {
  RequestEntity,
  StatusRequestEnum,
} from "../../database/entities/entity/request.entity";
import { CreateLoanManagementDTO } from "../../dto/loan-management.dto";
import { statusCode } from "../../utils/status.util";
import {
  LoanManagementEntity,
  LoanManagementEnum,
} from "./../../database/entities/entity/loan-management.entity";
import { getDaysBetweenDates, getFullDate } from "./../../utils/date.util";

export async function createLoanManagementService(
  requestUUID: string,
  { comment, date_return }: CreateLoanManagementDTO
) {
  const foundRequest = await RequestEntity.findOne({
    where: { uuid: requestUUID },
    relations: { employees: true, loanManagements: true },
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

  const todayFullDate = getFullDate(undefined);

  const loanManagement = foundRequest.loanManagements;

  const hasLoanManagementBorrow = loanManagement.some(
    (loanManagement) => loanManagement.status === "BORROWED"
  );

  if (!hasLoanManagementBorrow && !date_return)
    return Promise.reject({
      message: "Date return is required",
      status: statusCode.BAD_REQUEST,
    });

  const dateReturnFormatted = getFullDate(date_return ? new Date(date_return) : new Date(), false);

  const date_loan = hasLoanManagementBorrow
    ? getFullDate(loanManagement[0].date_loan, false)
    : getFullDate(new Date(), false);

  await LoanManagementEntity.create({
    loan_number: hasLoanManagementBorrow
      ? loanManagement[0].loan_number
      : generateRandomCode("LM"),
    date_loan,
    ...(hasLoanManagementBorrow && { date_return: todayFullDate }),
    ...(comment && { comment }),
    amount_day: 20,
    quantity_day: getDaysBetweenDates(date_loan, dateReturnFormatted),
    request_id: foundRequest.id,
    status: hasLoanManagementBorrow
      ? LoanManagementEnum.RETURNED
      : LoanManagementEnum.BORROWED,
  })
    .save()
    .catch((e) => {
      console.error("LoanManagementEntity.create: ", e);
      return null;
    });

  await RequestEntity.update(
    { id: foundRequest.id },
    {
      status: !hasLoanManagementBorrow
        ? StatusRequestEnum.BORROWED
        : StatusRequestEnum.COMPLETED,
    }
  ).catch((e) => {
    console.error("RequestEntity.update: ", e);
    return null;
  });

  return `Loan management ${
    !hasLoanManagementBorrow ? "borrow" : "return"
  } successfully`;
}
