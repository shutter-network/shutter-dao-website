import React from "react";

export function LinkButton({isDark, ...props}: {
  isDark?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  label?: string;
  className?: string;
  onClick?: () => void;
}) {
  const colorClassNames = isDark
    ? "transition duration-500 ease-in-out transition-all"
    : "transition duration-500 ease-in-out transition-all";

  return (
    <button
      {...props}
      className={`rounded-full text-sm ${colorClassNames} ${props.className}`}
    >
      {props.children || props.label}
    </button>
  );
}
