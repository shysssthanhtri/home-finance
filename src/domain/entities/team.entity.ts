import { z } from "zod";

import { UserEntity } from "@/domain/entities/user.entity";
import { TeamMemberSchema, TeamSchema } from "@/schemas/_generated";

export const TeamEntity = z.object(TeamSchema.shape).extend({
  id: z.string().min(1),
  name: z.string().min(3).max(30),
});
export type TTeamEntity = z.infer<typeof TeamEntity>;

export const CreateTeamDto = TeamEntity.pick({
  name: true,
});
export type TCreateTeamDto = z.infer<typeof CreateTeamDto>;

export const UpdateTeamDto = TeamEntity.pick({
  id: true,
  name: true,
});
export type TUpdateTeamDto = z.infer<typeof UpdateTeamDto>;

export const TeamDetailDto = z.object(TeamEntity.shape).extend({
  belongToUser: UserEntity.nullish(),
  members: z.array(UserEntity.and(TeamMemberSchema.pick({ role: true }))),
});
export type TTeamDetailDto = z.infer<typeof TeamDetailDto>;

export const SetActiveTeamDto = TeamEntity.pick({
  id: true,
});
export type TSetActiveTeamDto = z.infer<typeof SetActiveTeamDto>;
