import { type z } from "zod";

import { TeamMemberSchema } from "@/schemas/_generated";

export const AcceptRequestJoinTeamDto = TeamMemberSchema.pick({
  teamId: true,
  userId: true,
});
export type TAcceptRequestJoinTeamDto = z.infer<
  typeof AcceptRequestJoinTeamDto
>;
