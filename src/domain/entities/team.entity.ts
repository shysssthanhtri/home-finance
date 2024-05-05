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

export const RequestJoinTeamDto = TeamEntity.pick({
  id: true,
}).and(TeamMemberSchema.pick({ role: true }));
export type TRequestJoinTeamDto = z.infer<typeof RequestJoinTeamDto>;

export const TeamDetailDto = z.object(TeamEntity.shape).extend({
  belongToUser: UserEntity.nullish(),
  members: z.array(UserEntity.and(TeamMemberSchema.pick({ role: true }))),
});
export type TTeamDetailDto = z.infer<typeof TeamDetailDto>;
