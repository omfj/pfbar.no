import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva("transition-colors duration-150 font-semibold", {
  variants: {
    intent: {
      primary: [
        "bg-black",
        "text-white",
        "border",
        "border-black",
        "border-transparent",
        "hover:text-black",
        "hover:bg-white",
        "hover:border-black",
        "focus:ring",
      ],
      secondary: [
        "bg-white",
        "text-black",
        "border",
        "border-black",
        "border-transparent",
        "hover:text-white",
        "hover:bg-black",
        "hover:border-black",
        "focus:ring",
      ],
      ghost: [
        "bg-transparent",
        "text-black",
        "border",
        "border-black",
        "border-transparent",
        "hover:text-white",
        "hover:bg-black",
        "hover:border-black",
        "focus:ring",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      large: ["text-lg", "py-3", "px-6"],
    },
    fullWidth: {
      true: ["w-full"],
    },
    upper: {
      true: ["uppercase"],
    },
    disabled: {
      true: ["opacity-50", "cursor-not-allowed"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "medium",
    fullWidth: false,
    upper: false,
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, fullWidth, upper, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({
            className,
            intent,
            size,
            fullWidth,
            upper,
            disabled,
          })
        )}
        disabled={disabled ?? false}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
