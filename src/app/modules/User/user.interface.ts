import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'admin' | 'user';
    address: string
}

export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id: string): Promise<TUser>
}

export type TUserRole = keyof typeof USER_ROLE;