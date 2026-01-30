import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import LeaveHistoryScreen from "./-component/LeaveHistoryScreen";

export const Route = createFileRoute("/leave-history/")({
  component: LeaveHistoryScreen,
  beforeLoad: requireAuth,
});
