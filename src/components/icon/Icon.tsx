import "./Icon.scss";
import React from "react";
import { icons, IconType } from "./icons";

interface IconProps {
  type: IconType;
}

const Icon: React.FunctionComponent<IconProps> = ({ type }) => {
  if (!type || !icons[type]) {
    console.error("icon type is required");
    return null;
  }

  return (
    <object
      className="app-icon"
      data={icons[type]}
      data-icon-name={type}
      aria-label={type}
    ></object>
  );
};

export default Icon;
