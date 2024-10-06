import { z } from "zod";

const changePasswordValidationSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, "New Password must be at least 6 characters"),
    password: z
      .string()
      .trim()
      .min(6, "Old Password must be at least 6 characters"),
    con_newPassword: z
      .string()
      .trim()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.con_newPassword, {
    message: "New Passwords do not match",
    path: ["con_newPassword"],
  });

export default changePasswordValidationSchema;
