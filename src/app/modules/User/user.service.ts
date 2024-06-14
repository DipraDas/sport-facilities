import { TUser } from "./user.interface";
import AppError from "../../errors/appError";
import httpStatus from "http-status";
import { User } from "./user.model";

const createAdminIntoDB = async (payload: TUser) => {
    try {

        const newAdmin = await User.create(payload);
        if (!newAdmin) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
        }
        return newAdmin;
    } catch (err: any) {
        throw new Error(err);
    }
};

export const UserServices = {
    createAdminIntoDB
}