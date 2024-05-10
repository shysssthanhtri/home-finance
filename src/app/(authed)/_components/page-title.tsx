import React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
};
export const PageTitle = (props: Props) => {
  const { title } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};
