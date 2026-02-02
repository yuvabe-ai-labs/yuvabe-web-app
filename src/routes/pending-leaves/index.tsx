import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import PendingLeavesScreen from "./-component/PendingLeaveScreen";

export const Route = createFileRoute("/pending-leaves/")({
  component: PendingLeavesScreen,
  beforeLoad: requireAuth,
});
