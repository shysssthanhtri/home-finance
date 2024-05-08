import * as z from "zod";

import {
  type CompleteTeam,
  type CompleteUser,
  RelatedTeamSchema,
  RelatedUserSchema,
} from "./index";

export const RequestJoinTeamSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
});

export interface CompleteRequestJoinTeam
  extends z.infer<typeof RequestJoinTeamSchema> {
  team: CompleteTeam;
  user: CompleteUser;
}

/**
 * RelatedRequestJoinTeamSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRequestJoinTeamSchema: z.ZodSchema<CompleteRequestJoinTeam> =
  z.lazy(() =>
    RequestJoinTeamSchema.extend({
      team: RelatedTeamSchema,
      user: RelatedUserSchema,
    }),
  );
