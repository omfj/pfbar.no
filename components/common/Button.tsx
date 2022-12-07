import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const button = cva("rounded py-2 px-5", {
  variants: {
    variant: {
      primary: "bg-blue-500 hover:bg-blue-600 text-white",
      danger: "bg-red-500 hover:bg-red-600 text-white",
    },
    modifier: {
      outline: "border border-gray-500",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
});

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof button> {}

const Button = ({
  children,
  variant,
  modifier,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button className={button({ variant, modifier, disabled })} {...props}>
      {children}
    </button>
  );
};

export default Button;
