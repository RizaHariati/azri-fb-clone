import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

interface Props {
  text: string;
  icon: IconProp;
  iconClass: string;
  hideClass?: string;
  href?: string;
}

const IconSquareBtn = ({ href, icon, text, iconClass, hideClass }: Props) => {
  return (
    <Link href={href ? href : "/"}>
      <button className={`icon-btn-square ${hideClass}`}>
        <FontAwesomeIcon icon={icon} className={iconClass} />
        <p className="icon-note">{text}</p>
      </button>
    </Link>
  );
};

export default IconSquareBtn;
