import { cn } from "@/utils/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
};

export function Container({ as = "div", className, ...props }: ContainerProps) {
  const Comp = as;
  return (
    <Comp
      className={cn("max-w-5xl mx-auto my-10 w-full px-4", className)}
      {...props}
    />
  );
}
