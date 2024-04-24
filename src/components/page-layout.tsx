import React from "react";

type Props = {
  children: React.ReactNode;
};
const PageLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default PageLayout;
