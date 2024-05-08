import * as z from "zod";

import {
  type CompleteTeam,
  type CompleteUser,
  RelatedTeamSchema,
  RelatedUserSchema,
} from "./index";

export const InviteJoinTeamSchema = z.object({
  userId: z.string(),
  teamId: z.string(),
});

export interface CompleteInviteJoinTeam
  extends z.infer<typeof InviteJoinTeamSchema> {
  team: CompleteTeam;
  user: CompleteUser;
}

/**
 * RelatedInviteJoinTeamSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInviteJoinTeamSchema: z.ZodSchema<CompleteInviteJoinTeam> =
  z.lazy(() =>
    InviteJoinTeamSchema.extend({
      team: RelatedTeamSchema,
      user: RelatedUserSchema,
    }),
  );
