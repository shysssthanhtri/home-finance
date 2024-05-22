import { type z } from "zod";

import { UserEntity } from "@/domain/entities/user.entity";

export const UserIdDto = UserEntity.pick({
  id: true,
});
export type TUserIdDto = z.infer<typeof UserIdDto>;
