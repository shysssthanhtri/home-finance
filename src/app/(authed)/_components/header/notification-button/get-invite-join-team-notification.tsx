import { type ReactNode } from "react";

import { InviteJoinTeamNotification } from "@/app/(authed)/_components/header/notification-button/invite-join-team-notification";
import { api as serverApi } from "@/trpc/server";

export const getInviteJoinTeamNotifications = async () => {
  const inviteJoinTeams = await serverApi.inviteJoinTeam.getInvites();

  const notifications: ReactNode[] = [];

  inviteJoinTeams.forEach((invite) =>
    notifications.push(<InviteJoinTeamNotification invite={invite} />),
  );

  return notifications;
};
