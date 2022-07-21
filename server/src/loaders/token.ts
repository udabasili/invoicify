import config from '@/config'
import { IError } from '@/interfaces/IError'
import db from '@/models'
import jwt from 'jsonwebtoken'
import Logger from './logger'


interface JwtPayload extends jwt.JwtPayload {
    userId: string
}

export const generateToken = (userId: string) =>{
    const u = {
        id: userId,
    }

    Logger.silly(`Generate token for userId: ${userId}`);

    const refreshToken =  jwt.sign(u, config.refreshSecretKey as string, {
        expiresIn: '7d' //7 days

    })
    const accessToken = jwt.sign(u, config.secretKey as string, {
        expiresIn: '2h' //I hour

    })

    return {accessToken, refreshToken}

}

export const generateAccessToken = (userId: string ) => {
    const u = {
        userId
    }

    const accessToken = jwt.sign(u, config.secretKey as string, {
        expiresIn: '2h'

    })

    return accessToken;
}

export const reIssueAccessToken = async function(refreshToken: string) {

    let customError: IError = {} as IError;

    try {
        const payload: JwtPayload = jwt.verify(refreshToken, config.refreshSecretKey as string) as JwtPayload
        const u = {
            userId: payload.userId,
        }

        const refreshTokenFound =  await db.token.findAll({
            where: {
                refreshToken
            },
            limit: 1,
            order: [[
                'createdAt',
                'DESC'
            ]]
        })
        const newestRefreshToken = refreshTokenFound[0]?.toJSON().refreshToken
        const userId = refreshTokenFound[0]?.toJSON().userId
        if (!newestRefreshToken) {
            customError.message = 'Unauthorized'
            customError.status = 401
            return
        }

        if (newestRefreshToken !== refreshToken) {
            customError.message = 'Unauthorized'
            customError.status = 401
            Logger.debug('Old token.Not valid anymore.')
        }
        const accessToken = generateAccessToken(userId)
        return accessToken

    } catch (error) {
        throw customError
    }
}