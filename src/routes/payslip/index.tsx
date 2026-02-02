import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import PayslipScreen from "./-components/PayslipScreen";

const searchSchema = z.object({
  success: z.union([z.string(), z.boolean()]).optional().catch(undefined),
  error: z.string().optional().catch(undefined),
});

// REMOVE the trailing slash here to match the error suggestion
export const Route = createFileRoute("/payslip/")({
  validateSearch: zodValidator(searchSchema),
  component: PayslipScreen,
  beforeLoad: requireAuth,
});
