import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";


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

export const AuthServices = {
    createUserIntoDB
}