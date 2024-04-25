import React from "react";

import { Card, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  rightSide?: React.ReactNode;
};
export const PageTitle = (props: Props) => {
  const { title, rightSide } = props;
  return (
    <Card className="flex justify-between p-6">
      <CardTitle className="flex items-center">{title}</CardTitle>
      {rightSide}
    </Card>
  );
};
