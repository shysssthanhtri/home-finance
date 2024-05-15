import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import ChartCard from "@/app/(authed)/(analyst)/analyst/_components/chart-card";
import { Card, CardContent } from "@/components/ui/card";

const Page = async () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Analyst" />
      <Card className="pt-4 sm:pt-6">
        <CardContent className="grid grid-cols-2 gap-4">
          <ChartCard>Hello world</ChartCard>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
