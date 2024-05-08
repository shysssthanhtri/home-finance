import * as z from "zod";

import {
  type CompleteActiveTeam,
  type CompleteTeamMember,
  type CompleteUser,
  RelatedActiveTeamSchema,
  RelatedTeamMemberSchema,
  RelatedUserSchema,
} from "./index";

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  belongToUserId: z.string().nullish(),
});

export interface CompleteTeam extends z.infer<typeof TeamSchema> {
  members: CompleteTeamMember[];
  belongToUser?: CompleteUser | null;
  activeTeams: CompleteActiveTeam[];
}

/**
 * RelatedTeamSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamSchema: z.ZodSchema<CompleteTeam> = z.lazy(() =>
  TeamSchema.extend({
    members: RelatedTeamMemberSchema.array(),
    belongToUser: RelatedUserSchema.nullish(),
    activeTeams: RelatedActiveTeamSchema.array(),
  }),
);
