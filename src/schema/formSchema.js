import { z } from "zod";

export const formSchema = z.object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    city: z.string().min(2, { message: "City is required" }),
    state: z.string().min(2, { message: "State is required" }),
    zip: z.string().length(5, { message: "Zip code must be exactly 5 digits" }),
})