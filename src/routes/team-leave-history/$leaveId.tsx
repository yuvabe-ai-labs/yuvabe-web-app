import { createFileRoute } from '@tanstack/react-router'
import MentorApprovalScreen from './-component/TeamLeaveDetailScreen'

export const Route = createFileRoute('/team-leave-history/$leaveId')({
  component: MentorApprovalScreen,
})


