import { FC, PropsWithChildren } from "react";

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return <section className="p-4">{children}</section>;
};
