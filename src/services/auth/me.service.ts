import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { retrieveIfUserExists } from "./../../utils/user.util";

export const meService = async (userUUID?: string) => {
  const user = await Promise.all([
    retrieveIfUserExists(UserEntity, null, null, userUUID),
    retrieveIfUserExists(EmployeeEntity, null, null, userUUID),
  ]).then((users) => users.find((user) => user));

  return user;
};
