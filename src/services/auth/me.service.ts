import { retrieveIfUserExists } from "./../../utils/user.util"

export const meService = async (userUUID?: string) => {
    const user = await retrieveIfUserExists(null, null, userUUID)
    return user
}