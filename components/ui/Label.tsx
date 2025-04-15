import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Label = ({ className = "", children }: Props) => {
  return (
    <span
      className={`text-[14px] text-text-primary ml-4 pb-1 block ${className}`}
    >
      {children}
    </span>
  );
};

export default Label;
