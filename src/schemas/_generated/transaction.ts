import { TransactionType } from "@prisma/client";
import * as z from "zod";

import { type CompleteTeam, RelatedTeamSchema } from "./index";

export const TransactionSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  time: z.date(),
  type: z.nativeEnum(TransactionType),
  title: z.string(),
  description: z.string().nullish(),
  note: z.string().nullish(),
});

export interface CompleteTransaction extends z.infer<typeof TransactionSchema> {
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
      team: RelatedTeamSchema,
    }),
  );
