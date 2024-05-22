import { z } from "zod";

import { UserEntity } from "@/domain/entities/user.entity";
import { TeamMemberSchema } from "@/schemas/_generated";

export const CreateInviteJoinTeamDto = z
  .object(TeamMemberSchema.shape)
  .pick({
    teamId: true,
    role: true,
  })
  .merge(UserEntity.pick({ email: true }));
export type TCreateInviteJoinTeamDto = z.infer<typeof CreateInviteJoinTeamDto>;
