import { cva } from "class-variance-authority";

const button = cva("rounded border border-black px-2 py-1", {
  variants: {
    variant: {
      primary: "bg-white",
      safe: "bg-green-300",
      danger: "bg-red-300",
    },
    modifier: {
      outline: "border border-gray-500",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
});

const Button = ({ children, variant, modifier, disabled, ...props }) => {
  return (
    <button className={button({ variant, modifier, disabled })} {...props}>
      {children}
    </button>
  );
};

export default Button;
