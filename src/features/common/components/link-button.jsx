import React from "react";

export function LinkButton(props) {
  const colorClassNames = props.isDark
    ? "bg-shutter-black text-off-white"
    : "bg-grey-lighter text-shutter-black";

  return (
    <div className="flex flex-row">
      <a
        href={props.href}
        className={`flex flex-row px-8 py-4 rounded-full text-sm ${colorClassNames} ${props.className}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        {props.children || props.label}
      </a>
    </div>
  );
}
