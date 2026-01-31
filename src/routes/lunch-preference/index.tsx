import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import LunchPreferenceScreen from "./-component/LunchPreferenceScreen";

export const Route = createFileRoute("/lunch-preference/")({
  component: LunchPreferenceScreen,
  beforeLoad: requireAuth,
});
