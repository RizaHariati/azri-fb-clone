import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  text: string;
  iconClass?: string;
  icon: IconProp;
  color: string;
}
const LinkIconTextButton = ({ href, text, icon, color }: Props) => {
  return (
    <Link href={href}>
      <button className="icon-round-text-btn text-sky-500">
        <FontAwesomeIcon icon={icon} className={`text-xl w-8 ${color}`} />
        <p className="text-textMedium font-normal text-sm">{text}</p>
      </button>
    </Link>
  );
};

export default LinkIconTextButton;
