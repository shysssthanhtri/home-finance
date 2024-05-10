import { type z } from "zod";

import { TeamMemberSchema } from "@/schemas/_generated";

export const RejectRequestJoinTeamDto = TeamMemberSchema.pick({
  teamId: true,
  userId: true,
});
export type TRejectRequestJoinTeamDto = z.infer<
  typeof RejectRequestJoinTeamDto
>;
