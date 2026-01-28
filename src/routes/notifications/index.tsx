import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import NotificationScreen from "./-component/NotificationScreen";

export const Route = createFileRoute("/notifications/")({
  component: NotificationScreen,
  beforeLoad: requireAuth,
});
