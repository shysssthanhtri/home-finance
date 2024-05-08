import * as z from "zod";

import {
  type CompleteTeam,
  type CompleteUser,
  RelatedTeamSchema,
  RelatedUserSchema,
} from "./index";

export const ActiveTeamSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
});

export interface CompleteActiveTeam extends z.infer<typeof ActiveTeamSchema> {
  user: CompleteUser;
  team: CompleteTeam;
}

/**
 * RelatedActiveTeamSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedActiveTeamSchema: z.ZodSchema<CompleteActiveTeam> = z.lazy(
  () =>
    ActiveTeamSchema.extend({
      user: RelatedUserSchema,
      team: RelatedTeamSchema,
    }),
);
