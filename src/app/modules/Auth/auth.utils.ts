import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
    jwtPayload: {
        id: Types.ObjectId,
        email: string,
        role: string
    },
    secret: string,
    expiresIn: string
) => {
    return jwt.sign(jwtPayload, secret as string,
        {
            expiresIn
        }
    )
}