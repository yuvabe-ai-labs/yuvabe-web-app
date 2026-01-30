import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import LeaveDetailsScreen from "./-component/LeaveDetailsScreen";

export const Route = createFileRoute("/leave-details/$leaveId")({
  component: LeaveDetailsScreen,
  beforeLoad: requireAuth,
});
