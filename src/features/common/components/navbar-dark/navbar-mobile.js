import React, { useState } from "react";
import { Link } from "gatsby";

import NavItemMobile from "./nav-item-mobile";

import { Logo } from "../icons/logo-white";
import { Close } from "../icons/close-dark";
import { BurgerMenu } from "../icons/burger-menu-dark";

export default function NavbarMobile({ navItems = [] }) {
  const [isFullScreenNavOpen, setIsFullScreenNavOpen] = useState(false);

  return isFullScreenNavOpen ? (
    <div className="fixed top-0 w-full h-full z-50 p-4 bg-shutter-black overflow-y-scroll">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div>
            <Link to="/" aria-label="Link to home page">
              <Logo />
            </Link>
          </div>
          <div>
            <button
              onClick={() => setIsFullScreenNavOpen(false)}
              aria-label="Menu close button"
            >
              <Close />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 pt-8">
          {navItems.map((navItem, i) => (
            <div
              key={`${navItem.label}-i`}
              onClick={() => setIsFullScreenNavOpen(false)}
            >
              <NavItemMobile {...navItem} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="sticky top-0 z-50 w-full bg-shutter-black p-4 flex flex-row justify-between md:hidden transition duration-500 ease-in-out">
      <Link to="/" aria-label="Link to home page">
        <Logo />
      </Link>
      <button
        onClick={() => setIsFullScreenNavOpen(true)}
        aria-label="Menu open button"
      >
        <BurgerMenu />
      </button>
    </div>
  );
}
