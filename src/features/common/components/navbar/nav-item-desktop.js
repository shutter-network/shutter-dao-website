import React from "react";
import { Link } from "gatsby";

export default function NavItemDesktop({ to, label, subNavItems = [] }) {
  return (
    <div className="cursor-pointer inline-block">
      <div className="flex flex-col justify-center">
        <Link
          className="text-base whitespace-nowrap text-shutter-black-lighter mr-8 cursor-pointer hover:text-shutter-dark-blue"
          activeClassName="text-shutter-dark-blue"
          to={to}
          key={label}
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
