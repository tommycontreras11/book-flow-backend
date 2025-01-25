import { EmployeeEntity } from "../database/entities/entity/employee.entity";
import { UserEntity } from "../database/entities/entity/user.entity";

export async function retrieveIfUserExists(
  username?: string | null,
  identification?: string | null,
  uuid?: string | null
) {
  const [foundUser, foundEmployee] = await Promise.all([
    UserEntity.findOneBy({
      ...(username && { username }),
      ...(identification && { identification }),
      ...(uuid && { uuid }),
    }),
    EmployeeEntity.findOneBy({
      ...(username && { username }),
      ...(identification && { identification }),
      ...(uuid && { uuid }),
    }),
  ]);

  const matchingEntity =
  (foundUser?.uuid === uuid && foundUser) ||
  (foundEmployee?.uuid === uuid && foundEmployee);

return matchingEntity
  ? {
      user: true,
      sameUser: true,
      data: matchingEntity,
    }
  : null;
}

export async function retrieveUserByUsername(
  username: string
) {
  const [foundUser, foundEmployee] = await Promise.all([
    UserEntity.findOneBy({
      ...(username && { username }),
    }),
    EmployeeEntity.findOneBy({
      ...(username && { username }),
    }),
  ]);

  return foundUser ?? foundEmployee;
}
