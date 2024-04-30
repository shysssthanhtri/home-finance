import { redirect } from "next/navigation";
import React, { type ReactNode } from "react";

import { AppRoute } from "@/config/app-route";
import { getServerAuthSession } from "@/server/auth";

type Props = {
  children: ReactNode;
};
const AuthGuard = async ({ children }: Props) => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect(AppRoute.signIn);
  }
  return <div>{children}</div>;
};

export default AuthGuard;
