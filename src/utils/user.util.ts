import { EmployeeEntity } from "../database/entities/entity/employee.entity";
import { UserEntity } from "../database/entities/entity/user.entity";

export async function retrieveIfUserExists(
  email?: string | null,
  identification?: string | null,
  uuid?: string | null
) {
  const [foundUser, foundEmployee] = await Promise.all([
    UserEntity.findOneBy({
      ...(email && { email }),
      ...(identification && { identification }),
      ...(uuid && { uuid }),
    }),
    EmployeeEntity.findOneBy({
      ...(email && { email }),
      ...(identification && { identification }),
      ...(uuid && { uuid }),
    }),
  ]);

return foundUser ?? foundEmployee
}

// export async function retrieveUserByUsername(
//   email: string
// ) {
//   const [foundUser, foundEmployee] = await Promise.all([
//     UserEntity.findOneBy({
//       ...(email && { email }),
//     }),
//     EmployeeEntity.findOneBy({
//       ...(email && { email }),
//     }),
//   ]);

//   return foundUser ?? foundEmployee;
// }
