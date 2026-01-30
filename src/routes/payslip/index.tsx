import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import PayslipScreen from "./-components/PayslipScreen";

export const Route = createFileRoute("/payslip/")({
  component: PayslipScreen,
  beforeLoad: requireAuth,
});
