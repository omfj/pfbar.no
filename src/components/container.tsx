import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const container = cva("container mx-auto flex flex-col");

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof container> {}

const Container: React.FC<ContainerProps> = ({ className, ...props }) => (
  <div className={container({ className })} {...props} />
);

export default Container;
