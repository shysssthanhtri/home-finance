import { z } from "zod";

import { InviteJoinTeamSchema } from "@/schemas/_generated";

export const InviteJoinTeamInfoDto = InviteJoinTeamSchema.pick({
  teamId: true,
  userId: true,
  role: true,
}).extend({
  teamName: z.string(),
});
export type TInviteJoinTeamInfoDto = z.infer<typeof InviteJoinTeamInfoDto>;
