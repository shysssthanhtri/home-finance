import { TeamMemberRole } from "@prisma/client";
import * as z from "zod";

import {
  type CompleteTeam,
  type CompleteUser,
  RelatedTeamSchema,
  RelatedUserSchema,
} from "./index";

export const TeamMemberSchema = z.object({
  teamId: z.string(),
  userId: z.string(),
  role: z.nativeEnum(TeamMemberRole),
});

export interface CompleteTeamMember extends z.infer<typeof TeamMemberSchema> {
  team: CompleteTeam;
  user: CompleteUser;
}

/**
 * RelatedTeamMemberSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamMemberSchema: z.ZodSchema<CompleteTeamMember> = z.lazy(
  () =>
    TeamMemberSchema.extend({
      team: RelatedTeamSchema,
      user: RelatedUserSchema,
    }),
);
