import React from "react";

import { Header } from "@/app/(authed)/(settings)/settings/_components/header";
import { UserInfoSection } from "@/app/(authed)/(settings)/settings/personal/components/user-info-section";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/server/auth";

const Page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="w-full space-y-4">
      <Header
        title="Personal"
        description="This is how others will see you on the site."
      />
      <Separator />
      <UserInfoSection user={user} />
    </div>
  );
};

export default Page;
