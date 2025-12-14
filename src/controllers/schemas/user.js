import { z } from "zod";
import "./config.js"

export const createUserSchema = z.object({
    firstName: 
    z.string("First name is required")
    .trim()
    .min(2, "First name must have at least 2 characters"),
    lastName: 
    z.string("Last name is required")
    .trim()
    .min(2, "Last name must have at least 2 characters"),
    email: 
    z.email("Invalid email"),
    password: 
    z.string("Password is required")
    .trim()
    .min(6, "Password must have at least 6 characters")
}).strict();

export const updateUserSchema = createUserSchema.partial();