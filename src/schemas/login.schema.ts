import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().trim().min(6, "Password must at lest 6 character"),
});

export default loginValidationSchema;
