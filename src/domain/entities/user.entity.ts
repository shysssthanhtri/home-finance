import { z } from "zod";

import { UserSchema } from "@/schemas/_generated";

export const UserEntity = z.object(UserSchema.shape).extend({
  email: z.string().email().nullish(),
  name: z.string().min(3).max(30).nullish(),
});
export type TUserEntity = z.infer<typeof UserEntity>;

export const UpdateUserDto = z.object({
  name: z.string().min(3).max(30),
});
