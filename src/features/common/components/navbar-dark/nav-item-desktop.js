import React from "react";
import { Link } from "gatsby";

export default function NavItemDesktop({ to, label, subNavItems = [] }) {
  return (
    <div className="cursor-pointer inline-block">
      <div className="flex flex-col justify-center">
        <Link
          className="text-base whitespace-nowrap text-grey mr-8 cursor-pointer hover:text-dark-green"
          activeClassName="text-white"
          to={to}
          key={label}
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
