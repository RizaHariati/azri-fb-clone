import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  src: string;
  text: string;
}
const ExtLinkTextButton = ({ href, src, text }: Props) => {
  return (
    <a href={href}>
      <button className="icon-round-text-btn my-1">
        <div className="w-8 h-8 rounded-md">
          <Image
            src={`/images/pagesImages/${src}.png`}
            width={30}
            height={30}
            layout="responsive"
            className="img-base rounded-md"
          />
        </div>
        <p className="text-textMedium">{text}</p>
      </button>
    </a>
  );
};

export default ExtLinkTextButton;

//  <LinkImgTextButton
//    href="/profile"
//    src="/images/profile/profile.jpg"
//    text="Riza Hariati"
//    icon=""
//  />;
