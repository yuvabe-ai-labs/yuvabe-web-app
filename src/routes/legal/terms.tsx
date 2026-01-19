import { createFileRoute } from "@tanstack/react-router";
import TermsScreen from "./-components/TermsScreen";

export const Route = createFileRoute("/legal/terms")({
  component: TermsScreen,
});
