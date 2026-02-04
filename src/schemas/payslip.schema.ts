// src/schemas/payslip.schema.ts
import { format } from "date-fns";
import { z } from "zod";

// Helper to get current month in YYYY-MM format
export const getCurrentMonth = () => {
  return format(new Date(), "yyyy-MM");
};

export const payslipRequestSchema = z.discriminatedUnion("mode", [
  // CASE 1: PRESET MODES (No dates required)
  z.object({
    mode: z.enum(["3_months", "6_months"]),
  }),

  // CASE 2: MANUAL MODE (Requires validation)
  z
    .object({
      mode: z.literal("manual"),
      start_month: z.string().min(1, "Start month is required"),
      end_month: z.string().min(1, "End month is required"),
    })
    .superRefine((data, ctx) => {
      const currentMonth = getCurrentMonth();

      // Rule 1: Start Date cannot be in the future
      if (data.start_month > currentMonth) {
        ctx.addIssue({
          code: "custom",
          message: "Start month cannot be in the future.",
          path: ["start_month"],
        });
      }

      // Rule 2: End Date cannot be in the future
      if (data.end_month > currentMonth) {
        ctx.addIssue({
          code: "custom",
          message: "End month cannot be in the future.",
          path: ["end_month"],
        });
      }

      // Rule 3: Start must be before End
      if (data.start_month >= data.end_month) {
        ctx.addIssue({
          code: "custom",
          message: "Start month must be earlier than end month.",
          path: ["start_month"],
        });
      }
    }),
]);

export type PayslipRequestSchemaType = z.infer<typeof payslipRequestSchema>;
