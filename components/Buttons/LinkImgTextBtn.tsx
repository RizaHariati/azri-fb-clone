import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  src: string;
  text: string;
  icon?: string;
  onClick?: () => {} | void;
  buttonClass?: string;
}
const LinkImgTextBtn = ({
  href,
  src,
  text,
  icon,
  onClick,
  buttonClass,
}: Props) => {
  return (
    <Link href={href}>
      <button
        className={buttonClass ? buttonClass : "icon-round-text-btn "}
        onClick={() => onClick?.()}
      >
        <div className={icon ? icon : "img-icon-small"}>
          <Image
            src={src}
            width={30}
            height={30}
            layout="responsive"
            className="img-base rounded-full"
            alt={src.slice(0, 5)}
          />
        </div>
        <p className="text-textMedium font-normal">{text}</p>
      </button>
    </Link>
  );
};

export default LinkImgTextBtn;

//  <LinkImgTextButton
//    href="/profile"
//    src="/images/profile/profile.jpg"
//    text="Riza Hariati"
//    icon=""
//  />;
