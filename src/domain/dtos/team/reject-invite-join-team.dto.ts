import { type z } from "zod";

import { InviteJoinTeamSchema } from "@/schemas/_generated";

export const RejectInviteJoinTeamDto = InviteJoinTeamSchema.pick({
  teamId: true,
});
export type TRejectInviteJoinTeamDto = z.infer<typeof RejectInviteJoinTeamDto>;
