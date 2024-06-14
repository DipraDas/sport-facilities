import { z } from "zod";

const userValidationSchema = z.object({
    name: z
        .string({
            invalid_type_error: 'Name field is required.'
        }),
    email: z
        .string({
            invalid_type_error: 'Email field is required.'
        }),
    password: z
        .string({
            invalid_type_error: 'Password field is required.'
        }),
    phone: z
        .string({
            invalid_type_error: 'Phone field is required.'
        }),
    role: z
        .enum(["admin", "user"],
            { invalid_type_error: 'Only admin or user role is valid' }
        )
    ,
    address: z
        .string({
            invalid_type_error: 'Address field is required.'
        }),
})

export const UserValidation = {
    userValidationSchema
}