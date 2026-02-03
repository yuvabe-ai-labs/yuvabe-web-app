import { createFileRoute } from "@tanstack/react-router";
import EditProfileScreen from "./-components/EditProfileScreen";
import { requireAuth } from "@/hooks/useRouteGuards";

export const Route = createFileRoute("/profile/edit-profile")({
  component: EditProfileScreen,
  beforeLoad: requireAuth,
});
