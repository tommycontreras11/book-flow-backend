import { UserEntity } from "../../database/entities/entity/user.entity";
import { UpdateUserDTO } from "../../dto/user.dto";
import { statusCode } from "../../utils/statusCode";
import { retrieveIfUserExists } from "../../utils/userUtil";

export async function updateUserService(uuid: string, { username, ...payload }: UpdateUserDTO) {
  const user = await UserEntity.findOne({
    where: { uuid }
  }).catch((e) => {
    console.error("UserEntity.findOne: ", e);
    return null;
  });

  if (!user)
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });

  const validateUser = await retrieveIfUserExists(username);

  if (validateUser.user && !validateUser.sameUser)
    return Promise.reject({
      message: "User with this username already exists",
      status: statusCode.BAD_REQUEST,
    });


  await UserEntity.update({ uuid }, { ...payload, username }).catch((e) => {
    console.error("UserEntity.update: ", e);
    return null;
  });

  return "User updated successfully";
}