import React from "react";

import NavBarDark from "./navbar-dark";
import { FooterDark } from "./footer-dark";

export function LayoutDark(props) {
  return (
    <div className="bg-shutter-black">
      <NavBarDark />
      {props.children}
      <FooterDark />
    </div>
  );
}
