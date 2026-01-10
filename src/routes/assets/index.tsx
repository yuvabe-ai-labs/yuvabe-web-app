import { createFileRoute } from "@tanstack/react-router";
import AssetsScreen from "./-components/AssetsScreen";

export const Route = createFileRoute("/assets/")({
  component: AssetsScreen,
});
