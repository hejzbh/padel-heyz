import React from "react";

interface Props {
  text: string;
}

const Ribbon = ({ text }: Props) => {
  return (
    <div className="ribbon">
      <span>{text}</span>
    </div>
  );
};

export default Ribbon;
