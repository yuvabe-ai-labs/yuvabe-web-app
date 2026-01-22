import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .email({ message: "Enter a valid email address" })
    .refine((email) => email.toLowerCase().includes(""), {
      message: "Please use your valid email",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
