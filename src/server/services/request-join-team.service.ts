import { type TTeamEntity } from "@/domain/entities/team.entity";
import { type Transaction } from "@/server/db";

const getRequestsJoinTeam = async (
  teamId: TTeamEntity["id"],
  transaction: Transaction,
) => {
  return transaction.requestJoinTeam.findMany({
    where: {
      teamId,
    },
  });
};

export const requestJoinTeamService = {
  getRequestsJoinTeam,
};
