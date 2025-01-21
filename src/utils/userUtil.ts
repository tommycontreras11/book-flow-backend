import { EmployeeEntity } from "../database/entities/entity/employee.entity";
import { UserEntity } from "../database/entities/entity/user.entity";

export async function retrieveIfUserExists(
  username?: string | null,
  identification?: string | null,
  uuid?: string
) {
  const [foundUser, foundEmployee] = await Promise.all([
    UserEntity.findOne({
      where: {
        ...(username && { username }),
        ...(identification && { identification }),
      },
    }),
    EmployeeEntity.findOne({
      where: {
        ...(username && { username }),
        ...(identification && { identification }),
      },
    }),
  ]);

  return {
    user: !!foundUser || !!foundEmployee,
    sameUser: foundUser?.uuid === uuid || foundEmployee?.uuid === uuid,
  };
}
