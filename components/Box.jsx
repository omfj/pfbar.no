import { cva } from "class-variance-authority";

const div = cva("flex flex-col gap-3 rounded p-2", {
  variants: {
    variant: {
      slate: "bg-slate-200",
      pink: "bg-pink-200",
    },
    modifier: {
      outline: "border border-black",
    },
  },
});

const Box = ({ children, variant, modifier, ...props }) => {
  return (
    <div className={div({ variant, modifier })} {...props}>
      {children}
    </div>
  );
};

export default Box;
