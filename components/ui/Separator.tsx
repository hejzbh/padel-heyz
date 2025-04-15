"use client";
import React from "react";

interface Props {
  className?: string;
}

const Separator = ({ className = "" }: Props) => {
  return (
    <div className={`w-full h-[1px] bg-border-primary ${className}`}></div>
  );
};

export default Separator;
