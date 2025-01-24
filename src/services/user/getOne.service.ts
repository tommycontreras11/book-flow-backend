import { FindOneOptions } from "typeorm";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { statusCode } from "../../utils/status.util";

export async function getOneUserService(options: FindOneOptions<UserEntity>) {
  const user = await UserEntity.findOne(options).catch((e) => {
    console.error("UserEntity.findOne: ", e);
    return null;
  });

  if (!user)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

  return user;
}
