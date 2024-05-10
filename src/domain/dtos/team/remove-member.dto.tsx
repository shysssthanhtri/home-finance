import { type z } from "zod";

import { TeamMemberSchema } from "@/schemas/_generated";

export const RemoveMemberDto = TeamMemberSchema.pick({
  teamId: true,
  userId: true,
});
export type TRemoveMemberDto = z.infer<typeof RemoveMemberDto>;
