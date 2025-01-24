import jsonwebtoken from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { statusCode } from './../../utils/status.util'
import { UserEntity } from './../../database/entities/entity/user.entity'
import { EmployeeEntity } from './../../database/entities/entity/employee.entity'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token || req.headers.authorization

    if(!token) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' })
    try {
        const verifyToken = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET!)

        if(!verifyToken) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
        
        req.user = verifyToken as UserEntity | EmployeeEntity
        next()

    } catch (error) {
        res.clearCookie('access_token')
        return res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
    }
}