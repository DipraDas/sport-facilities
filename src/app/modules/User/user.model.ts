import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";


const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user']
    },
    address: {
        type: String,
        required: true
    }
},
    { versionKey: false }
)

userSchema.statics.isUserExistsByCustomId = async function (email: string) {
    return await User.findOne({ email: email })
}


export const User = model<TUser, UserModel>('User', userSchema);