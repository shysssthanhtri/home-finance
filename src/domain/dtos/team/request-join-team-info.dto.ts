import { z } from "zod";

import { RequestJoinTeamSchema } from "@/schemas/_generated";

export const RequestJoinTeamInfoDto = RequestJoinTeamSchema.pick({
  teamId: true,
  userId: true,
  role: true,
}).extend({
  userName: z.string().nullish(),
  teamName: z.string().nullish(),
});
export type TRequestJoinTeamInfoDto = z.infer<typeof RequestJoinTeamInfoDto>;
