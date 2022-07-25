import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  text: string;
  icon: IconProp;
  btnClass?: string;
  onClick?: () => void;
}

const IconBtn = ({ icon, text, btnClass, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.()}
      className={btnClass ? btnClass : "icon-btn"}
    >
      <FontAwesomeIcon icon={icon} />
      <p className="icon-note">{text}</p>
    </div>
  );
};

export default IconBtn;
