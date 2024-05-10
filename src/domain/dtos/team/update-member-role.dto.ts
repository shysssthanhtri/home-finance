import { type z } from "zod";

import { TeamMemberSchema } from "@/schemas/_generated";

export const UpdateMemberRoleDto = TeamMemberSchema.pick({
  teamId: true,
  userId: true,
  role: true,
});
export type TUpdateMemberRoleDto = z.infer<typeof UpdateMemberRoleDto>;
