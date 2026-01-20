import { z } from "zod";

export const editProfileSchema = z
  .object({
    nickname: z.string().optional(),

    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .refine((val) => val.replace(/\s+/g, "").length > 0, {
        message: "Name cannot be empty or spaces only",
      }),

    email: z.email("Enter a valid email"),
    team: z.string().optional(),
    dob: z.string().min(1, "Date of Birth is required"),

    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (currentPassword && !newPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        message: "New password is required",
        code: "custom",
      });
    }

    if (confirmPassword && !newPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        message: "New password is required",
        code: "custom",
      });
    }

    if (newPassword && !confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Confirm password is required",
        code: "custom",
      });
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: "custom",
      });
    }
  });

export type EditProfileForm = z.infer<typeof editProfileSchema>;

export interface UpdateProfilePayload {
  name: string;
  email: string;
  team?: string;
  dob?: string | null;
  current_password?: string | null;
  new_password?: string | null;
  profile_picture?: File | null;
}
