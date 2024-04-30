import { z } from "zod";

import { TeamSchema } from "@/schemas/_generated";

export const TeamEntity = z.object(TeamSchema.shape).extend({
  id: z.string().min(1),
  name: z.string().min(3).max(30),
});
export const CreateTeamDto = TeamEntity.pick({
  name: true,
});
export const RequestJoinTeamDto = TeamEntity.pick({
  id: true,
});
