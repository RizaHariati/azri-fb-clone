import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  src: string;
  text?: string;
  imgClass: string;
}
const ImgBtn = ({ src, text, imgClass }: Props) => {
  return (
    <div className={imgClass}>
      <Image
        src={src}
        width={50}
        height={50}
        layout="responsive"
        className="img-base rounded-full"
        alt={src.slice(0, 5)}
      />
      {text && <p className="icon-note">{text}</p>}
    </div>
  );
};

export default ImgBtn;

// <LinkImgButton
//   src="/images/websiteImages/profile.jpg"
//   href="/profile"
//   text="Your Profile"
//   imgClass="img-icon"
// />;
