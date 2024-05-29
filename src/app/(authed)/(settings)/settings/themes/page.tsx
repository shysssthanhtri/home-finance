import React from "react";

import { Header } from "@/app/(authed)/(settings)/settings/_components/header";
import { ThemePickerDynamic } from "@/app/(authed)/(settings)/settings/themes/_components/theme-picker/dynamic-theme-picker";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="w-full space-y-4">
      <Header title="Themes" description="Your application appearance." />
      <Separator />
      <ThemePickerDynamic />
    </div>
  );
};

export default Page;
