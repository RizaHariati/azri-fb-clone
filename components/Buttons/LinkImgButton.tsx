import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  src: string;
  href: string;
  text?: string;
  imgClass: string;
  onClick?: () => {} | void;
}
const LinkImgButton = ({ src, href, text, imgClass, onClick }: Props) => {
  return (
    <Link href={href}>
      <button className={imgClass} onClick={onClick ? onClick : () => {}}>
        <Image
          src={src}
          width={50}
          height={50}
          layout="responsive"
          className="img-base rounded-full"
          alt={src.slice(0, 5)}
        />
        {text && <p className="icon-note">{text}</p>}
      </button>
    </Link>
  );
};

export default LinkImgButton;

// <LinkImgButton
//   src="/images/websiteImages/profile.jpg"
//   href="/profile"
//   text="Your Profile"
//   imgClass="img-icon"
// />;
