import { createFileRoute } from "@tanstack/react-router";
import EditProfileScreen from "./-components/EditProfileScreen";

export const Route = createFileRoute("/profile/edit-profile")({
  component: EditProfileScreen,
});
