import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

interface Props {
  text: string;
  iconClass?: string;
  icon: IconProp;
  classAdd?: string;
  onClick?: () => {} | void;
}
const IconRoundTextButton = ({
  text,
  icon,
  iconClass,
  classAdd,
  onClick,
}: Props) => {
  return (
    <button
      onClick={() => onClick?.()}
      className={`icon-round-text-btn text-textMedium h-12 hover:bg-primaryMedium group ${classAdd}`}
    >
      <div className="h-10 w-10 bg-primaryMedium rounded-full flex items-center justify-center group-hover:bg-primaryMediumLight">
        <FontAwesomeIcon icon={icon} className={`text-lg ${iconClass}`} />
      </div>
      <p className="text-textMedium font-normal text-sm">{text}</p>
    </button>
  );
};

export default IconRoundTextButton;
