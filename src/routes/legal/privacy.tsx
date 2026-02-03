import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyScreen from "./-components/PrivacyPolicyScreen";

export const Route = createFileRoute("/legal/privacy")({
  component: PrivacyPolicyScreen,
});
