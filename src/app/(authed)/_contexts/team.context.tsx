import { createContext } from "react";

import { type TTeamEntity } from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";

type TTeamContext = {
  team?: TTeamEntity;
  setTeam: (team?: TTeamEntity) => void;
  user?: TUserEntity;
  teams: TTeamEntity[];
};

export const TeamContext = createContext<TTeamContext>({
  teams: [],
  setTeam: (team) => {
    console.log(team);
  },
});
