import { TeamMemberRole } from "@prisma/client";

export const teamMemberRoleDisplay: Record<TeamMemberRole, string> = {
  [TeamMemberRole.ADMIN]: "Admin",
  [TeamMemberRole.MEMBER]: "Member",
  [TeamMemberRole.VIEWER]: "Viewer",
};
