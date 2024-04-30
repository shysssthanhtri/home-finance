import * as z from "zod";

import {
  type CompleteAccount,
  type CompletePost,
  type CompleteSession,
  type CompleteTeam,
  type CompleteTeamMember,
  RelatedAccountSchema,
  RelatedPostSchema,
  RelatedSessionSchema,
  RelatedTeamMemberSchema,
  RelatedTeamSchema,
} from "./index";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
});

export interface CompleteUser extends z.infer<typeof UserSchema> {
  accounts: CompleteAccount[];
  sessions: CompleteSession[];
  posts: CompletePost[];
  createdTeams: CompleteTeam[];
  joinedTeams: CompleteTeamMember[];
}

/**
 * RelatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserSchema.extend({
    accounts: RelatedAccountSchema.array(),
    sessions: RelatedSessionSchema.array(),
    posts: RelatedPostSchema.array(),
    createdTeams: RelatedTeamSchema.array(),
    joinedTeams: RelatedTeamMemberSchema.array(),
  }),
);
