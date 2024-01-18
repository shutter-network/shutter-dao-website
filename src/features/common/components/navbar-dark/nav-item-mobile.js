import React from "react";
import { Link } from "gatsby";

export default function NavItemMobile({ to, label }) {
  return (
    <div className="flex flex-col mb-4">
      <Link
        className="font-semibold text-2xl text-grey-lighter"
        to={to}
        activeClassName="text-shutter-dark-blue"
      >
        {label}
      </Link>
    </div>
  );
}
