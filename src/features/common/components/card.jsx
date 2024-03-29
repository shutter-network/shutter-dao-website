import React from "react";

export const Card = props => {
  const classes = `rounded-3xl flex flex-row justify-center items-center ${props.className}`;

  return <div className={classes}>{props.children}</div>;
};
