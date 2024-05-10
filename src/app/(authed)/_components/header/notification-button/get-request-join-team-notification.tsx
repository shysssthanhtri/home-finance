import { type ReactNode } from "react";

import { RequestJoinTeamNotification } from "@/app/(authed)/_components/header/notification-button/request-join-team-notification";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api as serverApi } from "@/trpc/server";

export const getRequestJoinTeamNotifications = async (
  teamId: TTeamEntity["id"],
) => {
  const requestJoinTeams = await serverApi.requestJoinTeam.getRequests({
    id: teamId,
  });

  const notifications: ReactNode[] = [];

  requestJoinTeams.forEach((request) =>
    notifications.push(<RequestJoinTeamNotification request={request} />),
  );

  return notifications;
};
