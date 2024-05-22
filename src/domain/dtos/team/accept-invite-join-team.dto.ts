import { type z } from "zod";

import { InviteJoinTeamSchema } from "@/schemas/_generated";

export const AcceptInviteJoinTeamDto = InviteJoinTeamSchema.pick({
  teamId: true,
});
export type TAcceptInviteJoinTeamDto = z.infer<typeof AcceptInviteJoinTeamDto>;
