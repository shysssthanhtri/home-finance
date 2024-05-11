import { TransactionType } from "@prisma/client";
import * as z from "zod";

import {
  type CompleteTeam,
  type CompleteUser,
  RelatedTeamSchema,
  RelatedUserSchema,
} from "./index";

export const TransactionSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  time: z.date(),
  type: z.nativeEnum(TransactionType),
  title: z.string(),
  description: z.string().nullish(),
  amount: z.number(),
  createdById: z.string(),
});

export interface CompleteTransaction extends z.infer<typeof TransactionSchema> {
  createdBy: CompleteUser;
  team: CompleteTeam;
}

/**
 * RelatedTransactionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTransactionSchema: z.ZodSchema<CompleteTransaction> =
  z.lazy(() =>
    TransactionSchema.extend({
      createdBy: RelatedUserSchema,
      team: RelatedTeamSchema,
    }),
  );
