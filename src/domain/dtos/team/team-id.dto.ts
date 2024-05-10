import { type z } from "zod";

import { TeamEntity } from "@/domain/entities/team.entity";

export const TeamIdDto = TeamEntity.pick({
  id: true,
});
export type TTeamIdDto = z.infer<typeof TeamIdDto>;
