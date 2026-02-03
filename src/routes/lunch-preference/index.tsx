import { requireAuth } from "@/hooks/useRouteGuards";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import LunchPreferenceScreen from "./-component/LunchPreferenceScreen";

const searchSchema = z.object({
  success: z.union([z.string(), z.boolean()]).optional().catch(undefined),
  error: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/lunch-preference/")({
  validateSearch: zodValidator(searchSchema),
  component: LunchPreferenceScreen,
  beforeLoad: requireAuth,
});
