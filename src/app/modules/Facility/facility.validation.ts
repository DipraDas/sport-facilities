import { z } from "zod";

const facilityValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required.' }),
        description: z.string({ required_error: 'Description is required.' }),
        pricePerHour: z.number({ required_error: 'Number is required.' }),
        location: z.string({ required_error: 'Location is required.' }),
        isDeleted: z.boolean().optional(),
    })
})

export const FacilityValidation = {
    facilityValidationSchema
}