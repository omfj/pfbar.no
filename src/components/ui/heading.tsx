import { cn } from "@/utils/cn";

type Heading = React.HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3;
};

export function Heading({ level = 1, className, ...props }: Heading) {
  const Comp = `h${level}` as const;

  return (
    <Comp
      className={cn({
        "text-4xl": level === 1,
        "text-3xl": level === 2,
        "text-2xl": level === 3,
      })}
      {...props}
    />
  );
}
