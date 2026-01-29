import { createFileRoute } from "@tanstack/react-router";
import TeamLeaveHistoryScreen from "./-component/TeamLeaveHistory";

export const Route = createFileRoute("/team-leave-history/")({
  component: TeamLeaveHistoryScreen,
});
