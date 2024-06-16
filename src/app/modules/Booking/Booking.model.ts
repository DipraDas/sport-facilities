import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const timeFormat = /^(?:([01]\d|2[0-3]):([0-5]\d)|24:00)$/;

const booking = new Schema<TBooking>({
    facility: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Facility"
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return timeFormat.test(v);
            },
            message: props => `${props.value} is not a valid time format! Use HH:mm.`
        }
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return timeFormat.test(v);
            },
            message: props => `${props.value} is not a valid time format! Use HH:mm.`
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    payableAmount: {
        type: Number
    },
    isBooked: {
        type: String,
        enum: ['confirmed', 'canceled'],
        default: 'confirmed'
    }
},
    { versionKey: false }
)

booking.pre("find", function (next) {
    this.find({ isBooked: 'confirmed' });
    next();
});

export const Booking = model<TBooking>('Booking', booking);