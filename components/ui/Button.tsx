import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-sm drop-shadow-md cursor-pointer active:opacity-50 transition-all duration-300 ease-in-out hover:md:opacity-70 text-white focus:outline-none";
  const variantStyles =
    variant === "primary"
      ? "bg-primary hover:bg-[#00538a] focus:ring-primary"
      : "border-[1px] !text-text-primary border-gray-600";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
