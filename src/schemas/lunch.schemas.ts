import { isBefore, isSameDay } from "date-fns";
import { z } from "zod";

export const lunchSchema = z
  .object({
    startDate: z
      .date()
      .nullable()
      .refine((val) => val !== null, { message: "Start date is required" }),
    endDate: z
      .date()
      .nullable()
      .refine((val) => val !== null, { message: "End date is required" }),
    selectedMode: z.enum(["tomorrow", "range"]).nullable(),
  })
  .refine(
    (data) => {
      return (
        isSameDay(data.startDate, data.endDate) ||
        !isBefore(data.endDate, data.startDate)
      );
    },
    {
      message: "End date cannot be earlier than start date",
      path: ["endDate"],
    },
  );


