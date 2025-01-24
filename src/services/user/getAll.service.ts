import { FindManyOptions } from "typeorm";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { statusCode } from "../../utils/status.util";

export async function getAllUserService(options: FindManyOptions<UserEntity>) {
  const users = await UserEntity.find(options).catch((e) => {
    console.error("UserEntity.find: ", e);
    return null;
  });

  if (!users)
    return Promise.reject({
      message: "Users not found",
      status: statusCode.NOT_FOUND,
    });

  return users;
}
