import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";


const createUserIntoDB = async (payload: TUser) => {
    try {
        const isUserExists = await User.findOne({ email: payload.email })
        if (isUserExists) {
            throw new AppError(httpStatus.BAD_REQUEST, 'User Available with same email.')
        }

        const newAdmin = await User.create(payload);
        if (!newAdmin) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create');
        }
        return newAdmin;
    } catch (err: any) {
        throw new Error(err);
    }
};

const loginUser = async (payload: TLoginUser) => {
    try {
        const isUserExists = await User.findOne({ email: payload.email })
        if (!isUserExists) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user not found')
        }

        const jwtPayload = {
            email: isUserExists.email,
            role: isUserExists.role
        }

        const accessToken = createToken(
            jwtPayload,
            config.jwt_secret as string,
            config.jwt_access_expires_in as string
        )

        const refreshToken = createToken(
            jwtPayload,
            config.jwt_refresh_secret as string,
            config.jwt_refresh_expires_in as string
        )

        return {
            isUserExists,
            accessToken,
            refreshToken
        }
    } catch (err: any) {
        throw new Error(err);
    }
}

export const AuthServices = {
    createUserIntoDB,
    loginUser
}