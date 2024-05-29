import React from "react";

type Props = {
  title: string;
  description: string;
};
export const Header = ({ title, description }: Props) => {
  return (
    <div>
      <h3 className="text-sm font-medium sm:text-lg">{title}</h3>
      <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
    </div>
  );
};
