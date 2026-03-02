import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

type LayoutProps = Pick<ComponentProps<"div">, "className">;
export const TestingSuiteLayout = (props: PropsWithChildren<LayoutProps>) => {
  const { children, className } = props;
  return <section className={cn("w-full min-h-72 min-w-4xl", className)}>{children}</section>;
};
