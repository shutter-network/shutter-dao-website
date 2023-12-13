import React from "react";

export function Button({isDark, ...props}: {
  isDark?: boolean;
  children?: React.ReactNode;
  label?: string;
  className?: string;
  onClick?: () => void;
}) {
  const colorClassNames = isDark
    ? "bg-rich-black-lighter text-off-white hover:bg-off-white hover:text-rich-black"
    : "bg-grey-lighter text-rich-black hover:bg-rich-black hover:text-white";

  return (
    <button
      {...props}
      className={`rounded-full text-sm ${colorClassNames} ${props.className}`}
    >
      {props.children || props.label}
    </button>
  );
}
