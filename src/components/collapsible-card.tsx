import { ChevronDown, ChevronUp } from "lucide-react";
import React, { type ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

type Props = {
  title: string;
  children: ReactNode;
  contentClassName?: string;
};
export const CollapsibleCard = ({
  title,
  children,
  contentClassName,
}: Props) => {
  const [isCollapse, setIsCollapse] = useState(true);
  return (
    <Collapsible open={!isCollapse}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-sm sm:text-lg">{title}</span>
            <Button
              variant="ghost"
              onClick={() => {
                setIsCollapse((prev) => !prev);
              }}
              className="h-fit p-0 sm:p-0"
            >
              {isCollapse && <ChevronUp />}
              {!isCollapse && <ChevronDown />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className={contentClassName}>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
