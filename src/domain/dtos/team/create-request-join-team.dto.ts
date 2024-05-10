import { type z } from "zod";

import { TeamMemberSchema } from "@/schemas/_generated";

export const CreateRequestJoinTeamDto = TeamMemberSchema.pick({
  teamId: true,
  role: true,
});
export type TCreateRequestJoinTeamDto = z.infer<
  typeof CreateRequestJoinTeamDto
>;
