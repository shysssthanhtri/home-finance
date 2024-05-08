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

export const RequestJoinTeamDto = TeamEntity.pick({
  id: true,
}).and(TeamMemberSchema.pick({ role: true }));
export type TRequestJoinTeamDto = z.infer<typeof RequestJoinTeamDto>;

export const TeamDetailDto = z.object(TeamEntity.shape).extend({
  belongToUser: UserEntity.nullish(),
  members: z.array(UserEntity.and(TeamMemberSchema.pick({ role: true }))),
});
export type TTeamDetailDto = z.infer<typeof TeamDetailDto>;

export const InviteMemberDto = TeamEntity.pick({
  id: true,
})
  .extend({
    email: z.string().email().nullish(),
  })
  .and(TeamMemberSchema.pick({ role: true }));
export type TInviteMemberDto = z.infer<typeof InviteMemberDto>;

export const UpdateMemberRoleDto = TeamEntity.pick({
  id: true,
}).and(TeamMemberSchema.pick({ role: true, userId: true }));
export type TUpdateMemberRoleDto = z.infer<typeof UpdateMemberRoleDto>;

export const RemoveMemberDto = TeamEntity.pick({
  id: true,
}).and(TeamMemberSchema.pick({ userId: true }));
export type TRemoveMemberDto = z.infer<typeof RemoveMemberDto>;

export const SetActiveTeamDto = TeamEntity.pick({
  id: true,
});
export type TSetActiveTeamDto = z.infer<typeof SetActiveTeamDto>;
