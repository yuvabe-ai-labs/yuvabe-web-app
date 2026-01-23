import { LeaveType } from "@/types/leave.types";
import { z } from "zod";

export const leaveRequestSchema = z
  .object({
    leave_type: z.enum(LeaveType, {
      error: () => ({ message: "Please select a leave type" }),
    }),
    from_date: z.string().min(1, "Start date is required"),
    to_date: z.string().min(1, "End date is required"),
    reason: z
      .string()
      .min(5, "Reason must be at least 5 characters long")
      .trim(),
  })
  .refine((data) => new Date(data.to_date) >= new Date(data.from_date), {
    message: "End date cannot be before start date",
    path: ["to_date"], // Shows error on the To Date field
  });

// Infer the type automatically from the schema
export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;
