import { type z } from "zod";

import { TeamMemberSchema } from "@/schemas/_generated";

export const RequestJoinTeamDto = TeamMemberSchema.pick({
  teamId: true,
  role: true,
});
export type TRequestJoinTeamDto = z.infer<typeof RequestJoinTeamDto>;
