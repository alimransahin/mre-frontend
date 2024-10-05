import { z } from "zod";

const signUpValidationSchema = z
  .object({
    name: z.string().trim().min(1, "Please enter your name"),
    phone: z.string().trim().min(11, "Please enter your phone number"),
    email: z.string().trim().email("Please enter a valid email"),
    address: z.string().trim().min(1, "Please enter your address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters"),
    con_password: z
      .string()
      .trim()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.con_password, {
    message: "Passwords do not match",
    path: ["con_password"],
  });

export default signUpValidationSchema;
