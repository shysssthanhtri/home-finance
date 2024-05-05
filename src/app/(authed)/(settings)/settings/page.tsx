import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import { ThemePickerDynamic } from "@/app/(authed)/(settings)/settings/_components/dynamic-theme-picker";
import { UserInfo } from "@/app/(authed)/(settings)/settings/_components/user-info";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/server/auth";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Settings" />
      <Card className="bg-background">
        <CardContent className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
          <UserInfo user={user} />
          <ThemePickerDynamic />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;