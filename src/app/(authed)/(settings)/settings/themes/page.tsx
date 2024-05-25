import React from "react";

import { ThemePickerDynamic } from "@/app/(authed)/(settings)/settings/_components/theme-picker/dynamic-theme-picker";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-lg font-medium">Themes</h3>
        <p className="text-sm text-muted-foreground">
          Your application appearance.
        </p>
      </div>
      <Separator />
      <ThemePickerDynamic />
    </div>
  );
};

export default Page;
