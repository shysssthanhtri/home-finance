import React, { type ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children?: ReactNode;
};
const ChartCard = (props: Props) => {
  const { className, children } = props;
  return (
    <Card className={cn("pt-4 sm:pt-6", className)}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ChartCard;
