import React from "react";

import { UserInfoSection } from "@/app/(authed)/(settings)/settings/personal/components/user-info-section";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/server/auth";

const Page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-lg font-medium">Personal</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <UserInfoSection user={user} />
    </div>
  );
};

export default Page;
