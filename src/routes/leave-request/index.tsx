import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import LeaveRequestScreen from "./-components/LeaveRequestScreen";

export const Route = createFileRoute("/leave-request/")({
  component: LeaveRequestScreen,
  beforeLoad: requireAuth,
});
