import { type z } from "zod";

import { TeamEntity } from "@/domain/entities/team.entity";
import { UserEntity } from "@/domain/entities/user.entity";
import { InviteJoinTeamSchema } from "@/schemas/_generated";

export const InviteJoinTeamInfoDto = InviteJoinTeamSchema.pick({
  teamId: true,
  userId: true,
  role: true,
}).extend({
  team: TeamEntity.pick({ name: true }),
  user: UserEntity.pick({
    name: true,
    email: true,
    image: true,
  }),
});
export type TInviteJoinTeamInfoDto = z.infer<typeof InviteJoinTeamInfoDto>;
