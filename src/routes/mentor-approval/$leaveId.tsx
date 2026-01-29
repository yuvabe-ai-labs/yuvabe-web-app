import { createFileRoute } from "@tanstack/react-router";
import MentorApprovalScreen from "./-component/MentorApprovalScreen";

export const Route = createFileRoute("/mentor-approval/$leaveId")({
  component: MentorApprovalScreen,
});
