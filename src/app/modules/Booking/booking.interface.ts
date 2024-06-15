import { Types } from "mongoose";

export type TBooking = {
    facility: Types.ObjectId,
    date: string,
    startTime: string,
    endTime: string,
    user?: string,
    payableAmount?: number,
    isBooked: 'confirmed' | 'canceled';
} 