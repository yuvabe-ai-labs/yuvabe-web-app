import { createFileRoute } from "@tanstack/react-router";
import TeamLeaveHistoryScreen from "./-component/TeamLeaveHistory";
import { requireAuth } from "@/hooks/useRouteGuards";

export const Route = createFileRoute("/team-leave-history/")({
  component: TeamLeaveHistoryScreen,
  beforeLoad: requireAuth,
});
