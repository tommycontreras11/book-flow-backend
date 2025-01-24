import { LoanManagementEntity } from "database/entities/entity/loan-management.entity";

export const generateLoanNumber = async (
) => {
  const prefix = "LN";
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;

  let randomPart = String(Math.floor(10000 + Math.random() * 90000));
  
  let completeLoanNumber = `${prefix}-${formattedDate}-${randomPart}`;

  let loanManagement = null;
  do {
    loanManagement = await LoanManagementEntity.findOneBy({
      loan_number: completeLoanNumber
    })
    randomPart = String(Math.floor(10000 + Math.random() * 90000));

    completeLoanNumber = `${prefix}-${formattedDate}-${randomPart}`;
  } while (!loanManagement);

  return completeLoanNumber;
};
