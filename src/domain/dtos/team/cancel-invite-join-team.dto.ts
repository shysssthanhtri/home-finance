import { type z } from "zod";

import { InviteJoinTeamSchema } from "@/schemas/_generated";

export const CancelInviteJoinTeamDto = InviteJoinTeamSchema.pick({
  teamId: true,
  userId: true,
});
export type TCancelInviteJoinTeamDto = z.infer<typeof CancelInviteJoinTeamDto>;
