import React from "react";

import { CircledArrowUp } from "./icons/circled-arrow-up-dark";
import footerGroups from "../content/footer-groups";

export function FooterDark() {
  return (
    <div className="bg-shutter-black">
      <div className="md:container mx-auto md:px-24 px-4 md:py-20 py-10">
        <div className="flex md:flex-row flex-col md:justify-between md:mb-20">
          {footerGroups.map(group => (
            <div key={group.label} className="flex flex-col md:mb-0 mb-4">
              <div className="text-grey-darker text-lg md:text-base font-semibold md:mb-8 mb-1">
                {group.label}
              </div>
              {group.items.map((item, i) => (
                <a
                  key={`footer-link-${i}`}
                  href={item.href}
                  target={item.id || "_blank"}
                  rel={!item.id ? "noopener noreferrer" : ""}
                  className="md:mb-4 mb-1 text-grey text-base hover:text-shutter-dark-blue font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-row md:py-0 py-4">
          <div className="flex flex-1 md:flex-row flex-col md:justify-between md:items-center md:space-y-0 space-y-8">
            <div className="text-sm text-shutter-black-lightest md:order-1">
              Copyright © Shutter
            </div>
          </div>
          <div className="flex flex-row items-end justify-end">
            <a href="#">
              <button className="ml-16">
                <CircledArrowUp />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
