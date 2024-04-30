import React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  rightSide?: React.ReactNode;
};
export const PageTitle = (props: Props) => {
  const { title, rightSide } = props;
  return (
    <Card className="flex justify-between">
      <CardHeader>
        <CardTitle className="flex items-center">{title}</CardTitle>
        {rightSide}
      </CardHeader>
    </Card>
  );
};
