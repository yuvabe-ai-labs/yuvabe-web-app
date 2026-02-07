import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email({ message: "Enter a valid email address" })
    .min(1, { message: "Email is required" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })

    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
