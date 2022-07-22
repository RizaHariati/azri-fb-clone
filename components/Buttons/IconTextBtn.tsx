import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

interface Props {
  text: string;
  iconClass?: string;
  icon: IconProp;
  classAdd?: string;
}
const IconTextBtn = ({ text, icon, iconClass, classAdd }: Props) => {
  return (
    <button className={`icon-round-text-btn text-textMedium ${classAdd}`}>
      <FontAwesomeIcon icon={icon} className={`text-xl w-8 ${iconClass}`} />
      <p className="text-textMedium font-normal text-sm">{text}</p>
    </button>
  );
};

export default IconTextBtn;
