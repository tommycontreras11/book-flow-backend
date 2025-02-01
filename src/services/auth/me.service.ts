import { statusCode } from "./../../utils/status.util"
import { retrieveIfUserExists } from "./../../utils/user.util"

export const meService = async (userUUID?: string) => {
    if(!userUUID) return Promise.reject({
        message: "User not found",
        status: statusCode.NOT_FOUND
    })

    const user = await retrieveIfUserExists(null, null, userUUID)
    
    if(!user) return Promise.reject({
        message: "User not found",
        status: statusCode.NOT_FOUND
    })
    
    return user.data
}