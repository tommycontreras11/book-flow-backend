import { UserEntity } from "./../../database/entities/entity/user.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteUserService(uuid: string) {
  const foundUser = await UserEntity.findOneBy({ uuid }).catch((e) => {
    console.error("UserEntity.findOneBy: ", e);
    return null;
  });

  if (!foundUser)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

  await foundUser.softRemove().catch((e) => {
    console.error("UserEntity.softRemove: ", e);
    return null;
  });

  return "User deleted successfully";
}
